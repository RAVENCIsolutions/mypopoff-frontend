import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import InfluencerSection from "@/components/InfluencerSection";
import SplitThirdSection from "@/components/SplitThirdSection";
import ThreeColSection from "@/components/ThreeColSection";
import SplitHalfSection from "@/components/SplitHalfSection";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Pop Off - Search, Browse, Create",
  description: "Search, browse and create your Pop off landing page for free!",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start bg-primary-light dark:bg-primary-dark overflow-hidden">
      <NavBar />
      <HeroSection
        title="The world's most creative influencers in one place"
        subtitle="sample subtitle"
        callToAction="Find awesome content"
      />
      <InfluencerSection />
      <SplitThirdSection />
      <ThreeColSection />
      <SplitHalfSection />
      <CallToActionSection />
      <Footer />
    </main>
  );
}
