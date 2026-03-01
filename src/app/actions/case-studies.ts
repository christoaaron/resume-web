"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { ActionState } from "@/lib/types";

const CaseStudySchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    summary: z.string().optional(),
    content: z.string().min(1, "Content is required"),
    coverImage: z.string().optional(),
    link: z.string().optional(),
    published: z.boolean().default(false),
});

export async function createCaseStudy(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const rawData = {
            title: formData.get("title"),
            slug: formData.get("slug"),
            summary: formData.get("summary"),
            content: formData.get("content"),
            coverImage: formData.get("coverImage"),
            link: formData.get("link"),
            published: formData.get("published") === "true",
        };

        const validatedFields = CaseStudySchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const data = validatedFields.data;

        // Check if slug is unique
        const existing = await prisma.caseStudy.findUnique({ where: { slug: data.slug } });
        if (existing) {
            return { message: "Slug must be unique", success: false };
        }

        await prisma.caseStudy.create({
            data: {
                title: data.title,
                slug: data.slug,
                summary: data.summary || null,
                content: data.content,
                coverImage: data.coverImage || null,
                link: data.link || null,
                published: data.published,
            },
        });

        revalidatePath("/", "layout");
        revalidateTag("case-studies", { expire: 0 });
        return { message: "Case Study created successfully", success: true };
    } catch (e: any) {
        console.error(e);
        return { message: e.message || "Failed to create case study", success: false };
    }
}

export async function updateCaseStudy(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const rawData = {
            title: formData.get("title"),
            slug: formData.get("slug"),
            summary: formData.get("summary"),
            content: formData.get("content"),
            coverImage: formData.get("coverImage"),
            link: formData.get("link"),
            published: formData.get("published") === "true",
        };

        const validatedFields = CaseStudySchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const data = validatedFields.data;

        // Check uniqueness if slug changed
        const existing = await prisma.caseStudy.findUnique({ where: { slug: data.slug } });
        if (existing && existing.id !== id) {
            return { message: "Slug must be unique", success: false };
        }

        await prisma.caseStudy.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                summary: data.summary || null,
                content: data.content,
                coverImage: data.coverImage || null,
                link: data.link || null,
                published: data.published,
            },
        });

        revalidatePath("/", "layout");
        revalidateTag("case-studies", { expire: 0 });
        return { message: "Case Study updated successfully", success: true };
    } catch (e: any) {
        console.error(e);
        return { message: e.message || "Failed to update case study", success: false };
    }
}

export async function deleteCaseStudy(id: string) {
    try {
        await prisma.caseStudy.delete({ where: { id } });
        revalidatePath("/", "layout");
        revalidateTag("case-studies", { expire: 0 });
        return { message: "Case Study deleted successfully", success: true };
    } catch (e: any) {
        return { message: e.message || "Failed to delete case study", success: false };
    }
}
