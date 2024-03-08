import NavBar from "@/components/NavBar";

import { FaGoogle } from "react-icons/fa";
import { IoSpeedometer } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";

import HeroSection from "@/components/HeroSection";
import SplitHalfSection from "@/components/SplitHalfSection";
import InfluencerSection from "@/components/InfluencerSection";
import SplitThirdSection from "@/components/SplitThirdSection";
import CallToActionSection from "@/components/CallToActionSection";
import SplitHalfWithThreeHeadings from "@/components/SplitHalfWithThreeHeadings";
import Footer from "@/components/Footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const metadata = {
  title: "The link in bio tool with a bang | My Pop Off",
  description: "Search, browse and create your Pop off landing page for free!",
};

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="flex flex-col items-center justify-start overflow-hidden">
      <NavBar session={session} />
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
      {/*<ThreeColSection*/}
      {/*  heading={"Triple the Charm with My Pop Off"}*/}
      {/*  firstImage={""}*/}
      {/*  secondImage={""}*/}
      {/*  thirdImage={""}*/}
      {/*/>*/}
      <SplitHalfSection
        heading={`Promote Yourself`}
        body={`My Pop Off is the link-in-bio that helps you promote yourself whether you are a starting or experienced influencer.`}
        callToAction={`Start Exploring`}
      />
      <SplitHalfWithThreeHeadings
        mainHeading={"Be Seen"}
        blocks={[
          {
            icon: (
              <IoSpeedometer
                size={30}
                className={`fill-primary-dark dark:fill-primary-light`}
              />
            ),
            title: "Focus on what matters",
            content: "Build a landing page in a few minutes",
          },
          {
            icon: (
              <FaGoogle
                size={30}
                className={`fill-primary-dark dark:fill-primary-light`}
              />
            ),
            title: "Let us do the work for you",
            content:
              "Have your page automatically inspected and seen by Google",
          },
          {
            icon: (
              <BsGraphUpArrow
                size={30}
                className={`fill-primary-dark dark:fill-primary-light`}
              />
            ),
            title: "Be listed where it matters",
            content: "Join a growing directory of many other creatives",
          },
        ]}
        image={{
          source: "./images/smiling-female-influencer.jpg",
          text: "",
        }}
      />
      <CallToActionSection callToAction={`Create Your Own Pop Off`} />

      <Footer />
    </main>
  );
}
