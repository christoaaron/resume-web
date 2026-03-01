"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { ActionState } from "@/lib/types";

const InsightSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    excerpt: z.string().optional(),
    content: z.string().min(1, "Content is required"),
    coverImage: z.string().optional(),
    published: z.boolean().default(false),
});

export async function createInsight(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const rawData = {
            title: formData.get("title"),
            slug: formData.get("slug"),
            excerpt: formData.get("excerpt"),
            content: formData.get("content"),
            coverImage: formData.get("coverImage"),
            published: formData.get("published") === "true",
        };

        const validatedFields = InsightSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const data = validatedFields.data;

        // Check if slug is unique
        const existing = await prisma.insight.findUnique({ where: { slug: data.slug } });
        if (existing) {
            return { message: "Slug must be unique", success: false };
        }

        await prisma.insight.create({
            data: {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt || null,
                content: data.content,
                coverImage: data.coverImage || null,
                published: data.published,
            },
        });

        revalidatePath("/", "layout");
        revalidateTag("insights", { expire: 0 });
        return { message: "Insight created successfully", success: true };
    } catch (e: any) {
        console.error(e);
        return { message: e.message || "Failed to create insight", success: false };
    }
}

export async function updateInsight(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const rawData = {
            title: formData.get("title"),
            slug: formData.get("slug"),
            excerpt: formData.get("excerpt"),
            content: formData.get("content"),
            coverImage: formData.get("coverImage"),
            published: formData.get("published") === "true",
        };

        const validatedFields = InsightSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const data = validatedFields.data;

        // Check uniqueness if slug changed
        const existing = await prisma.insight.findUnique({ where: { slug: data.slug } });
        if (existing && existing.id !== id) {
            return { message: "Slug must be unique", success: false };
        }

        await prisma.insight.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt || null,
                content: data.content,
                coverImage: data.coverImage || null,
                published: data.published,
            },
        });

        revalidatePath("/", "layout");
        revalidateTag("insights", { expire: 0 });
        return { message: "Insight updated successfully", success: true };
    } catch (e: any) {
        console.error(e);
        return { message: e.message || "Failed to update insight", success: false };
    }
}

export async function deleteInsight(id: string) {
    try {
        await prisma.insight.delete({ where: { id } });
        revalidatePath("/", "layout");
        revalidateTag("insights", { expire: 0 });
        return { message: "Insight deleted successfully", success: true };
    } catch (e: any) {
        return { message: e.message || "Failed to delete insight", success: false };
    }
}
