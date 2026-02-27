"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { ActionState } from "@/lib/types";

const ProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().min(1, "Subtitle is required"),
    location: z.string().optional(),
    date: z.string().min(1, "Date is required"),
    description: z.string().optional(),
    link: z.string().optional(),
});

export async function createProject(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const rawData = {
            title: formData.get("title"),
            subtitle: formData.get("subtitle"),
            location: formData.get("location"),
            date: formData.get("date"),
            description: formData.get("description"),
            link: formData.get("link"),
        };

        const validatedFields = ProjectSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const { description, location, link, ...data } = validatedFields.data;
        const descArray = description ? description.split("\n").filter(line => line.trim() !== "") : [];

        await prisma.project.create({
            data: {
                ...data,
                location: location || null,
                description: descArray,
                link: link || null,
            },
        });

        revalidatePath("/", "layout");
        revalidateTag("projects", { expire: 0 });
        return { message: "Project created successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to create project", success: false };
    }
}

export async function updateProject(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const rawData = {
            title: formData.get("title"),
            subtitle: formData.get("subtitle"),
            location: formData.get("location"),
            date: formData.get("date"),
            description: formData.get("description"),
            link: formData.get("link"),
        };

        const validatedFields = ProjectSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const { description, location, link, ...data } = validatedFields.data;
        const descArray = description ? description.split("\n").filter(line => line.trim() !== "") : [];

        await prisma.project.update({
            where: { id },
            data: {
                ...data,
                location: location || null,
                description: descArray,
                link: link || null,
            },
        });

        revalidatePath("/", "layout");
        revalidateTag("projects", { expire: 0 });
        return { message: "Project updated successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to update project", success: false };
    }
}

export async function deleteProject(id: string) {
    try {
        await prisma.project.delete({ where: { id } });
        revalidatePath("/", "layout");
        revalidateTag("projects", { expire: 0 });
        return { message: "Project deleted successfully", success: true };
    } catch {
        return { message: "Failed to delete project", success: false };
    }
}
