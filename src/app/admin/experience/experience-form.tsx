/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createExperience, updateExperience } from "@/app/actions/experience";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { ActionState } from "@/lib/types";

type ExperienceFormProps = {
    initialData?: { [key: string]: any };
};

export function ExperienceForm({ initialData }: ExperienceFormProps) {
    const action = initialData
        ? updateExperience.bind(null, initialData.id)
        : createExperience;

    const initialState: ActionState = { message: "", success: false };
    const [state, formAction] = useFormState(action, initialState);

    return (
        <div className="max-w-2xl mx-auto p-6 md:p-12">
            <Link href="/admin/experience" className="flex items-center text-sm text-secondary hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Experience
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    {initialData ? "Edit Experience" : "Add Experience"}
                </h1>
                <p className="text-secondary mt-1">
                    {initialData ? "Update existing role details." : "Add a new role to your work history."}
                </p>
            </header>

            <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Job Title</label>
                    <input
                        name="title"
                        defaultValue={initialData?.title || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="e.g. Senior Frontend Engineer"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Company / Subtitle</label>
                    <input
                        name="subtitle"
                        defaultValue={initialData?.subtitle || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="e.g. Tech Corp Inc."
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Date / Tenure</label>
                        <input
                            name="date"
                            defaultValue={initialData?.date || ""}
                            className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                            placeholder="e.g. 2022 - Present"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location (Optional)</label>
                        <input
                            name="location"
                            defaultValue={initialData?.location || ""}
                            className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                            placeholder="e.g. San Francisco, CA"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <p className="text-xs text-secondary">Separate points with new lines.</p>
                    <textarea
                        name="description"
                        rows={6}
                        defaultValue={initialData?.description?.join("\n") || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="- Led team of 5 developers&#10;- Architected new feature Y"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        {initialData ? "Save Changes" : "Add Experience"}
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
