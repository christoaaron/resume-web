import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Certification, Skill } from "@prisma/client";
import { FileText, Image as ImageIcon, ExternalLink } from "lucide-react";

type SafeSkill = Omit<Skill, "createdAt" | "updatedAt">;
type SafeCertification = Omit<Certification, "createdAt" | "updatedAt">;

function getLinkType(url: string) {
    if (!url) return "link";
    const lower = url.toLowerCase();
    if (lower.endsWith(".pdf")) return "pdf";
    if (["jpg", "jpeg", "png", "gif", "webp"].some(ext => lower.endsWith("." + ext))) return "image";
    return "link";
}

export default function Skills({ skills, certifications }: {
    skills: { hard: SafeSkill[], soft: SafeSkill[] };
    certifications: SafeCertification[]
}) {
    return (
        <section className="py-20 px-6 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Certifications */}
                <div>
                    <SectionHeader title="Certifications" />
                    <div className="space-y-4">
                        {certifications.map((cert, index) => {
                            const linkType = cert.link ? getLinkType(cert.link) : "link";

                            return (
                                <Card key={index} delay={index * 0.1} className="py-4 px-6 flex items-center gap-3 group">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <div className="flex-1">
                                        <span className="font-medium text-foreground block">{cert.name}</span>
                                        <div className="text-xs text-muted-foreground mt-0.5 space-x-2">
                                            {cert.issuedAt && (
                                                <span>Issued: {new Date(cert.issuedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                                            )}
                                            {cert.expiresAt && (
                                                <span>• Expires: {new Date(cert.expiresAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                                            )}
                                        </div>
                                    </div>
                                    {cert.link && (
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-primary/20"
                                        >
                                            {linkType === "pdf" && <FileText className="w-3 h-3" />}
                                            {linkType === "image" && <ImageIcon className="w-3 h-3" />}
                                            {linkType === "link" && <ExternalLink className="w-3 h-3" />}
                                            <span>
                                                {linkType === "pdf" ? "PDF" : linkType === "image" ? "Image" : "View"}
                                            </span>
                                        </a>
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Skills */}
                <div>
                    <SectionHeader title="Skills" />
                    <div className="space-y-6">
                        <Card delay={0.2}>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                🛠️ Hard Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.hard.map((skill) => (
                                    <span key={skill.id} className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </Card>

                        <Card delay={0.3}>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                🧠 Soft Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.soft.map((skill) => (
                                    <span key={skill.id} className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
