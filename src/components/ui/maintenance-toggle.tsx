"use client";

import { useState } from "react";
import { updateSettings } from "@/app/actions/settings";
import { Construction } from "lucide-react";

type Props = {
    initialActive: boolean;
    initialMessage: string;
}

export function MaintenanceToggle({ initialActive, initialMessage }: Props) {
    const [isActive, setIsActive] = useState(initialActive);
    const [message, setMessage] = useState(initialMessage);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveStatus("idle");

        try {
            await updateSettings({
                maintenanceActive: isActive,
                maintenanceMessage: message
            });
            setSaveStatus("success");
            setTimeout(() => setSaveStatus("idle"), 3000);
        } catch (error) {
            console.error(error);
            setSaveStatus("error");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <form onSubmit={handleSave} className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-12">
            <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-xl ${isActive ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'}`}>
                    <Construction className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Maintenance Mode</h2>
                    <p className="text-muted-foreground text-sm">Control public access to your portfolio.</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                    <div>
                        <p className="font-medium">Enable Maintenance Mode</p>
                        <p className="text-sm text-muted-foreground">When active, visitors will see the maintenance screen instead of your site.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={isActive} 
                            onChange={(e) => setIsActive(e.target.checked)} 
                        />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Maintenance Message</label>
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="We're currently making some improvements to the site to bring you a better experience. We'll be back shortly!"
                        className="w-full p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-all min-h-[100px] resize-y"
                    />
                </div>

                <div className="flex justify-end items-center gap-4 pt-2">
                    {saveStatus === "success" && <span className="text-green-500 text-sm">Saved successfully!</span>}
                    {saveStatus === "error" && <span className="text-red-500 text-sm">Failed to save.</span>}
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? "Saving..." : "Save Settings"}
                    </button>
                </div>
            </div>
        </form>
    );
}
