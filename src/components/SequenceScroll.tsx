"use client";

import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const FRAME_COUNT = 192; // Total frames
const IMAGE_PATH = "/sequence/ezgif-frame-"; // Path prefix

export default function SequenceScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Scroll progress 0 to 1
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll to frame index
    const currentIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const frameIndex = i.toString().padStart(3, "0");
                    img.src = `${IMAGE_PATH}${frameIndex}.jpg`;
                    img.onload = () => {
                        loadedImages[i - 1] = img; // correctly place by index
                        resolve();
                    };
                    img.onerror = () => {
                        // Handle error or just skip
                        console.warn(`Failed to load frame ${i}`);
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // Draw to canvas
    const render = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !isLoaded) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle High DPI
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Set actual size in memory (scaled to account for extra pixel density)
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            // Normalize coordinate system to use css pixels.
            // However, for drawImage it is often better to keep 1:1 and scale the draw call? 
            // Actually, scaling context is easier.
            ctx.scale(dpr, dpr);
        }

        // We use rect.width/height for logic because we scaled the context
        const w = rect.width;
        const h = rect.height;

        ctx.clearRect(0, 0, w, h);

        // Draw black background first
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, w, h);

        // Use floor to get integer frame
        let frameIndex = Math.floor(index) - 1;
        if (frameIndex < 0) frameIndex = 0;
        if (frameIndex >= FRAME_COUNT) frameIndex = FRAME_COUNT - 1;

        const img = images[frameIndex];

        if (img) {
            // Calculate aspect ratio to cover
            const imgRatio = img.width / img.height;
            const canvasRatio = w / h;

            let drawW, drawH;

            if (canvasRatio > imgRatio) {
                drawW = w;
                drawH = w / imgRatio;
            } else {
                drawH = h;
                drawW = h * imgRatio;
            }

            const x = (w - drawW) / 2;
            const y = (h - drawH) / 2;

            ctx.drawImage(img, x, y, drawW, drawH);
        } else {
            // Draw Stylized Placeholder
            // Gradient Background
            const gradient = ctx.createLinearGradient(0, 0, w, h);
            gradient.addColorStop(0, "#0a0a0a");
            gradient.addColorStop(1, "#1a1a1a");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);

            // Grid lines
            ctx.strokeStyle = "#222";
            ctx.lineWidth = 1;
            const gridSize = 50;

            ctx.beginPath();
            for (let x = 0; x <= w; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
            }
            for (let y = 0; y <= h; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
            }
            ctx.stroke();

            // Text
            ctx.fillStyle = "#ffd700"; // Gold
            ctx.font = "bold 40px 'Figtree', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`FRAME ${frameIndex + 1}`, w / 2, h / 2);

            ctx.font = "14px 'Inter', sans-serif";
            ctx.fillStyle = "#666";
            ctx.fillText("WAITING FOR ASSETS IN /public/sequence/", w / 2, h / 2 + 40);
        }
    };

    useMotionValueEvent(currentIndex, "change", (latest: number) => {
        render(latest);
    });

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded) render(1);
    }, [isLoaded]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => render(currentIndex.get());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, currentIndex]);


    return (
        <div ref={containerRef} className="relative h-[300vh] w-full bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full object-cover z-0"
                />

                {/* Story Overlays fade in/out based on scroll */}
                <div className="relative z-10 w-full h-full pointer-events-none">
                    <ScrollOverlay progress={currentIndex} />
                </div>
            </div>
        </div>
    );
}

function ScrollOverlay({ progress }: { progress: any }) {
    const [step, setStep] = useState(0);

    useMotionValueEvent(progress, "change", (latest: number) => {
        const p = latest / FRAME_COUNT; // 0 to 1
        if (p < 0.2) setStep(0);
        else if (p < 0.5) setStep(1);
        else if (p < 0.8) setStep(2);
        else setStep(3); // Clear
    });

    // Only showing if valid step
    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center px-6 md:px-20">
            {/* Step 0: Center Title */}
            <div className={cn(
                "transition-opacity duration-700 ease-out flex flex-col items-center text-center",
                step === 0 ? "opacity-100" : "opacity-0 hidden"
            )}>
            </div>

            {/* Step 1: Left Align */}
            <div className={cn(
                "transition-opacity duration-700 ease-out flex flex-col items-start text-left ml-10",
                step === 1 ? "opacity-100" : "opacity-0 hidden"
            )}>
                <h2 className="text-4xl md:text-7xl font-heading font-bold text-white tracking-[-5] uppercase mb-4 leading-[0.8]">
                    Precision <br /> <span className="text-[#ffd200]">Exec</span>
                </h2>
            </div>

            {/* Step 2: Right Align */}
            <div className={cn(
                "transition-opacity duration-700 ease-out flex flex-col items-end text-right mr-10",
                step === 2 ? "opacity-100" : "opacity-0 hidden"
            )}>
                <h2 className="text-4xl md:text-7xl font-heading font-bold text-white tracking-[-5] uppercase mb-4 leading-[0.8]">
                    Global <br /> <span className="text-[#ffd200]">Icons</span>
                </h2>
            </div>

        </div>
    )
}
