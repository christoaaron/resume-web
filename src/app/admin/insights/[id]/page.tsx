import { prisma } from "@/lib/prisma";
import { InsightForm } from "../insight-form";
import { notFound } from "next/navigation";

export default async function EditInsightPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    const insight = await prisma.insight.findUnique({
        where: { id },
    });

    if (!insight) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-12">
            <InsightForm initialData={insight} />
        </div>
    );
}
