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
        const profile = await prisma.profile.findFirst();
        return profile || {
            id: "",
            name: "Christopher Aaron",
            headline: "Crafting digital experiences with precision and clarity.",
            bio: "I am a specialized developer focused on clarity and performance.",
            contactTitle: "Let's work together.",
            contactDescription: "Available for freelance and full-time opportunities.",
            email: "hello@example.com",
            github: "",
            linkedin: "",
            instagram: "",
            twitter: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    },
    ["profile"],
    { tags: ["profile"], revalidate: 60 } // Reduce cache to 60s
);

export const getInsights = unstable_cache(
    async (publishedOnly: boolean = true) => {
        return await prisma.insight.findMany({
            where: publishedOnly ? { published: true } : undefined,
            orderBy: { createdAt: "desc" },
        });
    },
    ["insights"],
    { tags: ["insights"], revalidate: 3600 }
);

export const getInsightBySlug = unstable_cache(
    async (slug: string) => {
        return await prisma.insight.findUnique({
            where: { slug },
        });
    },
    ["insight"],
    { tags: ["insights"], revalidate: 3600 }
);

export const getCaseStudies = unstable_cache(
    async (publishedOnly: boolean = true) => {
        return await prisma.caseStudy.findMany({
            where: publishedOnly ? { published: true } : undefined,
            orderBy: { createdAt: "desc" },
        });
    },
    ["case-studies"],
    { tags: ["case-studies"], revalidate: 3600 }
);

export const getCaseStudyBySlug = unstable_cache(
    async (slug: string) => {
        return await prisma.caseStudy.findUnique({
            where: { slug },
        });
    },
    ["case-study"],
    { tags: ["case-studies"], revalidate: 3600 }
);
