"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import FadeIn from "./FadeIn";

const PHRASE_1 = "WE ARE THE KINGS OF THE LAND OF DAWN";
const PHRASE_2 = "DOMINATE THE BATTLE";

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
            className="relative min-h-screen font-figtree bg-black text-white py-32 overflow-hidden flex flex-col items-center justify-center"
        >
            <motion.div
                style={{ width }}
                className="max-w-[90vw] md:max-w-7xl mx-auto flex flex-col items-center gap-20"
            >
                <div className="text-center">
                    <h2 className="sr-only">About Onic</h2>
                    <AnimatedText text={PHRASE_1} progress={scrollYProgress} start={0.1} end={0.4} className="text-[#ffd200] font-figtree font-bold md:tracking-[-3] text-2xl" />

                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]) }}
                        className="my-10 w-full h-[250px] md:h-[500px] relative rounded-3xl overflow-hidden border border-white/20 bg-neutral-900/50"
                    >
                        <Image
                            src="/artifacts/profile.png"
                            alt="Onic Esports Arena"
                            fill
                            className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                            <h3 className="text-5xl md:text-8xl font-figtree font-bold text-white uppercase tracking-tighter text-center">
                                Onic <span className="text-[#FFD200]">ID</span>
                            </h3>
                        </div>
                    </motion.div>

                    <AnimatedText text={PHRASE_2} progress={scrollYProgress} start={0.5} end={0.8} className="text-[#ffd200] font-figtree font-bold text-2xl md:mt-20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full text-1xl md:text-xl text-justify text-white font-figtree leading-relaxed" suppressHydrationWarning>
                    <FadeIn delay={0.2}>
                        <p>
                            A Leading indonesian Esports organization with <span className="text-[#ffd200] font-bold">MULTIPLE CHAMPION TITLES</span> to establish footprint and to be the highest benchmark E-sports & Sports Organization in the Region, Supported by the relentless energy of our loyal fanbase.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <p>
                            <span className="text-[#ffd200] font-bold">ONIC</span> was Founded in 2018, started its footstep as a professional e-sports Organization, we aim to be the best e-sports organization to represent South East Asia by managing talents and make them the best version of theirself. <span className="text-[#ffd200] font-bold">#GOONIC #SONIC</span>
                        </p>
                    </FadeIn>
                </div>

            </motion.div>
        </section>
    );
}

function AnimatedText({ text, progress, start, end, className }: { text: string, progress: any, start: number, end: number, className?: string }) {
    const words = text.split(" ");

    // Calculate trigger points for each character would be complex, doing per word/char simple opacity
    return (
        <p className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-4xl mx-auto">
            {words.map((word, i) => {
                const step = (end - start) / words.length;
                const wordStart = start + (step * i);
                const wordEnd = wordStart + step;

                return (
                    <Word key={i} word={word} progress={progress} range={[wordStart, wordEnd]} className={className} />
                )
            })}
        </p>
    )
}

function Word({ word, progress, range, className }: { word: string, progress: any, range: [number, number], className?: string }) {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <motion.span style={{ opacity }} className={`relative text-4xl md:text-7xl font-figtree font-black uppercase leading-none mr-4 last:mr-0 ${className ? className : 'text-white'}`}>
            {word}
        </motion.span>
    )
}
