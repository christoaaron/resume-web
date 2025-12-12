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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.2 } }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            className={cn(
                "rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg dark:bg-muted/10",
                className
            )}
        >
            {children}
        </motion.div>
    );
}
