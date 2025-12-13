"use client";

import { useOptimistic, useTransition } from "react";
import { Star } from "lucide-react";
import { toggleSkillFeatured } from "@/app/actions/skills";
import { useRouter } from "next/navigation";

export default function FeaturedToggle({ id, initialFeatured }: { id: string; initialFeatured: boolean }) {
    const [isFeatured, setFeatured] = useOptimistic(initialFeatured);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleToggle = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        startTransition(async () => {
            // Optimistically flip the state
            setFeatured(!isFeatured);

            // Call server action
            const result = await toggleSkillFeatured(id);
            if (!result.success) {
                // Even if it fails, the next server revalidation will fix it, 
                // but typically we'd revert here. For simplicity in this robust UI, we rely on the action.
                console.error("Failed to toggle");
                router.refresh();
            }
        });
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isPending}
            className="flex items-center p-1 hover:bg-muted-foreground/10 rounded disabled:opacity-50 transition-colors"
            type="button"
        >
            <Star
                className={`w-3 h-3 transition-colors ${isFeatured
                        ? "fill-primary text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
            />
        </button>
    );
}
