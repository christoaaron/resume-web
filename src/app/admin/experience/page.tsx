import Link from "next/link";
import { getExperience } from "@/lib/data";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { deleteExperience } from "@/app/actions/experience";

export const revalidate = 0;

export default async function AdminExperiencePage() {
    const experience = await getExperience();

    return (
        <div className="min-h-screen bg-background text-foreground p-8 md:p-12 max-w-7xl mx-auto">
            <header className="flex items-center justify-between mb-12">
                <div>
                    <Link href="/admin" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
                    <p className="text-muted-foreground mt-1">Manage your work history.</p>
                </div>
                <Link
                    href="/admin/experience/new"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Experience
                </Link>
            </header>

            <div className="grid gap-4">
                {experience.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-xl bg-muted/50">
                        <p className="text-muted-foreground">No experience added yet.</p>
                    </div>
                ) : (
                    <div className="bg-card border border-border rounded-xl divide-y divide-border">
                        {experience.map((item) => (
                            <div key={item.id} className="p-4 flex items-center justify-between group">
                                <div>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.subtitle} • {item.date}</p>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={`/admin/experience/${item.id}`}
                                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    <form action={async () => {
                                        "use server";
                                        await deleteExperience(item.id);
                                    }} className="flex items-center">
                                        <button className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors flex items-center">
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
