"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { TimelineItem } from "@/components/ui/timeline-item";
import { AdvancedTimeline } from "@/components/ui/advanced-timeline";
import { Education as EducationType } from "@prisma/client";

type SafeEducation = Omit<EducationType, "createdAt" | "updatedAt">;

export default function Education({ data }: { data: SafeEducation[] }) {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <SectionHeader title="Education" description="Academic background and achievements." />

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
