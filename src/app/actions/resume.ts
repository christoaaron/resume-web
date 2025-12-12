"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProjectSchema = z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    location: z.string().optional(),
    date: z.string().min(1),
    description: z.string().optional(), // Textarea (newline separated)
});

export async function createProject(prevState: any, formData: FormData) {
    try {
        const rawData = {
            title: formData.get("title"),
            subtitle: formData.get("subtitle"),
            location: formData.get("location"),
            date: formData.get("date"),
            description: formData.get("description"),
        };

        const validatedFields = ProjectSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const { description, location, ...data } = validatedFields.data;

        // Split description by newlines
        const descArray = description ? description.split("\n").filter(line => line.trim() !== "") : [];

        await prisma.project.create({
            data: {
                ...data,
                location: location || null,
                description: descArray,
            },
        });

        revalidatePath("/", "layout");
        return { message: "Project created" };
    } catch (e) {
        return { message: "Failed to create project" };
    }
}

export async function deleteProject(id: string) {
    try {
        await prisma.project.delete({ where: { id } });
        revalidatePath("/", "layout");
        return { message: "Deleted" };
    } catch (e) {
        return { message: "Failed to delete" };
    }
}

const ExperienceSchema = z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    location: z.string().optional(),
    date: z.string().min(1),
    description: z.string().optional(),
});

export async function createExperience(prevState: any, formData: FormData) {
    try {
        const rawData = {
            title: formData.get("title"),
            subtitle: formData.get("subtitle"),
            location: formData.get("location"),
            date: formData.get("date"),
            description: formData.get("description"),
        };

        const validatedFields = ExperienceSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const { description, location, ...data } = validatedFields.data;
        const descArray = description ? description.split("\n").filter(line => line.trim() !== "") : [];

        await prisma.experience.create({
            data: {
                ...data,
                location: location || null,
                description: descArray,
            },
        });

        revalidatePath("/", "layout");
        return { message: "Experience created" };
    } catch (e) {
        return { message: "Failed to create experience" };
    }
}

export async function deleteExperience(id: string) {
    try {
        await prisma.experience.delete({ where: { id } });
        revalidatePath("/", "layout");
        return { message: "Deleted" };
    } catch (e) {
        return { message: "Failed to delete" };
    }
}
