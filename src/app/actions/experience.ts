"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ExperienceSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().min(1, "Subtitle is required"),
    location: z.string().optional(),
    date: z.string().min(1, "Date is required"),
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
        return { message: "Experience created successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to create experience", success: false };
    }
}

export async function updateExperience(id: string, prevState: any, formData: FormData) {
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

        await prisma.experience.update({
            where: { id },
            data: {
                ...data,
                location: location || null,
                description: descArray,
            },
        });

        revalidatePath("/", "layout");
        return { message: "Experience updated successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to update experience", success: false };
    }
}

export async function deleteExperience(id: string) {
    try {
        await prisma.experience.delete({ where: { id } });
        revalidatePath("/", "layout");
        return { message: "Experience deleted successfully", success: true };
    } catch (e) {
        return { message: "Failed to delete experience", success: false };
    }
}
