"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLenis } from "lenis/react";

const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar({ name }: { name: string }) {
    const lenis = useLenis();

    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) + ".";

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            lenis?.scrollTo(href);
        }
    };

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 pointer-events-none"
        >
            <div className="pointer-events-auto">
                <span className="font-bold text-lg tracking-tight">{initials}</span>
            </div>

            <div className="pointer-events-auto flex items-center gap-6 bg-background/80 backdrop-blur-md px-6 py-3 rounded-full border border-border/50 shadow-sm">
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
        </motion.nav>
    );
}
