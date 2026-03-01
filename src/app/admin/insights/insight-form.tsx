/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createInsight, updateInsight } from "@/app/actions/insights";
import Link from "next/link";
import { useFormState } from "react-dom";
import { ArrowLeft } from "lucide-react";
import { ActionState } from "@/lib/types";

type InsightFormProps = {
    initialData?: { [key: string]: any };
};

export function InsightForm({ initialData }: InsightFormProps) {
    const action = initialData
        ? updateInsight.bind(null, initialData.id)
        : createInsight;

    const initialState: ActionState = { message: "", success: false };
    const [state, formAction] = useFormState(action, initialState);

    return (
        <div className="max-w-3xl mx-auto p-6 md:p-12">
            <Link href="/admin/insights" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Insights
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    {initialData ? "Edit Insight" : "New Insight"}
                </h1>
                <p className="text-muted-foreground mt-1">
                    {initialData ? "Update your blog post." : "Draft a new insight or blog article."}
                </p>
            </header>

            <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input
                            name="title"
                            defaultValue={initialData?.title || ""}
                            className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                            placeholder="e.g. My Thoughts on Next.js 15"
                            required
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Slug (URL)</label>
                        <input
                            name="slug"
                            defaultValue={initialData?.slug || ""}
                            className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                            placeholder="e.g. my-thoughts-on-nextjs-15"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Excerpt (Short Summary)</label>
                    <textarea
                        name="excerpt"
                        rows={2}
                        defaultValue={initialData?.excerpt || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="A short description indicating what this post is about..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Cover Image URL (Optional)</label>
                    <input
                        name="coverImage"
                        defaultValue={initialData?.coverImage || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                        placeholder="https://..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                        <input 
                            type="checkbox" 
                            name="published" 
                            value="true" 
                            defaultChecked={initialData?.published || false}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        Published
                    </label>
                    <p className="text-xs text-muted-foreground ml-6">If unchecked, this insight will be saved as a draft.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Content (Markdown supported)</label>
                    <p className="text-xs text-muted-foreground">You can use standard Markdown to format your post, add images, links, and code blocks.</p>
                    <textarea
                        name="content"
                        rows={16}
                        defaultValue={initialData?.content || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none font-mono text-sm"
                        placeholder="Write your content here..."
                        required
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        {initialData ? "Save Changes" : "Create Insight"}
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
