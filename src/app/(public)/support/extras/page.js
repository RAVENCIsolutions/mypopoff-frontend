import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ExtrasPage() {
  return (
    <main
      className={`flex flex-col items-center justify-start w-full min-h-dvh overflow-hidden`}
    >
      <NavBar />
      <section className={`py-6 md:py-10 px-4 max-w-xl`}>
        <h1 className={`mb-4 text-xl md:text-4xl font-bold`}>Quick Tips</h1>
        <p className={`mb-4 text-base`}>
          My Pop Off has industry standard processes in place to promote your
          landing page as much as possible but there are a few things you can do
          to make it even easier for people to find your Pop Off.
        </p>
        <p className={`mb-4 text-base`}>
          My Pop Off has industry standard processes in place to promote your
          landing page as much as possible but there are a few things you can do
          to make it even easier for people to find your Pop Off.
        </p>

        <h2 className={`mt-8 mb-2 text-lg md:text-xl font-bold`}>
          Pick the Most Appropriate Category
        </h2>
        <p className={`mb-4 text-base`}>
          Your category is used to display your landing page to users who are
          looking for influencers in the same, or similar, industries. It is
          important that you pick one of the preset categories unless none of
          them fit your needs perfectly, then and only then do we recommend that
          you pick "Other.." as your option and nominate your own.
        </p>

        <h2 className={`mt-8 mb-2 text-lg md:text-xl font-bold`}>
          Use Tags Wisely
        </h2>
        <p className={`mb-4 text-base`}>
          There is no real limit as to how many tags you can add to your
          account. These will never be seen by other users, however, they add
          weight to search results. Tags should be used to accompany and support
          your bio description and your category. The more these three are in
          sync, the better chance your page will have at being seen by those
          looking for work and services like yours.
        </p>

        <h2 className={`mt-8 mb-2 text-lg md:text-xl font-bold`}>
          Make the Most of Your Bio
        </h2>
        <p className={`mb-4 text-base`}>
          We have left some hints beside your bio description to help you. In
          short, try to write a description that is between 120 to 150
          characters long. Use the indicator to help you with that.
        </p>
        <p className={`mb-4 text-base`}>
          Your bio should welcome visitors, explain to them what you do, and
          guide them to how you can best help them.
        </p>
      </section>
      <Footer />
    </main>
  );
}
