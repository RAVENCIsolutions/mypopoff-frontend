import Image from "next/image";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import InfluencerSection from "@/components/InfluencerSection";
import SplitThirdSection from "@/components/SplitThirdSection";
import ThreeColSection from "@/components/ThreeColSection";
import TwoColSection from "@/components/TwoColSection";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Pop Off",
  description: "Generated by create next app",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start bg-primary-light dark:bg-primary-dark">
      <NavBar />
      <HeroSection
        title="The world's most creative influencers in one place"
        subtitle="sample subtitle"
        callToAction="Find awesome content"
      />
      <InfluencerSection />
      <SplitThirdSection />
      <ThreeColSection />
      <TwoColSection />
      <CallToActionSection />
      <Footer />
    </main>
  );
}
