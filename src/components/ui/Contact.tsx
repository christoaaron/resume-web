"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

// No direct import of Profile; using any type for profile prop

type ProfileData = {
    contactTitle?: string | null;
    contactDescription?: string | null;
    email: string;
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    instagram?: string | null;
};

export default function Contact({ profile }: { profile: ProfileData }) {
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
                        <h2 className="text-3xl font-bold tracking-tight mb-4">{profile.contactTitle || "Let's work together."}</h2>
                        <p className="text-muted-foreground mb-8">{profile.contactDescription || "Available for freelance and full-time opportunities."}</p>
                        <a href={`mailto:${profile.email}`} className="inline-block border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors">
                            {profile.email}
                        </a>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-4">
                            <span className="text-sm font-mono text-muted-foreground uppercase">Socials</span>
                            <div className="flex items-center gap-6">
                                {profile.github && (
                                    <a
                                        href={profile.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110 duration-200"
                                        aria-label="GitHub"
                                    >
                                        <Github className="w-6 h-6" />
                                    </a>
                                )}
                                {profile.linkedin && (
                                    <a
                                        href={profile.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110 duration-200"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin className="w-6 h-6" />
                                    </a>
                                )}
                                {profile.twitter && (
                                    <a
                                        href={profile.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110 duration-200"
                                        aria-label="Twitter"
                                    >
                                        <Twitter className="w-6 h-6" />
                                    </a>
                                )}
                                {profile.instagram && (
                                    <a
                                        href={profile.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110 duration-200"
                                        aria-label="Instagram"
                                    >
                                        <Instagram className="w-6 h-6" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
