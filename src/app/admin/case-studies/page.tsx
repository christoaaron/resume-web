/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { getCaseStudies } from "@/lib/data";
import { Plus, Pencil, Trash2, ArrowLeft, Globe, Lock } from "lucide-react";
import { deleteCaseStudy } from "@/app/actions/case-studies";

export const revalidate = 0;

export default async function AdminCaseStudiesPage() {
    // Pass false to get all case studies including drafts in admin view
    const caseStudies = await getCaseStudies(false);

    return (
        <div className="min-h-screen bg-background text-foreground p-8 md:p-12 max-w-7xl mx-auto">
            <header className="flex items-center justify-between mb-12">
                <div>
                    <Link href="/admin" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Case Studies</h1>
                    <p className="text-muted-foreground mt-1">Manage your detailed case studies and portfolio deep-dives.</p>
                </div>
                <Link
                    href="/admin/case-studies/new"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" /> New Case Study
                </Link>
            </header>

            <div className="grid gap-4">
                {caseStudies.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-xl bg-muted/50">
                        <p className="text-muted-foreground">No case studies found. Document your first big project!</p>
                    </div>
                ) : (
                    <div className="bg-card border border-border rounded-xl divide-y divide-border">
                        {caseStudies.map((item: any) => (
                            <div key={item.id} className="p-4 flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${item.published ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                        {item.published ? <Globe className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2">
                                            {item.title}
                                            {!item.published && <span className="text-xs bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded-full border border-orange-500/20">Draft</span>}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">/{item.slug}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={`/admin/case-studies/${item.id}`}
                                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    <form action={async () => {
                                        "use server";
                                        await deleteCaseStudy(item.id);
                                    }}>
                                        <button className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
