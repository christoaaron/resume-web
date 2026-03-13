import { getInsightBySlug, getProfile } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { NotionEmbed } from "@/components/NotionEmbed";
import { cleanText } from "@/lib/utils";

export const revalidate = 3600;

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getInsightBySlug(slug);
    const profile = await getProfile();

    if (!post || !post.published) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background pb-24">
            <Navbar name={profile.name} />

            <article className="pt-36 md:pt-44 overflow-x-hidden">
                {/* ── Header ── */}
                <div className="w-full max-w-5xl mx-auto px-6 md:px-12 mb-10">
                    <Link
                        href="/insights"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-10 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Insights
                    </Link>

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.2] mb-8 text-balance">
                        {cleanText(post.title)}
                    </h1>

                    {/* Meta bar */}
                    <div className="flex flex-wrap items-center gap-6 py-6 border-y border-border/20">
                        <time
                            className="text-xs uppercase tracking-[0.25em] font-black text-primary/60"
                            suppressHydrationWarning
                        >
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </time>

                        {post.excerpt && (
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl italic">
                                {post.excerpt}
                            </p>
                        )}
                    </div>
                </div>

                {/* ── Cover image — full bleed ── */}
                {post.coverImage && (
                    <div className="w-full px-6 md:px-12 lg:px-20 mb-16">
                        <div className="relative aspect-[21/7] md:aspect-[3/1] w-full overflow-hidden shadow-2xl rounded-3xl border border-border/10">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                unoptimized
                                priority
                            />
                        </div>
                    </div>
                )}

                {/* ── Full-width prose content ── */}
                <div className="w-full max-w-5xl mx-auto px-0 md:px-6 lg:px-12">
                    {post.content.startsWith('http') || post.content.includes('<iframe') ? (
                        <NotionEmbed content={post.content} />
                    ) : (
                        <MarkdownRenderer content={post.content} />
                    )}
                </div>
            </article>
        </main>
    );
}
