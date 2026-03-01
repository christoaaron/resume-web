/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createOrganization, updateOrganization } from "@/app/actions/organizations";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";

import { ActionState } from "@/lib/types";

type OrganizationFormProps = {
    initialData?: { [key: string]: any };
};

export function OrganizationForm({ initialData }: OrganizationFormProps) {
    const action = initialData
        ? updateOrganization.bind(null, initialData.id)
        : createOrganization;

    const initialState: ActionState = { message: "", success: false };
    const [state, formAction] = useFormState(action, initialState);

    return (
        <div className="max-w-2xl mx-auto p-6 md:p-12">
            <Link href="/admin/organizations" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Organizations
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    {initialData ? "Edit Organization" : "Add Organization"}
                </h1>
                <p className="text-muted-foreground mt-1">
                    {initialData ? "Update existing details." : "Add a new volunteer role or affiliation."}
                </p>
            </header>

            <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Role / Title</label>
                    <input
                        name="title"
                        defaultValue={initialData?.title || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="e.g. Volunteer Coordinator"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Organization Name</label>
                    <input
                        name="subtitle"
                        defaultValue={initialData?.subtitle || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="e.g. Tech for Good"
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
                            placeholder="e.g. 2023 - Present"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location (Optional)</label>
                        <input
                            name="location"
                            defaultValue={initialData?.location || ""}
                            className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                            placeholder="e.g. Remote"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        {initialData ? "Save Changes" : "Add Organization"}
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
