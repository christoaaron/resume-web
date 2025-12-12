"use client";

import { updateProfile } from "@/app/actions/profile";
// Using any for initialData to avoid Prisma type import issues
import { useFormState } from "react-dom";

export function ProfileForm({ initialData }: { initialData: any }) {
    const [state, formAction] = useFormState(updateProfile as any, { message: "" });

    return (
        <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                        name="name"
                        defaultValue={initialData?.name || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                        name="email"
                        type="email"
                        defaultValue={initialData?.email || ""}
                        className="w-full bg-muted border border-border rounded px-3 py-2"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Headline / Tagline</label>
                <input
                    name="headline"
                    defaultValue={initialData?.headline || ""}
                    className="w-full bg-muted border border-border rounded px-3 py-2"
                    placeholder="e.g. Crafting digital experiences..."
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Bio (About Section)</label>
                <textarea
                    name="bio"
                    rows={6}
                    defaultValue={initialData?.bio || ""}
                    className="w-full bg-muted border border-border rounded px-3 py-2"
                    required
                />
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-medium pt-2">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-xs text-muted-foreground">GitHub URL</label>
                        <input name="github" defaultValue={initialData?.github || ""} className="w-full bg-muted border border-border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">LinkedIn URL</label>
                        <input name="linkedin" defaultValue={initialData?.linkedin || ""} className="w-full bg-muted border border-border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">Instagram URL</label>
                        <input name="instagram" defaultValue={initialData?.instagram || ""} className="w-full bg-muted border border-border rounded px-3 py-2" />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90">
                    Save Changes
                </button>
                {state?.message && (
                    <p className={`mt-2 text-sm ${state.message.includes("success") ? "text-green-500" : "text-red-500"}`}>
                        {state.message}
                    </p>
                )}
            </div>
        </form>
    );
}
