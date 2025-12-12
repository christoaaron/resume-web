import { prisma } from "@/lib/prisma";
import { ExperienceForm } from "../experience-form";
import { notFound } from "next/navigation";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const experience = await prisma.experience.findUnique({
        where: { id },
    });

    if (!experience) {
        notFound();
    }

    const safeExperience = {
        ...experience,
        createdAt: experience.createdAt.toISOString(),
        updatedAt: experience.updatedAt.toISOString(),
    };

    return <ExperienceForm initialData={safeExperience} />;
}
