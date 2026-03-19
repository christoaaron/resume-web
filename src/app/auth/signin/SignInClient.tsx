"use client";

import { signIn } from "next-auth/react";
import { Fingerprint, ShieldAlert, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

export default function SignInClient({ hasPasskeys, email }: { hasPasskeys: boolean; email: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn("passkey", { 
                action: hasPasskeys ? "authenticate" : "register",
                email: hasPasskeys ? undefined : email,
                redirectTo: "/admin"
            });
        } catch (error) {
            console.error("Passkey error:", error);
        } finally {
            // We don't necessarily reset if redirecting, but for safety:
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {!hasPasskeys ? (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-6">
                    <div className="flex items-center gap-2 text-amber-500 mb-1">
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Initial Setup</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        No admin passkeys found. The first device to register will become the primary administrator.
                    </p>
                </div>
            ) : (
                <p className="text-sm text-muted-foreground text-center mb-6 px-4">
                    Authorized access only. Use your registered biometric or hardware key to continue.
                </p>
            )}

            <button
                type="button"
                disabled={isLoading}
                onClick={handleSignIn}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                    !hasPasskeys 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:brightness-110" 
                        : "bg-muted border border-border hover:bg-muted/80 hover:border-primary/50"
                }`}
            >
                {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : !hasPasskeys ? (
                    <>
                        <Sparkles className="w-6 h-6 animate-pulse" />
                        Register Admin Passkey
                    </>
                ) : (
                    <>
                        <Fingerprint className="w-6 h-6 text-primary" />
                        Sign in with Passkey
                    </>
                )}
            </button>

            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest pt-4">
                Powered by WebAuthn
            </p>
        </div>
    );
}
