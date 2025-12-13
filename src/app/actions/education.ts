"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const EducationSchema = z.object({
    title: z.string().min(1, "Degree/Title is required"),
    subtitle: z.string().min(1, "School/Subtitle is required"),
    location: z.string().optional(),
    date: z.string().min(1, "Date is required"),
});

export async function createEducation(prevState: any, formData: FormData) {
    try {
        const rawData = {
            title: formData.get("title"),
            subtitle: formData.get("subtitle"),
            location: formData.get("location"),
            date: formData.get("date"),
        };

        const validatedFields = EducationSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const { location, ...data } = validatedFields.data;

        await prisma.education.create({
            data: {
                ...data,
                location: location || null,
            },
        });

        revalidatePath("/", "layout");
        revalidateTag("education", { expire: 0 } as any);
        return { message: "Education created successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to create education", success: false };
    }
}

export async function updateEducation(id: string, prevState: any, formData: FormData) {
    try {
        const rawData = {
            title: formData.get("title"),
            subtitle: formData.get("subtitle"),
            location: formData.get("location"),
            date: formData.get("date"),
        };

        const validatedFields = EducationSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const { location, ...data } = validatedFields.data;

        await prisma.education.update({
            where: { id },
            data: {
                ...data,
                location: location || null,
            },
        });

        revalidatePath("/", "layout");
        revalidateTag("education", { expire: 0 } as any);
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
    } catch (e) {
        return { message: "Failed to delete education", success: false };
    }
}
