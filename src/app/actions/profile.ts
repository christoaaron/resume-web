"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProfileSchema = z.object({
    name: z.string().min(1),
    headline: z.string().min(1),
    bio: z.string().min(1),
    email: z.string().email(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
});

export async function updateProfile(prevState: any, formData: FormData) {
    try {
        const rawData = {
            name: formData.get("name"),
            headline: formData.get("headline"),
            bio: formData.get("bio"),
            email: formData.get("email"),
            github: formData.get("github"),
            linkedin: formData.get("linkedin"),
            instagram: formData.get("instagram"),
        };

        const validatedFields = ProfileSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const data = validatedFields.data;

        // Check if profile exists
        const existing = await prisma.profile.findFirst();

        if (existing) {
            await prisma.profile.update({
                where: { id: existing.id },
                data,
            });
        } else {
            await prisma.profile.create({
                data,
            });
        }

        revalidatePath("/", "layout");
        return { message: "Profile updated successfully" };
    } catch (e) {
        console.error(e);
        return { message: "Failed to update profile" };
    }
}
