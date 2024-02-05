import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import InfluencerSection from "@/components/InfluencerSection";
import SplitThirdSection from "@/components/SplitThirdSection";
import ThreeColSection from "@/components/ThreeColSection";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";
import { FaSearch } from "react-icons/fa";

export const metadata = {
  title: "Help & Support | My Pop Off",
  description: "Learn more about My Pop Off and how to get started!",
};

export default function SupportPage() {
  return (
    <main className="flex flex-col items-center justify-start overflow-hidden">
      <NavBar />

      <section
        className={`py-12 flex justify-center w-full max-w-lg lg:max-w-squeezed`}
      >
        <div className={`relative w-full max-w-lg`}>
          <input
            className={`p-3 pl-5 pr-12 rounded-full w-full bg-primary-light/10 focus:bg-primary-light/20 border-none outline-none transition-all duration-300`}
            placeholder={`Search support...`}
          />
          <FaSearch
            size={20}
            className={`absolute top-1/2 right-4 -translate-y-1/2 text-primary-light/50 hover:text-primary-light/90 transition-all duration-300`}
          />
        </div>
      </section>

      <section></section>

      <Footer />
    </main>
  );
}
