import { prisma } from "@/lib/prisma";
import { CaseStudyForm } from "../case-study-form";
import { notFound } from "next/navigation";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
    // Next.js 15: params is a promise
    const { id } = await params;
    
    const caseStudy = await prisma.caseStudy.findUnique({
        where: { id },
    });

    if (!caseStudy) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-12">
            <CaseStudyForm initialData={caseStudy} />
        </div>
    );
}
