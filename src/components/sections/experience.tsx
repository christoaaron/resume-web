"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { TimelineItem } from "@/components/ui/timeline-item";
import { AdvancedTimeline } from "@/components/ui/advanced-timeline";
import { Experience as ExperienceType } from "@prisma/client";

type SafeExperience = Omit<ExperienceType, "createdAt" | "updatedAt">;

export default function Experience({ data }: { data: SafeExperience[] }) {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <SectionHeader title="Experience" description="Professional journey and internships." />

            {data.length === 1 ? (
                <div className="max-w-3xl mx-auto">
                    <TimelineItem item={data[0]} index={0} />
                </div>
            ) : (
                <AdvancedTimeline items={data} />
            )}
        </section>
    );
}
