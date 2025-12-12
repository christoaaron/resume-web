"use client";

import { motion } from "framer-motion";

export default function Hero({ name, headline }: { name: string; headline: string }) {
    const firstName = name.split(" ")[0] || "Christopher";
    const lastName = name.split(" ").slice(1).join(" ") || "Aaron.";

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground mb-6">
                {firstName}
                <br />
                {lastName}
            </h1>

            <p className="text-xl text-secondary max-w-lg mx-auto font-light">
                {headline}
            </p>
        </section>
    );
}
