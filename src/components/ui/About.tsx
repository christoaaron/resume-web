"use client";

import { motion } from "framer-motion";

export default function About({ bio, skills }: { bio: string, skills: any[] }) {
    return (
        <section id="about" className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <span className="text-muted-foreground text-sm font-mono uppercase tracking-widest">About</span>

                <div className="text-2xl md:text-3xl leading-relaxed font-light text-foreground whitespace-pre-wrap">
                    {bio}
                </div>

                {skills && skills.length > 0 && (
                    <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                        {skills.slice(0, 4).map((skill) => (
                            <div key={skill.id}>{skill.name}</div>
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    );
}
