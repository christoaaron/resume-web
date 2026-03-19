"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { stripHtml } from "@/lib/utils";
import { motion } from "framer-motion";

export default function FeaturedInsights({ data }: { data: any[] }) {
    if (!data || data.length === 0) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "circOut" } }
    };

    return (
        <section id="insights" className="py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
            <SectionHeader title="Featured Insights" description="Exploring the intersection of technology, design, and human experience." />
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 mt-16"
            >
                {data.map((post, index) => {
                    // Create a Bento-style grid pattern
                    const isFirst = index === 0;
                    const isSecond = index === 1;
                    const isThird = index === 2;
                    
                    let colSpan = "md:col-span-3 lg:col-span-4";
                    if (isFirst) colSpan = "md:col-span-6 lg:col-span-8";
                    if (data.length === 2 && isSecond) colSpan = "md:col-span-6 lg:col-span-4";
                    if (data.length > 2 && isThird) colSpan = "md:col-span-3 lg:col-span-6";

                    return (
                        <motion.div 
                            key={post.id} 
                            variants={itemVariants}
                            className={`${colSpan} group relative`}
                        >
                            <Link href={`/insights/${post.slug}`} className="block h-full">
                                <article className="relative h-full min-h-[400px] rounded-[2rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md hover:border-primary/50 transition-all duration-500 group-hover:shadow-[0_0_40px_-10px_rgba(var(--primary-rgb),0.3)]">
                                    {/* Cover Image with Overlay */}
                                    <div className="absolute inset-0 z-0">
                                        {post.coverImage ? (
                                            <Image 
                                                src={post.coverImage} 
                                                alt={post.title} 
                                                fill 
                                                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0" 
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-background to-secondary/20 opacity-40" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-20 p-8 h-full flex flex-col justify-end">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white/80">
                                                Insight
                                            </span>
                                            <div className="h-[1px] w-8 bg-white/20" />
                                            <time className="text-[10px] text-white/60 uppercase tracking-widest font-medium" suppressHydrationWarning>
                                                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                            </time>
                                        </div>

                                        <h3 className={`font-bold leading-tight group-hover:text-primary transition-colors duration-300 ${isFirst ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                                            {post.title}
                                        </h3>

                                        <p className="mt-4 text-white/70 line-clamp-2 text-sm leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            {post.excerpt ? stripHtml(post.excerpt) : "Dive deeper into these perspectives and methodologies."}
                                        </p>

                                        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors underline-offset-4 decoration-primary/50 group-hover:underline">
                                            Explore Perspective
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-20 flex justify-center"
            >
                <Link href="/insights" className="group relative px-8 py-4 bg-transparent text-foreground overflow-hidden rounded-full border border-border hover:border-primary/50 transition-colors">
                    <span className="relative z-10 flex items-center gap-3 font-medium">
                        View Archive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
            </motion.div>
        </section>
    );
}
