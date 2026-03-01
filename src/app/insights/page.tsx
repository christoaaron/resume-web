import { getInsights, getProfile } from "@/lib/data";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export const revalidate = 3600;

export default async function InsightsPage() {
    // Only fetch published ones publicly
    const insights = await getInsights(true);
    const profile = await getProfile();

    return (
        <main className="min-h-screen bg-background pt-32 pb-16">
            <Navbar name={profile.name} />
            
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <header className="mb-16">
                    <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Insights <span className="text-muted-foreground">&</span> Thoughts</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        A collection of articles, tutorials, and my personal thoughts on design and development.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {insights.length === 0 ? (
                        <p className="text-muted-foreground col-span-2">No insights published yet. Check back soon!</p>
                    ) : (
                        insights.map((post) => (
                            <Link key={post.id} href={`/insights/${post.slug}`} className="group block">
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
                                            <time>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                                        </div>
                                        <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                                        <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                                            {post.excerpt || post.content.substring(0, 150) + "..."}
                                        </p>
                                        <div className="text-sm font-medium text-primary mt-auto">
                                            Read article &rarr;
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
