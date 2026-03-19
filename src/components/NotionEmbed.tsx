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

    let baseUrl = "";
    if (isIframe) {
        baseUrl = content.match(/src="([^"]+)"/)?.[1] || "";
    } else {
        baseUrl = content.trim();
    }

    if (!baseUrl) return null;

    // Use dark theme by default to match the site
    let urlString = baseUrl;
    try {
        const url = new URL(baseUrl);
        url.searchParams.set('theme', 'dark');
        urlString = url.toString();
    } catch (e) {
        console.error("Invalid Notion URL:", baseUrl);
    }

    return (
        <div className="w-full">
            <div className="w-full min-h-[800px] bg-card/10 rounded-3xl overflow-hidden border border-border/20 shadow-inner">
                <iframe 
                    src={urlString} 
                    className="w-full min-h-[800px] border-0"
                    allow="clipboard-write"
                    loading="lazy"
                />
            </div>
            <div className="p-4 text-center border-t border-border/10 bg-muted/5 flex justify-center items-center gap-4">
                <a 
                    href={baseUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                    <Monitor className="w-3 h-3" /> Open directly in Notion
                </a>
                <button 
                    onClick={() => {
                        const iframe = document.querySelector('iframe[src*="notion"]');
                        if (iframe) {
                            try {
                                iframe.requestFullscreen();
                            } catch (e) {
                                window.open(baseUrl, '_blank');
                            }
                        }
                    }}
                    className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                    <Maximize2 className="w-3 h-3" /> Fullscreen
                </button>
            </div>
        </div>
    );
}
