/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createSkill, updateSkill } from "@/app/actions/skills";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";

import { ActionState } from "@/lib/types";

type SkillFormProps = {
    initialData?: { [key: string]: any };
};

export function SkillForm({ initialData }: SkillFormProps) {
    const searchParams = useSearchParams();
    // Default type from URL or initialData or fallback to HARD
    const defaultType = initialData?.type || searchParams.get("type") || "HARD";

    const action = initialData
        ? updateSkill.bind(null, initialData.id)
        : createSkill;

    const initialState: ActionState = { message: "", success: false };
    const [state, formAction] = useFormState(action, initialState);

    return (
        <div className="max-w-md mx-auto p-6 md:p-12">
            <Link href="/admin/skills" className="flex items-center text-sm text-secondary hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Skills
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    {initialData ? "Edit Skill" : "Add Skill"}
                </h1>
                <p className="text-secondary mt-1">
                    {initialData ? "Update skill details." : `Add a new ${defaultType.toLowerCase()} skill.`}
                </p>
            </header>

            <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Skill Name</label>
                    <input
                        name="name"
                        defaultValue={initialData?.name || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="e.g. TypeScript"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <select
                        name="type"
                        defaultValue={defaultType}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                    >
                        <option value="HARD">Hard Skill (Technical)</option>
                        <option value="SOFT">Soft Skill (Interpersonal)</option>
                    </select>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        {initialData ? "Save Changes" : "Add Skill"}
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
