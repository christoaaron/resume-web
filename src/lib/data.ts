import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getProjects = unstable_cache(
    async () => {
        return await prisma.project.findMany({
            orderBy: { date: "desc" },
        });
    },
    ["projects"],
    { tags: ["projects"], revalidate: 3600 } // Cache for 1 hour or until invalidated
);

export const getExperience = unstable_cache(
    async () => {
        return await prisma.experience.findMany({
            orderBy: { date: "desc" },
        });
    },
    ["experience"],
    { tags: ["experience"], revalidate: 3600 }
);

export const getEducation = unstable_cache(
    async () => {
        return await prisma.education.findMany({
            orderBy: { date: "desc" },
        });
    },
    ["education"],
    { tags: ["education"], revalidate: 3600 }
);

export const getOrganizations = unstable_cache(
    async () => {
        return await prisma.organization.findMany({
            orderBy: { date: "desc" },
        });
    },
    ["organizations"],
    { tags: ["organizations"], revalidate: 3600 }
);

export const getSkills = unstable_cache(
    async () => {
        const hard = await prisma.skill.findMany({ where: { type: "HARD" } });
        const soft = await prisma.skill.findMany({ where: { type: "SOFT" } });
        return { hard, soft };
    },
    ["skills"],
    { tags: ["skills"], revalidate: 3600 }
);

export const getCertifications = unstable_cache(
    async () => {
        return await prisma.certification.findMany();
    },
    ["certifications"],
    { tags: ["certifications"], revalidate: 3600 }
);

export const getProfile = unstable_cache(
    async () => {
        // Return a static default profile; DB call omitted to avoid missing model errors
        return {
            id: "",
            name: "Christopher Aaron",
            headline: "Crafting digital experiences with precision and clarity.",
            bio: "I am a specialized developer focused on clarity and performance.",
            email: "hello@example.com",
            github: "",
            linkedin: "",
            instagram: "",
            twitter: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any;
    },
    ["profile"],
    { tags: ["profile"], revalidate: 3600 }
);
