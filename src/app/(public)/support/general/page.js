import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function GeneralPage() {
  return (
    <main
      className={`flex flex-col items-center justify-start w-full min-h-dvh overflow-hidden`}
    >
      <NavBar />
      <section className={`py-6 md:py-10 px-4 max-w-xl`}>
        <h1 className={`mb-4 text-xl md:text-4xl font-bold`}>
          What is My Pop Off?
        </h1>
        <p className={`mb-4 text-base`}>
          As every influencer knows, there is no single platform that
          accommodates for all of the amazing types of media that a creative can
          use to reach their fanbase and audience.
        </p>
        <p className={`mb-4 text-base`}>
          Every social media platform has its own strengths and opportunities
          but even they don't tick all the boxes.
        </p>
        <p className={`mb-4 text-base`}>
          With the many tools and web platforms that you, as an influencer, make
          use of, it is often difficult to share every link with those who want
          to sign up to your mailing list, register to your course, connect with
          your further or even just follow you on your various social media
          accounts.
        </p>
        <p className={`mb-4 text-base`}>That's where My Pop Off comes in.</p>
        <p className={`mb-4 text-base`}>
          My Pop Off gives you your own quick and easy to set up landing page to
          list all of your important links in the one place. Then, rather than
          share a long list of links with your fans, you share just one which
          will then lead them to everything else.
        </p>
        <h2 className={`mt-8 mb-4 text-xl md:text-4xl font-bold`}>
          The Triple Charm
        </h2>
        <p className={`mb-4 text-base`}>
          What sets My Pop Off apart from other link-in-bio platforms is our
          triple charm.
        </p>

        <h3 className={`mt-8 mb-2 text-lg md:text-xl font-bold`}>
          1. Your Own Landing Page, Customisable
        </h3>
        <p className={`mb-4 text-base`}>
          Build your own landing page the way you want and customise it so that
          it fits with your message and speaks your band.
        </p>

        <h3 className={`mt-8 mb-2 text-lg md:text-xl font-bold`}>
          2. Your Own Landing Page, Browsable
        </h3>
        <p className={`mb-4 text-base`}>
          Every landing page created by My Pop Off can be easily reached via
          Google and our own Explore portal giving you a wider reach.
        </p>

        <h3 className={`mt-8 mb-2 text-lg md:text-xl font-bold`}>
          3. Your Own Landing Page, Findable
        </h3>
        <p className={`mb-4 text-base`}>
          While most other search directories mix all sorts of content together
          in search results, My Pop Off offers a search portal that only gives
          influencers like you as the result of every search.
        </p>
      </section>
      <Footer />
    </main>
  );
}
