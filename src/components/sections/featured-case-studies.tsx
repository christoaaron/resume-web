import { SectionHeader } from "@/components/ui/section-header";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CaseStudy } from "@prisma/client";
import { stripHtml } from "@/lib/utils";

export default function FeaturedCaseStudies({ data }: { data: CaseStudy[] }) {
    if (!data || data.length === 0) return null;

    return (
        <section id="case-studies" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <SectionHeader title="Featured Case Studies" description="Deep Dives" />
            
            <div className="flex flex-col gap-12 mt-16">
                {data.map((study, index) => (
                    <div key={study.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                        <Link href={`/case-studies/${study.slug}`} className="w-full md:w-1/2 group">
                            <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden bg-muted relative group-hover:shadow-2xl transition-all duration-500 border border-border">
                                {study.coverImage ? (
                                    <Image 
                                        src={study.coverImage} 
                                        alt={study.title} 
                                        fill 
                                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center p-8">
                                        <h3 className="text-3xl font-bold text-center tracking-tight opacity-50">{study.title}</h3>
                                    </div>
                                )}
                            </div>
                        </Link>
                        
                        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 md:px-8">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                <Link href={`/case-studies/${study.slug}`} className="hover:text-primary transition-colors">
                                    {study.title}
                                </Link>
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {study.summary 
                                    ? stripHtml(study.summary).substring(0, 160) 
                                    : (study.content && !study.content.startsWith('http') && !study.content.includes('<iframe'))
                                        ? stripHtml(study.content).substring(0, 160)
                                        : "Explore the full details of this project."
                                }...
                            </p>
                            <div className="flex items-center gap-4 pt-4">
                                <Link 
                                    href={`/case-studies/${study.slug}`}
                                    className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                                >
                                    Read Case Study <ArrowRight className="w-4 h-4" />
                                </Link>
                                {study.link && (
                                    <a 
                                        href={study.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors flex items-center justify-center border border-border"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center flex items-center justify-center">
                <Link href="/case-studies" className="inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-full font-medium hover:bg-secondary transition-colors border border-border group">
                    See other highlighted content <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
