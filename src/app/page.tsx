import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import AboutSection from "@/components/AboutSection";
import SponsorMarquee from "@/components/SponsorMarquee";
import DivisionBento from "@/components/DivisionBento";
import StatsSection from "@/components/StatsSection";
import AwardsSection from "@/components/AwardsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Preloader />
      <Navbar />

      {/* Hero Section with Scrollytelling */}
      <SequenceScroll />

      {/* Content wrapper with negative margin to overlap the sticky hero at the end */}
      <div className="relative z-10 -mt-[100vh] bg-black">
        <AboutSection />
        <SponsorMarquee />
        <DivisionBento />
        <StatsSection />
        <AwardsSection />
        <Footer />
      </div>
    </main>
  );
}
