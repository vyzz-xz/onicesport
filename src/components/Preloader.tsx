"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading or replace with actual asset loading logic
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 500); // Small delay after 100%
                    return 100;
                }
                return prev + 1;
            });
        }, 30); // Adjust speed

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
                    exit={{
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    <div className="flex flex-col items-center gap-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-9xl font-bold font-heading tracking-tighter uppercase"
                        >
                            Onic
                            <span className="text-primary ml-4">Esport</span>
                        </motion.h1>
                        <p className="font-mono text-sm uppercase tracking-widest text-neutral-400">
                            Undefeated / Unstoppable
                        </p>
                    </div>

                    <div className="absolute bottom-10 left-0 w-full px-10">
                        <div className="flex justify-between items-end mb-2 font-mono text-xs uppercase text-neutral-500">
                            <span>Loading Assets</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-[2px] bg-neutral-900 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-white"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
