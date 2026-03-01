/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { getSkills, getCertifications } from "@/lib/data";
import { Plus, Pencil, Trash2, ArrowLeft, Award, Brain } from "lucide-react";
import { deleteSkill, deleteCertification } from "@/app/actions/skills";
import FeaturedToggle from "./featured-toggle";

export const revalidate = 0;

export default async function AdminSkillsPage() {
    const { hard, soft } = await getSkills();
    const certifications = await getCertifications();

    return (
        <div className="min-h-screen bg-background text-foreground p-8 md:p-12 max-w-7xl mx-auto space-y-12">
            <header className="flex items-center justify-between">
                <div>
                    <Link href="/admin" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Skills & Certifications</h1>
                    <p className="text-muted-foreground mt-1">Manage your technical expertise and credentials.</p>
                </div>
            </header>

            {/* HARD SKILLS */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Brain className="w-5 h-5 text-primary" /> Hard Skills
                    </h2>
                    <Link
                        href="/admin/skills/new-skill?type=HARD"
                        className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </Link>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                    {hard.length === 0 ? <p className="text-muted-foreground text-sm">No hard skills added.</p> : (
                        <div className="flex flex-wrap gap-2">
                            {hard.map((skill: any) => (
                                <div key={skill.id} className="group flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-sm">
                                    <span>{skill.name}</span>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity border-l border-border pl-2 ml-1">
                                        <FeaturedToggle id={skill.id} initialFeatured={skill.featured} />
                                        <Link href={`/admin/skills/skill/${skill.id}`} className="flex items-center"><Pencil className="w-3 h-3 hover:text-primary" /></Link>
                                        <form action={async () => { "use server"; await deleteSkill(skill.id); }} className="flex items-center">
                                            <button className="flex items-center"><Trash2 className="w-3 h-3 hover:text-red-500" /></button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* SOFT SKILLS */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Brain className="w-5 h-5 text-muted-foreground" /> Soft Skills
                    </h2>
                    <Link
                        href="/admin/skills/new-skill?type=SOFT"
                        className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </Link>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                    {soft.length === 0 ? <p className="text-muted-foreground text-sm">No soft skills added.</p> : (
                        <div className="flex flex-wrap gap-2">
                            {soft.map((skill: any) => (
                                <div key={skill.id} className="group flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-sm">
                                    <span>{skill.name}</span>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity border-l border-border pl-2 ml-1">
                                        <Link href={`/admin/skills/skill/${skill.id}`} className="flex items-center"><Pencil className="w-3 h-3 hover:text-primary" /></Link>
                                        <form action={async () => { "use server"; await deleteSkill(skill.id); }} className="flex items-center">
                                            <button className="flex items-center"><Trash2 className="w-3 h-3 hover:text-red-500" /></button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CERTIFICATIONS */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" /> Certifications
                    </h2>
                    <Link
                        href="/admin/skills/new-cert"
                        className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </Link>
                </div>
                <div className="bg-card border border-border rounded-xl divide-y divide-border">
                    {certifications.length === 0 ? (
                        <div className="p-4 text-muted-foreground text-sm">No certifications added.</div>
                    ) : (
                        certifications.map((cert: any) => (
                            <div key={cert.id} className="p-4 flex items-center justify-between group">
                                <span className="font-medium">{cert.name}</span>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={`/admin/skills/cert/${cert.id}`}
                                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    <form action={async () => { "use server"; await deleteCertification(cert.id); }}>
                                        <button className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
