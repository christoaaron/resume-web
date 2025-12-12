import { prisma } from "@/lib/prisma";
import { ProjectForm } from "../project-form";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) {
        notFound();
    }

    // Pass the raw project object. The form handles string/null conversions if needed,
    // but Prisma Date objects might need simple serialization if we were passing to Client Component directly
    // EXCEPT ProjectForm is a client component, so we MUST serialize Dates.
    // However, Prisma objects with Date fields passed to Client Components in Next.js 14/15 often warn/error.
    // Let's safe-guard it.

    const safeProject = {
        ...project,
        // Convert dates to strings or keep them if Next.js handles it (it usually complains).
        // Best to just pass them as is and see if it breaks?
        // Actually, previous issues suggest we should OMIT or Serialize.
        // For the form, we likely display "2024" which is a string in the DB 'date' field?
        // Let's check schema.
        // 'date' is String in schema! 'createdAt' and 'updatedAt' are DateTime.
        // So we just need to omit createdAt/updatedAt or serialize them.
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
    };

    return <ProjectForm initialData={safeProject} />;
}
