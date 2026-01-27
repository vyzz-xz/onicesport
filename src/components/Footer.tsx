"use client";

export default function Footer() {
    return (
        <footer className="relative bg-black flex flex-col justify-end overflow-hidden pt-20">
            {/* Animated Lights Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-96 h-[80vh] bg-primary/20 blur-[100px] animate-pulse rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 w-96 h-[60vh] bg-[#ffd200]/20 blur-[100px] animate-pulse delay-1000 rounded-full mix-blend-screen" />
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-10 pb-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-20">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-0 w-full md:w-auto">
                        {["Instagram", "Youtube", "Tiktok", "Github"].map((social, i) => (
                            <a key={i} href="#" className="text-white hover:text-[#ffd200] transition-colors uppercase font-figtree text-[10px] md:text-sm border border-neutral-800 hover:border-[#ffd200] px-3 py-1 md:px-4 md:py-2 rounded-full backdrop-blur-sm">
                                {social}
                            </a>
                        ))}
                    </div>

                    <div className="text-white hover:text-[#ffd200] transition-colors font-figtree text-xs md:text-sm text-center md:text-right cursor-pointer w-full md:w-auto">
                        <p>Jakarta, Indonesia</p>
                        <p>Onicesports.gg</p>
                    </div>
                </div>

                {/* Big Text */}
                <h1 className="text-[20vw] md:text-[15vw] leading-[0.8] font-figtree font-bold text-center text-white uppercase tracking-tighter mix-blend-overlay opacity-80 select-none pointer-events-none">
                    Onic <br /> <span className="text-[#ffd200]">Esports</span>
                </h1>

                <div className="flex flex-col md:flex-row gap-0 justify-between items-center mt-10 border-t border-white/10 pt-10 text-white font-figtree text-[10px] md:text-xs uppercase text-center md:text-right">
                    <p>&copy; {new Date().getFullYear()} Onic Esports</p>
                    <p>Designed Muhamad Hafiz</p>
                </div>
            </div>
        </footer>
    );
}
