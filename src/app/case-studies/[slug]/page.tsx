import { getCaseStudyBySlug, getProfile } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import { QuillRenderer } from "@/components/QuillRenderer";
import { NotionEmbed } from "@/components/NotionEmbed";
import { cleanText, stripHtml } from "@/lib/utils";

export const revalidate = 3600;

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = await getCaseStudyBySlug(slug);
    const profile = await getProfile();

    if (!study || !study.published) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background pb-24">
            <Navbar name={profile.name} />

            <article className="pt-36 md:pt-44 overflow-x-hidden">
                {/* ── Header ── */}
                <div className="w-full max-w-5xl mx-auto px-6 md:px-12 mb-10">
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-10 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Case Studies
                    </Link>

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.2] mb-8 text-balance">
                        {cleanText(study.title)}
                    </h1>

                    {/* Meta bar */}
                    <div className="flex flex-wrap items-center gap-6 py-6 border-y border-border/20">
                        <time
                            className="text-xs uppercase tracking-[0.25em] font-black text-primary/60"
                            suppressHydrationWarning
                        >
                            {new Date(study.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </time>

                        {study.summary && (
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl italic">
                                {study.summary}
                            </p>
                        )}

                        {study.link && (
                            <a
                                href={study.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-auto inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 uppercase tracking-tight shrink-0"
                            >
                                Live Project <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>

                {/* ── Cover image — full bleed ── */}
                {study.coverImage && (
                    <div className="w-full px-6 md:px-12 lg:px-20 mb-16">
                        <div className="relative aspect-[21/7] md:aspect-[3/1] w-full overflow-hidden shadow-2xl rounded-3xl border border-border/10">
                            <Image
                                src={study.coverImage}
                                alt={study.title}
                                fill
                                className="object-cover"
                                unoptimized
                                priority
                            />
                        </div>
                    </div>
                )}

                {/* ── Full-width content ── */}
                <div className="w-full max-w-5xl mx-auto px-0 md:px-6 lg:px-12">
                    {study.notionEmbed ? (
                        <div className="space-y-12">
                            <NotionEmbed content={study.notionEmbed} />
                            {study.content && stripHtml(study.content).length > 0 && (
                                <div className="px-6 md:px-0">
                                    <h3 className="text-xl font-bold mb-6 opacity-50 uppercase tracking-widest text-center">Project Details</h3>
                                    <QuillRenderer content={study.content} />
                                </div>
                            )}
                        </div>
                    ) : study.content.startsWith('http') || study.content.includes('<iframe') ? (
                        <NotionEmbed content={study.content} />
                    ) : (
                        <QuillRenderer content={study.content} />
                    )}
                </div>
            </article>
        </main>
    );
}
