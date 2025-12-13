"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TimelineItemProps {
    title: string;
    subtitle: string;
    location?: string | null;
    date: string;
    description?: string[];
}

export function AdvancedTimeline({ items }: { items: TimelineItemProps[] }) {
    return (
        <div className="relative pl-6 md:pl-0">
            <div className="flex flex-col">
                {items.map((item, index) => (
                    <div key={index} className={cn(
                        "relative flex flex-col md:flex-row gap-8 md:gap-0 pb-12 last:pb-0",
                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                    )}>
                        {/* Upper Line (Connects from previous) */}
                        {index !== 0 && (
                            <div
                                className="absolute left-6 md:left-1/2 top-0 h-[1.375rem] w-px bg-border -translate-x-1/2 md:block block"
                            />
                        )}

                        {/* Lower Line (Connects to next) */}
                        {index !== items.length - 1 && (
                            <div
                                className="absolute left-6 md:left-1/2 top-[1.375rem] bottom-0 w-px bg-border -translate-x-1/2 md:block block"
                            />
                        )}

                        {/* Timeline Dot */}
                        <div
                            className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 mt-1.5 z-10 shadow-[0_0_0_4px_rgba(var(--background),1)]"
                        />

                        {/* Content Side */}
                        <div className="md:w-1/2 md:px-12 pl-12">
                            <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
                                {/* Connecting Line to Dot (Horizontal) */}
                                <div
                                    className={cn(
                                        "hidden md:block absolute top-3.5 h-px bg-border w-12",
                                        index % 2 === 0 ? "-left-12" : "-right-12"
                                    )}
                                />

                                <span className="inline-block px-3 py-1 mb-3 text-xs font-mono font-medium text-primary bg-primary/10 rounded-full">
                                    {item.date}
                                </span>

                                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                <p className="text-muted-foreground font-medium mb-4 flex items-center gap-2">
                                    {item.subtitle}
                                </p>

                                {item.description && item.description.length > 0 && (
                                    <ul className="space-y-2 list-disc list-outside ml-4 text-muted-foreground text-sm leading-relaxed">
                                        {item.description.map((desc, i) => (
                                            <li key={i}>{desc}</li>
                                        ))}
                                    </ul>
                                )}

                                {item.location && (
                                    <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground flex items-center gap-1">
                                        📍 {item.location}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Empty Side for layout balance */}
                        <div className="md:w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    );
}
