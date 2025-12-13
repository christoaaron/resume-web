"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        title: "E-Commerce",
        category: "Web App",
        description: "Next.js, TypeScript, Tailwind",
        href: "#",
    },
    {
        title: "Dashboard",
        category: "Analytics",
        description: "Real-time Data Vis",
        href: "#",
    },
    {
        title: "Messaging",
        category: "Mobile",
        description: "End-to-End Encrypted",
        href: "#",
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <h2 className="text-2xl font-bold tracking-tight mb-8 col-span-full">Selected Work</h2>

                {projects.map((project, index) => (
                    <Link
                        key={index}
                        href={project.href}
                        className="group block p-8 border border-border hover:border-foreground/20 rounded-lg transition-colors bg-muted/30 hover:bg-muted/50"
                    >
                        <div className="flex justify-between items-start mb-12">
                            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{project.category}</span>
                            <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                        </div>

                        <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform">{project.title}</h3>
                        <p className="text-muted-foreground text-sm">{project.description}</p>
                    </Link>
                ))}
            </motion.div>
        </section>
    );
}
