import { prisma } from "@/lib/prisma";
import { CertificationForm } from "../../certification-form";
import { notFound } from "next/navigation";

export default async function EditCertPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cert = await prisma.certification.findUnique({
        where: { id },
    });

    if (!cert) {
        notFound();
    }

    const safeCert = {
        ...cert,
        createdAt: cert.createdAt.toISOString(),
        updatedAt: cert.updatedAt.toISOString(),
    };

    return <CertificationForm initialData={safeCert} />;
}
