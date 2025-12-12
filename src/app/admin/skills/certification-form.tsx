"use client";

import { createCertification, updateCertification } from "@/app/actions/skills";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";

type CertificationFormProps = {
    initialData?: any;
};

export function CertificationForm({ initialData }: CertificationFormProps) {
    const action = initialData
        ? updateCertification.bind(null, initialData.id)
        : createCertification;

    const [state, formAction] = useFormState(action as any, { message: "", success: false });

    return (
        <div className="max-w-md mx-auto p-6 md:p-12">
            <Link href="/admin/skills" className="flex items-center text-sm text-secondary hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Certifications
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    {initialData ? "Edit Certification" : "Add Certification"}
                </h1>
                <p className="text-secondary mt-1">
                    Manage your credentials.
                </p>
            </header>

            <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Certification Name</label>
                    <input
                        name="name"
                        defaultValue={initialData?.name || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="e.g. AWS Solutions Architect"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Credential Link (Optional)</label>
                    <input
                        name="link"
                        defaultValue={initialData?.link || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="https://..."
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        {initialData ? "Save Changes" : "Add Certification"}
                    </button>
                    {state?.message && (
                        <p className={`mt-4 text-center text-sm ${state.success ? "text-green-500" : "text-red-500"}`}>
                            {state.message}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
