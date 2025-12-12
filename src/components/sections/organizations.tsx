"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { TimelineItem } from "@/components/ui/timeline-item";
import { AdvancedTimeline } from "@/components/ui/advanced-timeline";
import { Organization } from "@prisma/client";

type SafeOrganization = Omit<Organization, "createdAt" | "updatedAt">;

export default function Organizations({ data }: { data: SafeOrganization[] }) {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <SectionHeader title="Organizations" description="Leadership and volunteer service." />

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
