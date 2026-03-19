import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import SignInClient from "./SignInClient";
import { LayoutDashboard } from "lucide-react";

export default async function SignIn() {
    // Check if any admin passkeys are registered
    const authenticatorCount = await prisma.authenticator.count();
    
    // If no passkeys exist, we pre-create the admin user to allow "first-come-first-served" registration
    const defaultEmail = "admin@example.com";
    if (authenticatorCount === 0) {
        await prisma.user.upsert({
            where: { email: defaultEmail },
            update: {},
            create: {
                name: "Administrator",
                email: defaultEmail,
            }
        });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] -z-10" />

            <div className="w-full max-w-md space-y-8 relative z-10">
                <div className="text-center group">
                    <div className="inline-flex p-4 bg-primary/10 rounded-3xl mb-4 group-hover:scale-110 transition-transform duration-500">
                        <LayoutDashboard className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Portfolio Admin</h1>
                    <p className="text-muted-foreground font-medium">Secure Biometric Access</p>
                </div>

                <Card className="p-10 bg-card/50 backdrop-blur-xl border-border shadow-2xl rounded-[2.5rem]">
                    <SignInClient hasPasskeys={authenticatorCount > 0} email={defaultEmail} />
                </Card>

                <div className="text-center">
                    <p className="text-xs text-muted-foreground/60 font-medium">
                        © {new Date().getFullYear()} Christopher Aaron. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
