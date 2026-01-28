"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Image from "next/image";
import FadeIn from "./FadeIn";

const AWARDS = [
    { title: "MPL ID Season 10", description: "Champions", year: "2022", image: "/artifacts/s10.jpg" },
    { title: "MPL ID Season 11", description: "Champions", year: "2023", image: "/artifacts/season11.png" },
    { title: "MPL ID Season 12", description: "Champions", year: "2023", image: "/artifacts/onic-s12.jpg" },
    { title: "MPL ID Season 15", description: "Champions", year: "2025", image: "/artifacts/s15.jpg" },
    { title: "MPL ID Season 16", description: "Champions", year: "2025", image: "/artifacts/season16.jpg" },
    { title: "MSC Kamboja", description: "Champions", year: "2023", image: "/artifacts/msc-2023.jpg" },
    { title: "M4 World Champ", description: "Runner Up", year: "2023", image: "/artifacts/m4.jpeg" },
];

export default function AwardsSection() {
    return (
        <section className="py-20 md:py-32 bg-neutral-950 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-black to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-black to-transparent z-10" />

            <div className="relative z-20 text-center mb-24 px-6">
                <FadeIn direction="down">
                    <h2 className="text-5xl md:text-8xl font-figtree font-bold text-white uppercase">
                        Hall of <span className="text-[#ffd200]">Fame</span>
                    </h2>
                    <p className="text-sm md:text-xl text-white font-figtree uppercase mt-4">Our Legacy of Victory</p>
                </FadeIn>
            </div>

            <FadeIn delay={0.2} fullWidth className="flex justify-center">
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
                    className="w-[350px] h-[350px] md:w-[1000px] md:h-[700px]"
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
                                <p className="text-white">{award.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </FadeIn>
        </section>
    );
}
