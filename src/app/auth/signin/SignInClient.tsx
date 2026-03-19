"use client";

import { signIn } from "next-auth/react";
import { Fingerprint, ShieldAlert, Sparkles } from "lucide-react";

export default function SignInClient({ hasPasskeys }: { hasPasskeys: boolean }) {
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
                onClick={() => signIn("passkey", { action: hasPasskeys ? "authenticate" : "register", redirectTo: "/admin" })}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-primary/20 active:scale-[0.98] ${
                    !hasPasskeys 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:brightness-110" 
                        : "bg-muted border border-border hover:bg-muted/80 hover:border-primary/50"
                }`}
            >
                {!hasPasskeys ? (
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
