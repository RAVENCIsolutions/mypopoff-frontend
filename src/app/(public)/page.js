import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import InfluencerSection from "@/components/InfluencerSection";
import SplitThirdSection from "@/components/SplitThirdSection";
import ThreeColSection from "@/components/ThreeColSection";
import SplitHalfSection from "@/components/SplitHalfSection";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "The link in bio tool with a bang | My Pop Off",
  description: "Search, browse and create your Pop off landing page for free!",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start overflow-hidden">
      <NavBar />
      <HeroSection
        title="The world's most creative influencers in one place"
        subtitle="Discover. Connect. Be Inspired."
        callToAction="Find awesome content"
      />
      <InfluencerSection />
      <SplitThirdSection
        heading={"Make a landing page that Pops!"}
        subHeading={"Do it your way"}
        image={"/images/a-landing-page-that-pops.png"}
      />
      <ThreeColSection
        heading={"Triple the Charm with My Pop Off"}
        firstImage={""}
        secondImage={""}
        thirdImage={""}
      />
      {/*<SplitHalfSection />*/}
      <CallToActionSection />

      <Footer />
    </main>
  );
}
