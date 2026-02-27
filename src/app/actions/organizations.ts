"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import { ActionState } from "@/lib/types";

const OrganizationSchema = z.object({
    title: z.string().min(1, "Role/Title is required"),
    subtitle: z.string().min(1, "Organization is required"),
    location: z.string().optional(),
    date: z.string().min(1, "Date is required"),
});

export async function createOrganization(prevState: ActionState, formData: FormData) {
    try {
        const rawData = {
            title: formData.get("title"),
            subtitle: formData.get("subtitle"),
            location: formData.get("location"),
            date: formData.get("date"),
        };

        const validatedFields = OrganizationSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const { location, ...data } = validatedFields.data;

        await prisma.organization.create({
            data: {
                ...data,
                location: location || null,
            },
        });

        revalidatePath("/", "layout");
        revalidateTag("organizations", { expire: 0 });
        return { message: "Organization created successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to create organization", success: false };
    }
}

export async function updateOrganization(id: string, prevState: ActionState, formData: FormData) {
    try {
        const rawData = {
            title: formData.get("title"),
            subtitle: formData.get("subtitle"),
            location: formData.get("location"),
            date: formData.get("date"),
        };

        const validatedFields = OrganizationSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        const { location, ...data } = validatedFields.data;

        await prisma.organization.update({
            where: { id },
            data: {
                ...data,
                location: location || null,
            },
        });

        revalidatePath("/", "layout");
        return { message: "Organization updated successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to update organization", success: false };
    }
}

export async function deleteOrganization(id: string) {
    try {
        await prisma.organization.delete({ where: { id } });
        revalidatePath("/", "layout");
        return { message: "Organization deleted successfully", success: true };
    } catch {
        return { message: "Failed to delete organization", success: false };
    }
}
