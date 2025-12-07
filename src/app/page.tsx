import HeroSection from "@/components/HeroSection";
import DetailsSection from "@/components/DetailsSection";
import RSVPSection from "@/components/RSVPSection";

export default function Home() {
  return (
    <main className="snap-container">
      <HeroSection />
      <DetailsSection />
      <RSVPSection />
    </main>
  );
}
