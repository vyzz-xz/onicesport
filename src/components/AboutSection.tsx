"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const PHRASE_1 = "WE ARE THE KINGS OF THE LAND OF DAWN";
const PHRASE_2 = "DOMINATING EVERY BATTLEFIELD";

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const width = useTransform(scrollYProgress, [0.2, 0.5], ["80%", "100%"]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen font-figtree bg-black text-white py-20 overflow-hidden flex flex-col items-center justify-center"
        >
            <motion.div
                style={{ width }}
                className="max-w-[90vw] md:max-w-7xl mx-auto flex flex-col items-center gap-20"
            >
                <div className="text-center">
                    <h2 className="sr-only">About Onic</h2>
                    <AnimatedText text={PHRASE_1} progress={scrollYProgress} start={0.1} end={0.4} />

                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]) }}
                        className="my-10 w-full h-[300px] md:h-[500px] relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/50"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
                            alt="Onic Esports Arena"
                            fill
                            className="object-cover opacity-60 hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                            <h3 className="text-4xl md:text-6xl font-figtree font-bold text-white uppercase tracking-tighter text-center">
                                Onic <span className="text-[#FFD200]">Esports</span>
                            </h3>
                                <div className="px-6 py-2 border border-primary/30 rounded-full text-primary text-xs font-figtree uppercase tracking-widest backdrop-blur-sm bg-black/50">
                                Legacy In The Making
                            </div>
                        </div>
                    </motion.div>

                    <AnimatedText text={PHRASE_2} progress={scrollYProgress} start={0.5} end={0.8} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full text-lg text-white font-figtree leading-relaxed" suppressHydrationWarning>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        ESTABLISHED IN 2018, ONIC ESPORTS HAS RAPIDLY ASCENDED TO BECOME ONE OF SOUTHEAST ASIA'S PREMIER ESPORTS ORGANIZATIONS. DRIVEN BY PASSION AND A RELENTLESS PURSUIT OF VICTORY.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        WE CULTIVATE CHAMPIONS ACROSS MULTIPLE TITLES, CREATING A LEGACY THAT RESERVES ITS PLACE IN HISTORY. #GOONIC
                    </motion.p>
                </div>

            </motion.div>
        </section>
    );
}

function AnimatedText({ text, progress, start, end }: { text: string, progress: any, start: number, end: number }) {
    const words = text.split(" ");

    // Calculate trigger points for each character would be complex, doing per word/char simple opacity
    return (
        <p className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-4xl mx-auto">
            {words.map((word, i) => {
                const step = (end - start) / words.length;
                const wordStart = start + (step * i);
                const wordEnd = wordStart + step;

                return (
                    <Word key={i} word={word} progress={progress} range={[wordStart, wordEnd]} />
                )
            })}
        </p>
    )
}

function Word({ word, progress, range }: { word: string, progress: any, range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <motion.span style={{ opacity }} className="relative text-4xl md:text-7xl font-figtree font-black text-white uppercase leading-none mr-4 last:mr-0">
            {word}
        </motion.span>
    )
}
