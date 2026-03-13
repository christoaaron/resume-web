import Link from "next/link";
import { getInsights } from "@/lib/data";
import { ArrowLeft, Globe, Lock, ExternalLink } from "lucide-react";

export const revalidate = 0;

export default async function AdminInsightsPage() {
    // Pass false to get all insights including drafts in admin view
    const insights = await getInsights(false);

    return (
        <div className="min-h-screen bg-background text-foreground p-8 md:p-12 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <Link href="/admin" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Insights (Blog)</h1>
                    <p className="text-muted-foreground mt-1">Add, edit, or remove your blog articles.</p>
                </div>
                
                <Link 
                    href="/admin/insights/new"
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center"
                >
                    + New Insight
                </Link>
            </header>

            <div className="grid gap-4">
                {insights.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-xl bg-muted/50">
                        <p className="text-muted-foreground">No insights yet. Create your first one!</p>
                    </div>
                ) : (
                    <div className="bg-card border border-border rounded-xl divide-y divide-border">
                        {insights.map((item: any) => (
                            <div key={item.id} className="p-4 flex items-center justify-between py-6">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${item.published ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                        {item.published ? <Globe className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2">
                                            {item.title}
                                            {item.featured && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20 uppercase tracking-widest font-bold">Featured</span>}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">/{item.slug}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link 
                                        href={`/insights/${item.slug}`}
                                        target="_blank"
                                        className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
                                        title="View published"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </Link>
                                    <Link 
                                        href={`/admin/insights/${item.id}`}
                                        className="text-sm font-semibold hover:text-primary px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg transition-all"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
