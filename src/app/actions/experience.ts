"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { ActionState } from "@/lib/types";

const ExperienceSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().min(1, "Subtitle is required"),
    location: z.string().optional(),
    startDate: z.string().min(1, "Start Date is required"),
    endDate: z.string().optional(),
    current: z.boolean().default(false),
    description: z.string().optional(),
});

export async function createExperience(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const rawData = {
            title: formData.get("title"),
            subtitle: formData.get("subtitle"),
            location: formData.get("location"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            current: formData.get("current") === "on",
            description: formData.get("description"),
        };

        const validatedFields = ExperienceSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const { description, location, startDate, endDate, current, ...data } = validatedFields.data;
        const descArray = description ? description.split("\n").filter(line => line.trim() !== "") : [];

        const { generateDateString } = await import("@/lib/utils");
        const dateStr = generateDateString(startDate, endDate, current);

        await prisma.experience.create({
            data: {
                ...data,
                startDate,
                endDate: current ? null : (endDate || null),
                current,
                date: dateStr,
                location: location || null,
                description: descArray,
            },
        });

        revalidatePath("/", "layout");
        revalidateTag("experience", { expire: 0 });
        return { message: "Experience created successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to create experience", success: false };
    }
}

export async function updateExperience(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const rawData = {
            title: formData.get("title"),
            subtitle: formData.get("subtitle"),
            location: formData.get("location"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            current: formData.get("current") === "on",
            description: formData.get("description"),
        };

        const validatedFields = ExperienceSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const { description, location, startDate, endDate, current, ...data } = validatedFields.data;
        const descArray = description ? description.split("\n").filter(line => line.trim() !== "") : [];

        const { generateDateString } = await import("@/lib/utils");
        const dateStr = generateDateString(startDate, endDate, current);

        await prisma.experience.update({
            where: { id },
            data: {
                ...data,
                startDate,
                endDate: current ? null : (endDate || null),
                current,
                date: dateStr,
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
    } catch {
        return { message: "Failed to delete experience", success: false };
    }
}
