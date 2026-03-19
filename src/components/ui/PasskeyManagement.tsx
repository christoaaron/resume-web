"use client";

import { useState } from "react";
import { Key, Plus, ShieldCheck, Trash2, Fingerprint, CheckCircle2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function PasskeyManagement({ hasPasskey }: { hasPasskey: boolean }) {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleRegister = async () => {
        if (hasPasskey) return;
        setIsLoading(true);
        setMessage(null);
        try {
            const result = await signIn("passkey", { action: "register", redirect: false });
            
            if (result?.error) {
                setMessage({ type: "error", text: "Failed to register passkey. Make sure your browser supports it." });
            } else {
                setMessage({ type: "success", text: "Passkey registered successfully!" });
                // We should probably refresh the page or state here, but for now we just show success
            }
        } catch (error) {
            console.error("Passkey registration error:", error);
            setMessage({ type: "error", text: "An unexpected error occurred." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Passkey Security</h2>
                    <p className="text-sm text-muted-foreground">Login securely using biometrics or hardware keys.</p>
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border ${
                    hasPasskey ? "bg-green-500/5 border-green-500/20" : "bg-muted/50 border-border/50"
                }`}>
                    <div className="flex items-center gap-3">
                        {hasPasskey ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                            <Fingerprint className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div>
                            <p className="text-sm font-semibold">
                                {hasPasskey ? "Passkey Active" : "Register New Passkey"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {hasPasskey 
                                    ? "Your account is protected by a hardware-backed passkey." 
                                    : "Add this device as a secure login method."}
                            </p>
                        </div>
                    </div>
                    
                    {!hasPasskey && (
                        <button 
                            onClick={handleRegister} 
                            disabled={isLoading}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 h-10 px-6 rounded-full text-sm font-bold flex items-center gap-2 transition-all active:scale-95"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    Wait...
                                </>
                            ) : (
                                <><Plus className="w-4 h-4" /> Register Device</>
                            )}
                        </button>
                    )}
                </div>

                {message && (
                    <div className={`p-4 rounded-xl text-sm font-medium ${
                        message.type === "success" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                    }`}>
                        {message.text}
                    </div>
                )}

                <div className="pt-2">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">How it works</p>
                    <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                        <li>Passkeys use end-to-end encryption and biometrics (FaceID, TouchID).</li>
                        <li>Your biometric data never leaves your device and is never sent to our servers.</li>
                        <li>Once registered, you can log in instantly without typing a password.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
