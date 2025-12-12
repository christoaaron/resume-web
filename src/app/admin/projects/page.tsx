import Link from "next/link";
import { getProjects } from "@/lib/data";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { deleteProject } from "@/app/actions/projects"; // We'll need a client component for delete button or a form

export const revalidate = 0; // Ensure fresh data on admin panel

export default async function AdminProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="min-h-screen bg-background text-foreground p-8 md:p-12 max-w-7xl mx-auto">
            <header className="flex items-center justify-between mb-12">
                <div>
                    <Link href="/admin" className="flex items-center text-sm text-secondary hover:text-primary mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-secondary mt-1">Manage your portfolio projects.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add New Project
                </Link>
            </header>

            <div className="grid gap-4">
                {projects.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-xl bg-muted/50">
                        <p className="text-secondary">No projects found. Create your first one!</p>
                    </div>
                ) : (
                    <div className="bg-card border border-border rounded-xl divide-y divide-border">
                        {projects.map((project) => (
                            <div key={project.id} className="p-4 flex items-center justify-between group">
                                <div>
                                    <h3 className="font-semibold text-lg">{project.title}</h3>
                                    <p className="text-sm text-secondary">{project.subtitle}</p>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={`/admin/projects/${project.id}`}
                                        className="p-2 text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    <form action={async () => {
                                        "use server";
                                        await deleteProject(project.id);
                                    }}>
                                        <button className="p-2 text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
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
