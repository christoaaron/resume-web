"use client";

import { useState } from "react";
import { Moon, Sun, Monitor, Maximize2 } from "lucide-react";

interface NotionEmbedProps {
    content: string;
}

export function NotionEmbed({ content }: NotionEmbedProps) {
    const isUrl = content.startsWith('http');
    const isIframe = content.includes('<iframe');

    if (!isUrl && !isIframe) return null;

    const baseUrl = isIframe 
        ? content.match(/src="([^"]+)"/)?.[1] || "" 
        : content;

    // Use dark theme by default to match the site
    const url = new URL(baseUrl);
    url.searchParams.set('theme', 'dark');

    return (
        <div className="w-full">
            <div className="w-full min-h-[800px] bg-card/10 rounded-3xl overflow-hidden border border-border/20 shadow-inner">
                <iframe 
                    src={url.toString()} 
                    className="w-full min-h-[800px] border-0"
                    allow="clipboard-write"
                    loading="lazy"
                />
            </div>
        </div>
    );
}
