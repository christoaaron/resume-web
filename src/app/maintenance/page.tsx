import { Construction } from "lucide-react";

export default function MaintenancePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                        <Construction className="w-16 h-16 text-primary animate-pulse" />
                    </div>
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight">
                    Under Maintenance
                </h1>
                
                <p className="text-muted-foreground text-lg">
                    We're currently making some improvements to the site to bring you a better experience. We'll be back shortly!
                </p>
                
                <div className="pt-8">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Thank you for your patience
                    </p>
                </div>
            </div>
        </div>
    );
}
