"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const ProfileSchema = z.object({
    name: z.string().min(1),
    headline: z.string().min(1),
    bio: z.string().min(1),
    contactTitle: z.string().optional(),
    contactDescription: z.string().optional(),
    email: z.string().email(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
});

import { ActionState } from "@/lib/types";

export async function updateProfile(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        const rawData = {
            name: formData.get("name"),
            headline: formData.get("headline"),
            bio: formData.get("bio"),
            contactTitle: formData.get("contactTitle"),
            contactDescription: formData.get("contactDescription"),
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
        revalidateTag("profile", { expire: 0 } as any);
        return { message: "Profile updated successfully" };
    } catch (e) {
        console.error(e);
        return { message: "Failed to update profile" };
    }
}
