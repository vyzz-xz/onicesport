"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const MENU_ITEMS = [
    { title: "Home", href: "#" },
    { title: "Teams", href: "#" },
    { title: "Match", href: "#" },
    { title: "News", href: "#" },
    { title: "Store", href: "#" },
    { title: "Partners", href: "#" },
];

const NEWS = [
    { title: "Onic wins MPL ID S13", category: "Tournament" },
    { title: "New Jersey Launch 2024", category: "Merch" },
    { title: "Meet & Greet Jakarta", category: "Event" },
];


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-10 flex justify-between items-center mix-blend-difference text-white">
                <div className="font-heading font-black text-2xl tracking-tighter uppercase relative z-50">
                    Onic
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative z-50 flex flex-col gap-1.5 w-10 group"
                >
                    <span className={cn("block w-full h-[2px] bg-white transition-transform duration-300", isOpen && "rotate-45 translate-y-2")} />
                    <span className={cn("block w-full h-[2px] bg-white transition-opacity duration-300", isOpen && "opacity-0")} />
                    <span className={cn("block w-full h-[2px] bg-white transition-transform duration-300", isOpen && "-rotate-45 -translate-y-2")} />
                </button>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-30 bg-black text-white flex flex-col md:flex-row"
                    >
                        {/* Left Side: Social & Contact */}
                        <div className="hidden md:flex w-1/4 border-r border-white/10 flex-col justify-between p-10">
                            <div className="mt-20">
                                <p className="text-neutral-500 font-mono text-sm mb-4">Socials</p>
                                <ul className="space-y-2">
                                    {["Instagram", "Youtube", "Tiktok"].map((s, i) => (
                                        <li key={i}><a href="#" className="hover:text-primary transition-colors uppercase font-bold text-lg">{s}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Center: Navigation */}
                        <div className="flex-1 flex flex-col justify-center px-10 md:px-20 py-20 overflow-y-auto">
                            <nav className="flex flex-col gap-2">
                                {MENU_ITEMS.map((item, i) => (
                                    <MenuItem key={i} title={item.title} i={i} />
                                ))}
                            </nav>
                        </div>

                        {/* Right Side: News Slider */}
                        <div className="hidden md:flex w-1/4 border-l border-white/10 flex-col justify-center p-10 bg-neutral-900/20">
                            <p className="text-neutral-500 font-mono text-sm mb-8">Latest Updates</p>
                            <Swiper
                                modules={[Autoplay]}
                                autoplay={{ delay: 3000 }}
                                loop={true}
                                direction="vertical"
                                className="h-[200px] w-full"
                            >
                                {NEWS.map((news, i) => (
                                    <SwiperSlide key={i} className="flex flex-col justify-center">
                                        <span className="text-primary text-xs font-mono uppercase mb-2">{news.category}</span>
                                        <h3 className="text-2xl font-heading font-bold leading-tight">{news.title}</h3>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function MenuItem({ title, i }: { title: string, i: number }) {
    return (
        <motion.a
            href="#"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="group relative text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter overflow-hidden h-[1.1em]"
        >
            <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                {title}
            </span>
            <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-primary">
                {title}
            </span>
        </motion.a>
    )
}
