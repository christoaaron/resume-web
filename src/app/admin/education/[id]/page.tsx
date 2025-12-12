import { prisma } from "@/lib/prisma";
import { EducationForm } from "../education-form";
import { notFound } from "next/navigation";

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const education = await prisma.education.findUnique({
        where: { id },
    });

    if (!education) {
        notFound();
    }

    const safeEducation = {
        ...education,
        createdAt: education.createdAt.toISOString(),
        updatedAt: education.updatedAt.toISOString(),
    };

    return <EducationForm initialData={safeEducation} />;
}
