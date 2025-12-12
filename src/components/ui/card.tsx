"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
    className?: string;
    children: React.ReactNode;
    delay?: number;
}

export function Card({ className, children, delay = 0 }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md dark:bg-muted/10",
                className
            )}
        >
            {children}
        </div>
    );
}
