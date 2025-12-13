"use client";

import { createProject, updateProject } from "@/app/actions/projects";
import { Project } from "@prisma/client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { ArrowLeft } from "lucide-react";
import { ActionState } from "@/lib/types";

// Omit date objects to be safe with server/client boundary if passed directly, 
// though initialData usually comes from server component so it might have Dates.
// We'll trust the parent to serialize or Prisma to handle it if it's direct.
// Actually, usually we should serialize.
type ProjectFormProps = {
    initialData?: any; // Using any to avoid strict Date serialization issues
};

export function ProjectForm({ initialData }: ProjectFormProps) {
    const action = initialData
        ? updateProject.bind(null, initialData.id)
        : createProject;

    const initialState: ActionState = { message: "", success: false };
    const [state, formAction] = useFormState(action, initialState);

    return (
        <div className="max-w-2xl mx-auto p-6 md:p-12">
            <Link href="/admin/projects" className="flex items-center text-sm text-secondary hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Projects
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    {initialData ? "Edit Project" : "New Project"}
                </h1>
                <p className="text-secondary mt-1">
                    {initialData ? "Update existing project details." : "Add a new project to your portfolio."}
                </p>
            </header>

            <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Project Title</label>
                    <input
                        name="title"
                        defaultValue={initialData?.title || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="e.g. E-Commerce Platform"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Subtitle / Tech Stack</label>
                    <input
                        name="subtitle"
                        defaultValue={initialData?.subtitle || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="e.g. Next.js, Prisma, Stripe"
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
                            placeholder="e.g. 2024"
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

                <div className="space-y-2">
                    <label className="text-sm font-medium">Project Link (Optional)</label>
                    <input
                        name="link"
                        defaultValue={initialData?.link || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="https://..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <p className="text-xs text-secondary">Separate points with new lines.</p>
                    <textarea
                        name="description"
                        rows={6}
                        defaultValue={initialData?.description?.join("\n") || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="- Implemented feature X&#10;- Optimized performance Y"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        {initialData ? "Save Changes" : "Create Project"}
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
