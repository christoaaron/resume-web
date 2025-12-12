import { prisma } from "@/lib/prisma";
import { OrganizationForm } from "../organization-form";
import { notFound } from "next/navigation";

export default async function EditOrganizationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const organization = await prisma.organization.findUnique({
        where: { id },
    });

    if (!organization) {
        notFound();
    }

    const safeOrganization = {
        ...organization,
        createdAt: organization.createdAt.toISOString(),
        updatedAt: organization.updatedAt.toISOString(),
    };

    return <OrganizationForm initialData={safeOrganization} />;
}
