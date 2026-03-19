"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero({ 
    name, 
    headline,
    featuredCaseStudy 
}: { 
    name: string; 
    headline: string;
    featuredCaseStudy?: { title: string; slug: string };
}) {
    const firstName = name.split(" ")[0] || "Christopher";
    const lastName = name.split(" ").slice(1).join(" ") || "Aaron.";

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground mb-6">
                    {firstName}
                    <br />
                    {lastName}
                </h1>

                <p className="text-xl text-muted-foreground max-w-lg mx-auto font-light mb-10">
                    {headline}
                </p>

                {featuredCaseStudy && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <Link 
                            href={`/case-studies/${featuredCaseStudy.slug}`}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all group"
                        >
                            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                <Sparkles className="w-3 h-3" /> Featured Case Study
                            </span>
                            <div className="w-px h-3 bg-primary/20" />
                            <span className="text-xs font-bold text-foreground/80 group-hover:text-foreground transition-colors">
                                {featuredCaseStudy.title}
                            </span>
                            <ArrowRight className="w-3 h-3 text-primary group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}
