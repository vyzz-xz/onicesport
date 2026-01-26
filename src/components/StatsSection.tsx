"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const STATS = [
    { label: "Tournaments Won", value: 45, suffix: "+" },
    { label: "Matches Played", value: 1250, suffix: "" },
    { label: "Global Ranking", value: 1, suffix: "#" }, // Special case for prefix/suffix
    { label: "Fan Base", value: 12, suffix: "M+" },
];

export default function StatsSection() {
    return (
        <section className="py-32 bg-black text-white px-6 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                {STATS.map((stat, i) => (
                    <StatItem key={i} {...stat} />
                ))}
            </div>
        </section>
    );
}

function StatItem({ label, value, suffix }: { label: string, value: number, suffix: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Motion value for the number
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 50, damping: 20, duration: 2000 });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    // Format number for display
    return (
        <div ref={ref} className="flex flex-col items-center gap-2">
            <div className="flex items-baseline font-heading font-black text-5xl md:text-8xl text-primary">
                {suffix === "#" && <span className="text-4xl md:text-6xl mr-1">#</span>}
                <NumberDisplay value={springValue} />
                {suffix !== "#" && <span className="text-3xl md:text-5xl ml-1">{suffix}</span>}
            </div>
            <p className="text-neutral-500 font-mono text-sm tracking-widest uppercase">{label}</p>
        </div>
    )
}

function NumberDisplay({ value }: { value: any }) {
    const ref = useRef<HTMLSpanElement>(null);

    // Update text content directly for performance
    useEffect(() => {
        return value.on("change", (latest: number) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString();
            }
        });
    }, [value]);

    return <span ref={ref}>0</span>;
}
