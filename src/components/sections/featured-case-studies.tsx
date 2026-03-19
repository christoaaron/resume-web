"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CaseStudy } from "@prisma/client";
import { stripHtml } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FeaturedCaseStudies({ data }: { data: CaseStudy[] }) {
    if (!data || data.length === 0) return null;

    return (
        <section id="case-studies" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative group/section">
            <SectionHeader title="Featured Case Studies" description="Deep dives into complex problems and elegant solutions." />
            
            <div className="flex flex-col gap-32 md:gap-48 mt-24">
                {data.map((study, index) => (
                    <CaseStudyItem key={study.id} study={study} index={index} />
                ))}
            </div>

            <div className="mt-48 text-center relative z-10">
                <Link href="/case-studies" className="inline-flex items-center gap-6 group/all">
                    <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter hover:text-primary transition-colors">
                        Explore All Case Studies
                    </span>
                    <ArrowRight className="w-10 h-10 md:w-16 md:h-16 group-hover/all:translate-x-4 transition-transform duration-500" />
                </Link>
            </div>
        </section>
    );
}

function CaseStudyItem({ study, index }: { study: CaseStudy, index: number }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [1, -1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div 
            ref={containerRef} 
            style={{ opacity }}
            className={`group relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}
        >
            {/* Background Identifier (Experimental look) */}
            <div className="absolute -top-16 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none z-0">
                <h2 className="text-[15vw] font-black whitespace-nowrap leading-none uppercase tracking-tighter">
                    {study.title}
                </h2>
            </div>

            {/* Image Container */}
            <motion.div 
                style={{ y, rotate }}
                className={`lg:col-span-7 relative z-10 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}
            >
                <Link href={`/case-studies/${study.slug}`} className="block relative aspect-[14/9] rounded-[3rem] overflow-hidden bg-muted group-hover:shadow-[0_40px_100px_-20px_rgba(var(--primary-rgb),0.4)] transition-all duration-1000 border border-white/5 group-hover:border-primary/30">
                    {study.coverImage ? (
                        <Image 
                            src={study.coverImage} 
                            alt={study.title} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out grayscale group-hover:grayscale-0" 
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-12">
                            <span className="text-4xl font-black opacity-20 uppercase tracking-widest">{study.title}</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-700" />
                    
                    {/* View Button Overlay (Desktop) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-32 h-32 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground font-black uppercase text-xs tracking-widest rotate-12 group-hover:rotate-0 transition-transform duration-500">
                            Visit Case
                        </div>
                    </div>
                </Link>
            </motion.div>
            
            {/* Content Container */}
            <div className={`lg:col-span-5 relative z-20 flex flex-col space-y-8 ${index % 2 !== 0 ? 'lg:order-1 lg:text-right lg:items-end' : ''}`}>
                <div className="flex items-center gap-4 text-primary font-mono text-xs tracking-[0.3em] uppercase">
                    <span className="w-12 h-[1px] bg-primary/30" />
                    Archive 0{index + 1}
                </div>

                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
                    <Link href={`/case-studies/${study.slug}`} className="hover:text-primary transition-colors duration-500 block">
                        {study.title.split(' ').map((word, i) => (
                            <span key={i} className="block">{word}</span>
                        ))}
                    </Link>
                </h2>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl group-hover:text-foreground transition-colors duration-500 line-clamp-4">
                    {study.summary 
                        ? stripHtml(study.summary)
                        : "Detailed documentation of process, methodology, and outcome for this strategic implementation."}
                </p>

                <div className="flex items-center gap-6 pt-8">
                    <Link 
                        href={`/case-studies/${study.slug}`}
                        className="group/btn relative px-10 py-5 bg-foreground text-background rounded-full font-black uppercase text-xs tracking-widest overflow-hidden transition-all hover:pr-14 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Read Full Details
                        </span>
                        <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 opacity-0 group-hover/btn:opacity-100 group-hover/btn:right-4 transition-all" />
                    </Link>
                    
                    {study.link && (
                        <a 
                            href={study.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all border border-white/5 hover:border-primary/20"
                        >
                            <ExternalLink className="w-6 h-6" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
