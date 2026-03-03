"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import { ActionState } from "@/lib/types";

const EducationSchema = z.object({
    title: z.string().min(1, "Degree/Title is required"),
    subtitle: z.string().min(1, "School/Subtitle is required"),
    location: z.string().optional(),
    startDate: z.string().min(1, "Start Date is required"),
    endDate: z.string().optional(),
    current: z.boolean().default(false),
});

export async function createEducation(prevState: ActionState, formData: FormData) {
    try {
        const rawData = {
            title: formData.get("title"),
            subtitle: formData.get("subtitle"),
            location: formData.get("location"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            current: formData.get("current") === "on",
        };

        const validatedFields = EducationSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const { location, startDate, endDate, current, ...data } = validatedFields.data;

        const { generateDateString } = await import("@/lib/utils");
        const dateStr = generateDateString(startDate, endDate, current);

        await prisma.education.create({
            data: {
                ...data,
                startDate,
                endDate: current ? null : (endDate || null),
                current,
                date: dateStr,
                location: location || null,
            },
        });

        revalidatePath("/", "layout");
        revalidateTag("education", { expire: 0 });
        return { message: "Education created successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to create education", success: false };
    }
}

export async function updateEducation(id: string, prevState: ActionState, formData: FormData) {
    try {
        const rawData = {
            title: formData.get("title"),
            subtitle: formData.get("subtitle"),
            location: formData.get("location"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            current: formData.get("current") === "on",
        };

        const validatedFields = EducationSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const { location, startDate, endDate, current, ...data } = validatedFields.data;

        const { generateDateString } = await import("@/lib/utils");
        const dateStr = generateDateString(startDate, endDate, current);

        await prisma.education.update({
            where: { id },
            data: {
                ...data,
                startDate,
                endDate: current ? null : (endDate || null),
                current,
                date: dateStr,
                location: location || null,
            },
        });

        revalidatePath("/", "layout");
        revalidateTag("education", { expire: 0 });
        return { message: "Education updated successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to update education", success: false };
    }
}

export async function deleteEducation(id: string) {
    try {
        await prisma.education.delete({ where: { id } });
        revalidatePath("/", "layout");
        return { message: "Education deleted successfully", success: true };
    } catch {
        return { message: "Failed to delete education", success: false };
    }
}
