import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import SearchBlock from "@/components/SearchBlock";
import ExploreBlock from "@/components/ExploreBlock";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const metadata = {
  title: "Explore | My Pop Off",
  description:
    "Browse and search through My Pop Off's vast directory of creatives and amazing influencers!",
};

export default async function Explore() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="flex flex-col items-center justify-start overflow-hidden">
      <NavBar session={session} />
      <SearchBlock />
      <ExploreBlock />
      <Footer />
    </main>
  );
}
