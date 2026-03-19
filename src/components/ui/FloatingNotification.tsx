"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Zap, Sparkles } from "lucide-react";
import Link from "next/link";

interface NotificationItem {
    id: string;
    title: string;
    slug: string;
    type: 'insight' | 'case-study';
}

export default function FloatingNotification({ items }: { items: NotificationItem[] }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Delay showing to not overwhelm immediately
        const timer = setTimeout(() => {
            const dismissed = sessionStorage.getItem("notification-dismissed");
            if (!dismissed) setIsVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const dismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
        sessionStorage.setItem("notification-dismissed", "true");
    };

    if (isDismissed || items.length === 0) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: 100, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="w-72 md:w-80 bg-black/80 dark:bg-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/10 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        {/* Header with Sparkle & Close */}
                        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/50 dark:text-white/40 flex items-center gap-2">
                                <Sparkles className="w-3 h-3 text-primary" /> New Content
                            </span>
                            <button 
                                onClick={dismiss}
                                className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/20 transition-all"
                                aria-label="Dismiss"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        
                        {/* Content */}
                        <div className="p-3">
                            {items.slice(0, 1).map((item) => (
                                <Link 
                                    key={item.id}
                                    href={`/${item.type === 'insight' ? 'insights' : 'case-studies'}/${item.slug}`}
                                    onClick={dismiss}
                                    className="block p-4 rounded-2xl hover:bg-white/5 transition-all group"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        <span className="text-[9px] uppercase font-bold tracking-widest text-white/40">
                                            Latest {item.type.replace('-', ' ')}
                                        </span>
                                    </div>
                                    <h4 className="text-sm md:text-base font-bold text-white leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                        {item.title}
                                    </h4>
                                    <div className="mt-3 text-[11px] font-black uppercase tracking-widest text-primary flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                                        View Case <ArrowRight className="w-3 h-3" />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Footer (Experimental Look) */}
                        <div className="px-5 py-4 bg-primary/5 flex items-center justify-between group/footer cursor-pointer">
                           <Link href="/insights" className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover/footer:text-white transition-colors">
                                Explore Archive
                           </Link>
                           <Zap className="w-3 h-3 text-primary/30 group-hover/footer:text-primary transition-all group-hover/footer:scale-125" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
