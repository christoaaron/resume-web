import { getCaseStudies, getProfile } from "@/lib/data";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";

export const revalidate = 3600;

export default async function CaseStudiesPage() {
    const caseStudies = await getCaseStudies(true);
    const profile = await getProfile();

    return (
        <main className="min-h-screen bg-background pt-32 pb-16">
            <Navbar name={profile.name} />
            
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                <header className="mb-16">
                    <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Case Studies.</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Deep dives into my design processes, technical implementations, and problem-solving journey.
                    </p>
                </header>

                <div className="flex flex-col gap-12">
                    {caseStudies.length === 0 ? (
                        <p className="text-muted-foreground">No case studies published yet. Check back soon!</p>
                    ) : (
                        caseStudies.map((study, index) => (
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
                                        {study.summary || study.content.substring(0, 150) + "..."}
                                    </p>
                                    <div className="flex items-center gap-4 pt-4">
                                        <Link 
                                            href={`/case-studies/${study.slug}`}
                                            className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                                        >
                                            Read Case Study
                                        </Link>
                                        {study.link && (
                                            <a 
                                                href={study.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors flex items-center justify-center"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
