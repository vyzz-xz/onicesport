"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import FadeIn from "./FadeIn";

const STATS = [
    { label: "Medal Win", value: 500, suffix: "+" },
    { label: "Championship", value: 30, suffix: "+" },
    { label: "Total Brands", value: 30, suffix: "+" },
    { label: "Years of the top", value: 6, suffix: "" },
];

export default function StatsSection() {
    return (
        <section className="py-32 bg-black text-[#ffd200] px-6 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                {STATS.map((stat, i) => (
                    <FadeIn key={i} delay={i * 0.1}>
                        <StatItem {...stat} />
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}

function StatItem({ label, value, suffix }: { label: string, value: number, suffix: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 50, damping: 20, duration: 2000 });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    return (
        <div ref={ref} className="flex flex-col items-center gap-2">
            <div className="flex items-baseline font-figtree font-bold text-5xl md:text-8xl text-primary">
                {suffix === "#" && <span className="text-4xl md:text-6xl mr-1">#</span>}
                <NumberDisplay value={springValue} />
                {suffix !== "#" && <span className="text-3xl md:text-5xl ml-1">{suffix}</span>}
            </div>
            <p className="text-white font-figtree text-sm md:text-xl tracking-[-1] uppercase">{label}</p>
        </div>
    )
}

function NumberDisplay({ value }: { value: any }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        return value.on("change", (latest: number) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString();
            }
        });
    }, [value]);

    return <span ref={ref}>0</span>;
}
