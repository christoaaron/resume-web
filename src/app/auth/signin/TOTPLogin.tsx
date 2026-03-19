"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Fingerprint, Loader2, KeyRound, ShieldAlert } from "lucide-react";

export default function TOTPLogin() {
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (token.length !== 6) {
            setError("Please enter a 6-digit code.");
            return;
        }

        setIsLoading(true);
        setError("");
        
        try {
            const result = await signIn("credentials", {
                token,
                redirect: false,
                callbackUrl: "/admin"
            });

            if (result?.error) {
                setError("Invalid authentication code.");
            } else {
                window.location.href = "/admin";
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-primary/10 rounded-2xl mb-2 text-primary">
                    <KeyRound className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">Authenticator Code</h2>
                <p className="text-xs text-muted-foreground max-w-[200px] mx-auto">
                    Enter the 6-digit code from your Google Authenticator app.
                </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="\d{6}"
                        maxLength={6}
                        value={token}
                        onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
                        placeholder="000000"
                        className="w-full bg-muted/50 border border-border/50 rounded-2xl px-4 py-4 text-center text-4xl font-black tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/10"
                    />
                    {error && (
                        <div className="flex items-center gap-1 text-red-500 justify-center">
                            <ShieldAlert className="w-3 h-3" />
                            <p className="text-[10px] font-bold uppercase">{error}</p>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading || token.length !== 6}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-primary/20 hover:bg-primary/95 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        <>
                            Verify & Access
                        </>
                    )}
                </button>
            </form>

            <div className="pt-4 flex flex-col items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Secured by TOTP</p>
            </div>
        </div>
    );
}
