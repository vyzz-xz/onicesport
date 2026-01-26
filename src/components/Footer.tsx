"use client";

export default function Footer() {
    return (
        <footer className="relative min-h-screen bg-black flex flex-col justify-end overflow-hidden">
            {/* Animated Lights Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-96 h-[80vh] bg-primary/20 blur-[100px] animate-pulse rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 w-96 h-[60vh] bg-[#ffd200]/20 blur-[100px] animate-pulse delay-1000 rounded-full mix-blend-screen" />
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-10 pb-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div className="flex gap-4 mb-10 md:mb-0">
                        {["Instagram", "Youtube", "Tiktok", "Twitter"].map((social, i) => (
                            <a key={i} href="#" className="text-neutral-500 hover:text-[#ffd200] transition-colors uppercase font-figtree text-sm border border-neutral-800 hover:border-[#ffd200] px-4 py-2 rounded-full backdrop-blur-sm">
                                {social}
                            </a>
                        ))}
                    </div>

                    <div className="text-neutral-500 hover:text-[#ffd200] transition-colors font-figtree text-sm text-right cursor-pointer">
                        <p>Jakarta, Indonesia</p>
                        <p>Onicesports.com</p>
                    </div>
                </div>

                {/* Big Text */}
                <h1 className="text-[15vw] leading-[0.8] font-figtree font-bold text-center text-white uppercase tracking-tighter mix-blend-overlay opacity-80 select-none pointer-events-none">
                    Onic <br /> <span className="text-outline-white text-transparent">Esports</span>
                </h1>

                <div className="flex justify-between items-center mt-10 border-t border-white/10 pt-10 text-[#ffd200] font-figtree text-xs uppercase">
                    <p>&copy; 2024 Onic Esports. All rights reserved.</p>
                    <p>Designed Muhamad Hafiz.</p>
                </div>
            </div>
        </footer>
    );
}
