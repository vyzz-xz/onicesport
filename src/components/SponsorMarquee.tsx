"use client";

const SPONSORS = [
    "Infinix", "MSI", "Secretlab", "Gopay", "Grab", "Biznet", "Samsung", "ROG", "Nvidia", "Dana", "Mills", "Dunia Games"
];

export default function SponsorMarquee() {
    return (
        <section className="py-24 bg-black border-y border-white/10 overflow-hidden relative z-10">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-20" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-20" />

            <div className="flex w-full overflow-hidden group">
                <div className="flex animate-marquee whitespace-nowrap items-center flex-shrink-0">
                    {SPONSORS.map((sponsor, i) => (
                        <SponsorItem key={i} name={sponsor} />
                    ))}
                </div>
                <div className="flex animate-marquee whitespace-nowrap items-center flex-shrink-0" aria-hidden="true">
                    {SPONSORS.map((sponsor, i) => (
                        <SponsorItem key={`dup-${i}`} name={sponsor} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function SponsorItem({ name }: { name: string }) {
    return (
        <div className="mx-8 md:mx-12 flex items-center gap-6 text-white font-figtree text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-[#ffd200] transition-colors duration-300 cursor-pointer">
            <span>{name}</span>
            <span className="text-primary/50 text-2xl align-middle">✦</span>
        </div>
    )
}
