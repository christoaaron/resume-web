import { getCaseStudyBySlug, getProfile } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export const revalidate = 3600;

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = await getCaseStudyBySlug(slug);
    const profile = await getProfile();

    if (!study || !study.published) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background pt-32 pb-24">
            <Navbar name={profile.name} />
            
            <article className="max-w-4xl mx-auto px-6 md:px-12">
                <Link href="/case-studies" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-12 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Case Studies
                </Link>

                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight max-w-3xl mx-auto">
                        {study.title}
                    </h1>
                    {study.summary && (
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
                            {study.summary}
                        </p>
                    )}
                    
                    {study.link && (
                        <a 
                            href={study.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-transform active:scale-95 mx-auto"
                        >
                            View Live Project <ExternalLink className="w-5 h-5" />
                        </a>
                    )}
                </header>

                {study.coverImage && (
                    <div className="w-full aspect-[21/9] rounded-[2rem] overflow-hidden mb-20 relative bg-muted shadow-2xl border border-border">
                        <Image 
                            src={study.coverImage} 
                            alt={study.title} 
                            fill 
                            className="object-cover" 
                            unoptimized
                            priority
                        />
                    </div>
                )}

                <div className="max-w-3xl mx-auto">
                    <MarkdownRenderer content={study.content} />
                </div>
            </article>
        </main>
    );
}
