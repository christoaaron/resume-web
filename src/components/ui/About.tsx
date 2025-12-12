"use client";

import { motion } from "framer-motion";

export default function About({ bio }: { bio: string }) {
    return (
        <section id="about" className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <span className="text-secondary text-sm font-mono uppercase tracking-widest">About</span>

                <div className="text-2xl md:text-3xl leading-relaxed font-light text-foreground whitespace-pre-wrap">
                    {bio}
                </div>

                <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-secondary">
                    <div>Next.js ecosystem</div>
                    <div>TypeScript</div>
                    <div>System Design</div>
                    <div>Performance</div>
                </div>
            </motion.div>
        </section>
    );
}
