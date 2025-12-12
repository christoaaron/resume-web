import { prisma } from "@/lib/prisma";
import { SkillForm } from "../../skill-form";
import { notFound } from "next/navigation";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const skill = await prisma.skill.findUnique({
        where: { id },
    });

    if (!skill) {
        notFound();
    }

    const safeSkill = {
        ...skill,
        createdAt: skill.createdAt.toISOString(),
        updatedAt: skill.updatedAt.toISOString(),
    };

    return <SkillForm initialData={safeSkill} />;
}
