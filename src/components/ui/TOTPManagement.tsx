"use client";

import { ShieldCheck, CheckCircle2, KeyRound } from "lucide-react";

export default function TOTPManagement({ hasTOTP }: { hasTOTP: boolean }) {
    return (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Account Security</h2>
                    <p className="text-sm text-muted-foreground">Manage your 6-digit Authenticator access.</p>
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border ${
                    hasTOTP ? "bg-green-500/5 border-green-500/20" : "bg-amber-500/5 border-amber-500/20"
                }`}>
                    <div className="flex items-center gap-3">
                        {hasTOTP ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                            <KeyRound className="w-5 h-5 text-amber-500" />
                        )}
                        <div>
                            <p className="text-sm font-semibold">
                                {hasTOTP ? "2FA Protected" : "Setup Required"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {hasTOTP 
                                    ? "Your account is secured with Google Authenticator (TOTP)." 
                                    : "You must complete the initial setup to secure your account."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">Security Policy</p>
                    <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                        <li>This portfolio uses <strong>Time-based One-Time Passwords (TOTP)</strong> as the sole authentication method.</li>
                        <li>Keep your backup key safe. If you lose access to your Authenticator app, you may be locked out of the admin panel.</li>
                        <li>Codes refresh every 30 seconds for maximum security.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
