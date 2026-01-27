"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

import Image from "next/image";

const GAMES = [
    {
        title: "Mobile Legends",
        desc: "MPL ID Champions. M-Series Contenders.",
        col: "md:col-span-1",
        image: "/artifacts/game_mlbb_1769169559079.png"
    },
    {
        title: "PUBG Mobile",
        desc: "Winner Winner Chicken Dinner.",
        col: "md:col-span-1",
        image: "/artifacts/game_pubg_1769169580136.png"
    },
    {
        title: "Free Fire",
        desc: "Survivors Ready.",
        col: "md:col-span-1",
        image: "/artifacts/game-ff.jpg"
    },
    {
        title: "Call Of Duty",
        desc: "Content Creators & Influencers.",
        col: "md:col-span-1",
        image: "/artifacts/game-cod.jpg"
    },
    {
        title: "Apex Legends",
        desc: "Content Creators & Influencers.",
        col: "md:col-span-1",
        image: "/artifacts/game-apex.jpg"
    },
    {
        title: "Honor Of Kings",
        desc: "Content Creators & Influencers.",
        col: "md:col-span-1",
        image: "/artifacts/game-hok.jpg"
    },
];

export default function DivisionBento() {
    return (
        <section className="py-32 bg-black px-6 md:px-10 relative z-10 md:mt-10 ">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-8xl font-figtree font-bold text-white tracking-[-2] md:tracking-[-8] uppercase mb-20 text-center">
                    Our <span className="text-[#ffd200]">Divisions</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {GAMES.map((game, i) => (
                        <BentoCard key={i} title={game.title} desc={game.desc} className={game.col} image={game.image} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function BentoCard({ title, desc, className, image }: { title: string, desc: string, className?: string, image: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn(
                "group relative border border-white/20 bg-neutral-900 overflow-hidden rounded-3xl p-8 h-[300px] flex flex-col justify-end transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,215,0,0.1)]",
                className
            )}
            onMouseMove={handleMouseMove}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Hover Gradient Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 rounded-3xl z-10"
            />

            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-10 transition-opacity duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            <div className="relative z-20">
                {/* Icon */}
                <div className="size-12 rounded-full border border-white/50 flex items-center justify-center mb-4 group-hover:bg-[#ffd200] group-hover:scale-110 group-hover:border-primary transition-all duration-300 text-white group-hover:text-black cursor-pointer" suppressHydrationWarning>
                    <span className="text-xl">↗</span>
                </div>
                <h3 className="text-3xl font-heading font-black text-white uppercase mb-2 tracking-tighter group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-neutral-400 font-figtree text-sm max-w-[80%]">{desc}</p>
            </div>
        </div>
    )
}
