"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Image from "next/image";

const AWARDS = [
    { title: "MPL ID S12", description: "Champions", year: "2023", image: "/artifacts/game-ff.jpg" },
    { title: "MSC", description: "Champions", year: "2023", image: "/artifacts/game-hok.jpg" },
    { title: "MPL ID S11", description: "Champions", year: "2023", image: "/artifacts/game-apex.jpg" },
    { title: "MPL I D S10", description: "Champions", year: "2022", image: "/artifacts/game-cod.jpg" },
    { title: "M4 World Champ", description: "Runner Up", year: "2022", image: "/artifacts/game-ff.jpg" },
];

export default function AwardsSection() {
    return (
        <section className="py-20 md:py-32 bg-neutral-950 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-black to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-black to-transparent z-10" />

            <div className="relative z-20 text-center mb-24 px-6">
                <h2 className="text-5xl md:text-8xl font-figtree font-bold text-white uppercase">
                    Hall of <span className="text-[#ffd200]">Fame</span>
                </h2>
                <p className="text-sm md:text-xl text-white font-figtree uppercase mt-4">Our Legacy of Victory</p>
            </div>

            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                initialSlide={2}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="w-[500px] h-[350px] md:w-[1000px] md:h-[700px]"
            >
                {AWARDS.map((award, i) => (
                    <SwiperSlide key={i} className="w-[200px] md:w-[400px] bg-neutral-900 rounded-xl border border-white/10 overflow-hidden flex flex-col">
                        <div className="h-2/3 bg-neutral-800 relative flex items-center justify-center group overflow-hidden">
                            {/* Award Image */}
                            <Image
                                src={award.image}
                                alt={award.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex-1 p-8 flex flex-col justify-center bg-neutral-900 text-white">
                            <span className="text-primary font-figtree text-sm">{award.year}</span>
                            <h3 className="text-2xl font-bold font-heading uppercase">{award.title}</h3>
                            <p className="text-neutral-500">{award.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
