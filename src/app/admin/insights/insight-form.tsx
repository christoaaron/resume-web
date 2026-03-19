/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createInsight, updateInsight } from "@/app/actions/insights";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
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
    const [content, setContent] = useState(initialData?.content || "");

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
                    <p className="text-xs text-muted-foreground">Panoramic images work best. Recommended: <span className="text-primary/80 font-mono">2560 x 850px</span> (3:1 ratio).</p>
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
                    <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                        <input 
                            type="checkbox" 
                            name="featured" 
                            value="true" 
                            defaultChecked={initialData?.featured || false}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        Featured (Show on Homepage)
                    </label>
                    <p className="text-xs text-muted-foreground ml-6">If unchecked, this insight will be saved as a draft.</p>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Insight Content / Blog Post</label>
                        <p className="text-xs text-muted-foreground">Write your thoughts or article here.</p>
                    </div>
                    <RichTextEditor 
                        value={content} 
                        onChange={setContent} 
                        placeholder="Write your insight here..." 
                    />
                    <input type="hidden" name="content" value={content} />
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Notion Link or Embed Code (Recommended Method)</label>
                        <p className="text-xs text-muted-foreground">Paste the "Share to Web" link from Notion or an iframe embed code. This will override the description above if provided.</p>
                    </div>
                    
                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex gap-3">
                        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-primary uppercase tracking-wider">How to get this?</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                1. In Notion, click <strong className="text-foreground">Share</strong> at the top right.<br/>
                                2. Turn on <strong className="text-foreground">Publish to Web</strong>.<br/>
                                3. Copy the link and paste it here.
                            </p>
                        </div>
                    </div>

                    <textarea
                        name="notionEmbed"
                        rows={3}
                        defaultValue={initialData?.notionEmbed || ""}
                        className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary outline-none font-mono text-sm"
                        placeholder="https://www.notion.so/My-Post-..."
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium cursor-pointer"
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
