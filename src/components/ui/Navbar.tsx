"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLenis } from "lenis/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/#projects" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
    { name: "Insights", href: "/insights" },
    { name: "Case Studies", href: "/case-studies" },
];

export default function Navbar({ name }: { name: string }) {
    const lenis = useLenis();
    const [isOpen, setIsOpen] = useState(false);

    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) + ".";

    // Lock scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        if (isOpen) setIsOpen(false);
        if (href.startsWith("/#") && window.location.pathname === "/") {
            e.preventDefault();
            lenis?.scrollTo(href.replace("/", ""));
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 pointer-events-none"
            >
                {/* Logo/Initials */}
                <div className="pointer-events-auto bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-border/80 shadow-sm">
                    <Link href="/" onClick={(e) => handleScroll(e, "/")} className="font-bold text-lg tracking-tight">{initials}</Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex pointer-events-auto items-center gap-6 bg-background/80 backdrop-blur-md px-6 py-3 rounded-full border border-border/80 dark:border-border shadow-md">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="w-px h-4 bg-border mx-1" />
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Trigger & Theme Toggle */}
                <div className="flex md:hidden pointer-events-auto items-center gap-3">
                    <div className="bg-background/80 backdrop-blur-md p-2 rounded-full border border-border/80 shadow-md">
                        <ThemeToggle />
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg border border-primary/20 hover:scale-105 active:scale-95 transition-all"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-[49] bg-background flex flex-col items-center justify-center p-8 md:hidden"
                    >
                        {/* Background subtle pattern */}
                        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xs">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                    className="w-full"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={(e) => handleScroll(e, link.href)}
                                        className="text-3xl font-bold text-center block w-full py-4 text-muted-foreground hover:text-primary transition-colors border-b border-border/10"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 text-muted-foreground/40 text-sm font-medium tracking-[0.25em] uppercase"
                        >
                            {name}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
