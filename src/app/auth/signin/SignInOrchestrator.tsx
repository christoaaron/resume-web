"use client";

import { useState } from "react";
import TOTPLogin from "./TOTPLogin";
import TOTPSetup from "./TOTPSetup";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface SignInOrchestratorProps {
    isAdminSetup: boolean;
    setupData: {
        email: string;
        secret: string;
        qrCode: string;
    } | null;
}

export default function SignInOrchestrator({ isAdminSetup, setupData }: SignInOrchestratorProps) {
    const [isComplete, setIsComplete] = useState(false);

    if (isComplete) {
        return (
            <div className="text-center space-y-6 py-8 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full animate-pulse" />
                        <CheckCircle2 className="w-16 h-16 text-green-500 relative z-10" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-black tracking-tight">Setup Successful!</h2>
                    <p className="text-sm text-muted-foreground">Your administrator account is now secured.</p>
                </div>
                <button 
                    onClick={() => window.location.reload()}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-[0.98]"
                >
                    Continue to Login
                </button>
            </div>
        );
    }

    if (!isAdminSetup && setupData) {
        return (
            <TOTPSetup 
                email={setupData.email}
                secret={setupData.secret}
                qrCode={setupData.qrCode}
                onComplete={() => setIsComplete(true)}
            />
        );
    }

    return <TOTPLogin />;
}
