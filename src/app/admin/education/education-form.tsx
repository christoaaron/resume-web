"use client";

import { createEducation, updateEducation } from "@/app/actions/education";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";

type EducationFormProps = {
    initialData?: any;
};

export function EducationForm({ initialData }: EducationFormProps) {
    const action = initialData
        ? updateEducation.bind(null, initialData.id)
        : createEducation;

    const [state, formAction] = useFormState(action as any, { message: "", success: false });

    return (
        <div className="max-w-2xl mx-auto p-6 md:p-12">
            <Link href="/admin/education" className="flex items-center text-sm text-secondary hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Education
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    {initialData ? "Edit Education" : "Add Education"}
                </h1>
                <p className="text-secondary mt-1">
                    {initialData ? "Update academic details." : "Add a new degree or certification."}
                </p>
            </header>

            <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Degree / Title</label>
                    <input
                        name="title"
                        defaultValue={initialData?.title || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="e.g. Bachelor of Science in Computer Science"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">School / Institution</label>
                    <input
                        name="subtitle"
                        defaultValue={initialData?.subtitle || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="e.g. University of Technology"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Date / Year</label>
                        <input
                            name="date"
                            defaultValue={initialData?.date || ""}
                            className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                            placeholder="e.g. 2018 - 2022"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location (Optional)</label>
                        <input
                            name="location"
                            defaultValue={initialData?.location || ""}
                            className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                            placeholder="e.g. London, UK"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        {initialData ? "Save Changes" : "Add Education"}
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
