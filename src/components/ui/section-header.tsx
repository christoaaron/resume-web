"use client";

import { motion } from "framer-motion";

export function SectionHeader({ title, description }: { title: string; description?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
        >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h2>
            {description && <p className="text-secondary max-w-2xl">{description}</p>}
        </motion.div>
    );
}
