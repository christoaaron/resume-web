"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// --- SKILLS ---

const SkillSchema = z.object({
    name: z.string().min(1, "Skill name is required"),
    type: z.enum(["HARD", "SOFT"]),
});

export async function createSkill(prevState: any, formData: FormData) {
    try {
        const rawData = {
            name: formData.get("name"),
            type: formData.get("type"),
        };

        const validatedFields = SkillSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        await prisma.skill.create({
            data: validatedFields.data,
        });

        revalidatePath("/", "layout");
        return { message: "Skill created successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to create skill", success: false };
    }
}

export async function updateSkill(id: string, prevState: any, formData: FormData) {
    try {
        const rawData = {
            name: formData.get("name"),
            type: formData.get("type"),
        };

        const validatedFields = SkillSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        await prisma.skill.update({
            where: { id },
            data: validatedFields.data,
        });

        revalidatePath("/", "layout");
        return { message: "Skill updated successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to update skill", success: false };
    }
}

export async function deleteSkill(id: string) {
    try {
        await prisma.skill.delete({ where: { id } });
        revalidatePath("/", "layout");
        return { message: "Skill deleted successfully", success: true };
    } catch (e) {
        return { message: "Failed to delete skill", success: false };
    }
}

// --- CERTIFICATIONS ---

const CertificationSchema = z.object({
    name: z.string().min(1, "Certification name is required"),
    link: z.string().optional(),
});

export async function createCertification(prevState: any, formData: FormData) {
    try {
        const rawData = {
            name: formData.get("name"),
            link: formData.get("link"),
        };

        const validatedFields = CertificationSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        await prisma.certification.create({
            data: {
                name: validatedFields.data.name,
                link: validatedFields.data.link || null,
            },
        });

        revalidatePath("/", "layout");
        return { message: "Certification created successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to create certification", success: false };
    }
}

export async function updateCertification(id: string, prevState: any, formData: FormData) {
    try {
        const rawData = {
            name: formData.get("name"),
            link: formData.get("link"),
        };

        const validatedFields = CertificationSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return { message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
        }

        await prisma.certification.update({
            where: { id },
            data: {
                name: validatedFields.data.name,
                link: validatedFields.data.link || null,
            },
        });

        revalidatePath("/", "layout");
        return { message: "Certification updated successfully", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to update certification", success: false };
    }
}

export async function deleteCertification(id: string) {
    try {
        await prisma.certification.delete({ where: { id } });
        revalidatePath("/", "layout");
        return { message: "Certification deleted successfully", success: true };
    } catch (e) {
        return { message: "Failed to delete certification", success: false };
    }
}
