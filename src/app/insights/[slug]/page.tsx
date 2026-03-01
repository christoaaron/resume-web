import { getInsightBySlug, getProfile } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export const revalidate = 3600;

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getInsightBySlug(slug);
    const profile = await getProfile();

    if (!post || !post.published) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background pt-32 pb-24">
            <Navbar name={profile.name} />
            
            <article className="max-w-3xl mx-auto px-6 md:px-12">
                <Link href="/insights" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
                </Link>

                <header className="mb-12">
                    <div className="text-sm text-muted-foreground mb-4 flex items-center gap-4">
                        <time>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {post.excerpt}
                        </p>
                    )}
                </header>

                {post.coverImage && (
                    <div className="w-full aspect-video rounded-3xl overflow-hidden mb-16 relative bg-muted shadow-2xl">
                        <Image 
                            src={post.coverImage} 
                            alt={post.title} 
                            fill 
                            className="object-cover" 
                            unoptimized
                            priority
                        />
                    </div>
                )}

                <div className="mt-8">
                    <MarkdownRenderer content={post.content} />
                </div>
            </article>
        </main>
    );
}
