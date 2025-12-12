"use client";

import { motion } from "framer-motion";

// No direct import of Profile; using any type for profile prop

export default function Contact({ profile }: { profile: any }) {
    return (
        <section id="contact" className="py-24 px-6 md:px-12 max-w-4xl mx-auto mb-20">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border-t border-border pt-24"
            >
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Let&apos;s work together.</h2>
                        <p className="text-secondary mb-8">Available for freelance and full-time opportunities.</p>
                        <a href={`mailto:${profile.email}`} className="inline-block border-b border-foreground pb-1 hover:text-secondary hover:border-secondary transition-colors">
                            {profile.email}
                        </a>
                    </div>

                    <div className="space-y-4">
                        {/* Simple form or links could go here, keeping it text-based for minimalism */}
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-mono text-secondary uppercase">Socials</span>
                            {profile.github && <a href={profile.github} target="_blank" className="hover:text-secondary transition-colors">GitHub</a>}
                            {profile.twitter && <a href={profile.twitter} target="_blank" className="hover:text-secondary transition-colors">Twitter</a>}
                            {profile.linkedin && <a href={profile.linkedin} target="_blank" className="hover:text-secondary transition-colors">LinkedIn</a>}
                            {profile.instagram && <a href={profile.instagram} target="_blank" className="hover:text-secondary transition-colors">Instagram</a>}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
