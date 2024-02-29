import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ExploreBlock from "@/components/ExploreBlock";
import SearchBlock from "@/components/SearchBlock";

export const metadata = {
  title: "Explore | My Pop Off",
  description:
    "Browse and search through My Pop Off's vast directory of creatives and amazing influencers!",
};

export default function Explore() {
  return (
    <main className="flex flex-col items-center justify-start overflow-hidden">
      <NavBar />
      <SearchBlock />
      <ExploreBlock />
      <Footer />
    </main>
  );
}
