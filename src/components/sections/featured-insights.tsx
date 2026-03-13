import { SectionHeader } from "@/components/ui/section-header";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { stripHtml } from "@/lib/utils";

export default function FeaturedInsights({ data }: { data: any[] }) {
    if (!data || data.length === 0) return null;

    return (
        <section id="insights" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <SectionHeader title="Featured Insights" description="Highlights & Thoughts" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                {data.map((post) => (
                    <Link key={post.id} href={`/insights/${post.slug}`} className="group block h-full">
                        <article className="bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                            {post.coverImage ? (
                                <div className="aspect-[16/9] w-full relative overflow-hidden bg-muted">
                                    <Image 
                                        src={post.coverImage} 
                                        alt={post.title} 
                                        fill 
                                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                        unoptimized
                                    />
                                </div>
                            ) : (
                                <div className="aspect-[16/9] w-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center p-6 border-b border-border">
                                    <h3 className="text-2xl font-bold text-center tracking-tight opacity-50">{post.title}</h3>
                                </div>
                            )}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
                                    <time suppressHydrationWarning>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                                </div>
                                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                                <p className="text-muted-foreground line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                                    {post.excerpt ? stripHtml(post.excerpt).substring(0, 160) : "Learn more about this insight."}
                                </p>
                                <div className="text-sm font-medium text-primary mt-auto flex items-center gap-1">
                                    Read more <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            <div className="mt-12 text-center flex items-center justify-center">
                <Link href="/insights" className="inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-full font-medium hover:bg-secondary transition-colors border border-border group">
                    See other highlighted content <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
