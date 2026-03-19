"use client";

import { useState } from "react";
import { activateTOTP } from "@/app/actions/auth";
import { ShieldCheck, Loader2, QrCode, ArrowRight } from "lucide-react";
import Image from "next/image";

interface TOTPSetupProps {
    email: string;
    secret: string;
    qrCode: string;
    onComplete: () => void;
}

export default function TOTPSetup({ email, secret, qrCode, onComplete }: TOTPSetupProps) {
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (token.length !== 6) {
            setError("Please enter a 6-digit code.");
            return;
        }

        setIsLoading(true);
        setError("");
        
        try {
            const result = await activateTOTP(token, secret);
            if (result.success) {
                onComplete();
            } else {
                setError(result.error || "Verification failed.");
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
                    <QrCode className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">Setup Authenticator</h2>
                <p className="text-xs text-muted-foreground max-w-[240px] mx-auto">
                    Scan this QR code with Google Authenticator or any TOTP app.
                </p>
            </div>

            <div className="flex justify-center bg-white p-4 rounded-3xl shadow-inner mx-auto w-fit border border-border/50">
                <Image 
                    src={qrCode} 
                    alt="TOTP QR Code" 
                    width={200} 
                    height={200} 
                    className="rounded-lg"
                />
            </div>

            <div className="space-y-4">
                <div className="p-3 bg-muted/50 rounded-xl border border-border/50">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center mb-1">Backup Key</p>
                    <p className="text-sm font-mono font-bold text-center tracking-wider">{secret}</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-4">
                    <div className="space-y-1">
                        <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            pattern="\d{6}"
                            maxLength={6}
                            value={token}
                            onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
                            placeholder="Enter 6-digit code"
                            className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-center text-2xl font-black tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30 placeholder:tracking-normal placeholder:text-sm"
                        />
                        {error && <p className="text-[10px] text-red-500 font-bold uppercase text-center">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || token.length !== 6}
                        className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold hover:bg-primary/90 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <ShieldCheck className="w-5 h-5" />
                                Verify & Complete Setup
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
