"use client";

import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Project } from "@prisma/client";
import { AdvancedTimeline } from "@/components/ui/advanced-timeline";

type SafeProject = Omit<Project, "createdAt" | "updatedAt">;

export default function Projects({ data }: { data: SafeProject[] }) {
    return (
        <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
            <SectionHeader title="Projects" description="Initiatives and event management." />

            {data.length === 1 ? (
                <div className="max-w-md mx-auto">
                    <Card delay={0} className="flex flex-col h-full hover:border-r-4 hover:border-b-4 hover:border-primary transition-all duration-300">
                        <div className="mb-4">
                            <span className="text-xs font-mono text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-sm">
                                {data[0].date.split("-")[0].trim()}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold mb-2">{data[0].title}</h3>
                        <p className="text-sm text-secondary font-medium mb-4">{data[0].subtitle}</p>

                        <div className="flex-grow">
                            {data[0].description && (
                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                                    {data[0].description[0]}
                                </p>
                            )}
                        </div>

                        {data[0].location && (
                            <div className="mt-4 pt-4 border-t border-border text-xs text-secondary flex items-center gap-1">
                                📍 {data[0].location}
                            </div>
                        )}
                    </Card>
                </div>
            ) : (
                <div className="w-full">
                    <AdvancedTimeline items={data} />
                </div>
            )}
        </section>
    );
}
