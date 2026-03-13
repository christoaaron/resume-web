import { getCaseStudies, getProfile } from "@/lib/data";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import { stripHtml } from "@/lib/utils";

export const revalidate = 3600;

export default async function CaseStudiesPage() {
    const caseStudies = await getCaseStudies(true);
    const profile = await getProfile();

    return (
        <main className="min-h-screen bg-background pt-32 pb-16">
            <Navbar name={profile.name} />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <header className="mb-24">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Case Studies.</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        Deep dives into my design processes, technical implementations, and problem-solving journey.
                    </p>
                </header>

                <div className="flex flex-col gap-24 md:gap-32">
                    {caseStudies.length === 0 ? (
                        <div className="py-20 text-center border border-dashed border-border rounded-3xl">
                            <p className="text-muted-foreground">No case studies published yet. Check back soon!</p>
                        </div>
                    ) : (
                        caseStudies.map((study) => (
                            <Link key={study.id} href={`/case-studies/${study.slug}`} className="group block">
                                <article className="flex flex-col gap-8 md:gap-12">
                                    <div className="aspect-video md:aspect-[21/7] lg:aspect-[3/1] w-full rounded-[2.5rem] overflow-hidden bg-muted relative shadow-2xl transition-all duration-700 border border-border/50 group-hover:border-primary/30 group-hover:translate-y-[-4px]">
                                        {study.coverImage ? (
                                            <Image 
                                                src={study.coverImage} 
                                                alt={study.title} 
                                                fill 
                                                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center p-12">
                                                <h3 className="text-5xl font-bold text-center tracking-tight opacity-50">{study.title}</h3>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="max-w-4xl space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="text-[10px] uppercase tracking-[0.3em] font-black text-primary/60">Case Study</div>
                                            <div className="h-px w-12 bg-primary/20" />
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] group-hover:text-primary transition-colors">
                                            {study.title}
                                        </h2>
                                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                                            {stripHtml(study.summary || study.content).substring(0, 220)}...
                                        </p>
                                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary pt-4 group-hover:translate-x-2 transition-transform duration-300">
                                            View Project <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
