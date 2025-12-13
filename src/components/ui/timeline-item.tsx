import { Card } from "@/components/ui/card";
// Define a shape that works for both Prisma models and static resume data
interface TimelineItemProps {
    title: string;
    subtitle: string;
    location?: string | null;
    date: string;
    description?: string[];
}

export function TimelineItem({ item, index }: { item: TimelineItemProps; index: number }) {
    return (
        <Card delay={index * 0.1} className="relative pl-8 md:pl-8 overflow-hidden hover:border-primary/50 transition-colors">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/10" />
            <div className="absolute left-0 top-6 w-1 h-8 bg-primary rounded-r-full" />

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                <div>
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-primary font-medium">{item.subtitle}</p>
                </div>
                <div className="text-sm text-muted-foreground font-mono whitespace-nowrap text-right">
                    <div>{item.date}</div>
                </div>
            </div>

            {item.description && item.description.length > 0 && (
                <ul className="mt-4 space-y-2 list-disc list-inside text-muted-foreground text-sm leading-relaxed">
                    {item.description.map((desc, i) => (
                        <li key={i} className="pl-2 -indent-2 ml-2">{desc}</li>
                    ))}
                </ul>
            )}

            {item.location && (
                <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground flex items-center gap-1">
                    📍 {item.location}
                </div>
            )}
        </Card>
    );
}
