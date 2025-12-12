"use client";

import { motion } from "framer-motion";

export default function Hero({ name, headline }: { name: string; headline: string }) {
    const firstName = name.split(" ")[0] || "Christopher";
    const lastName = name.split(" ").slice(1).join(" ") || "Aaron.";

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground mb-6 overflow-hidden">
                <motion.span
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.1 }}
                    aria-hidden
                >
                    {Array.from(firstName).map((char, index) => (
                        <motion.span
                            key={index}
                            variants={{
                                hidden: { y: 100 },
                                visible: { y: 0, transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 1 } }
                            }}
                            className="inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.span>
                <br />
                <motion.span
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
                    aria-hidden
                >
                    {Array.from(lastName).map((char, index) => (
                        <motion.span
                            key={index}
                            variants={{
                                hidden: { y: 100 },
                                visible: { y: 0, transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 1 } }
                            }}
                            className="inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.span>
            </h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
                className="text-xl text-secondary max-w-lg mx-auto font-light"
            >
                {headline}
            </motion.p>
        </section>
    );
}
