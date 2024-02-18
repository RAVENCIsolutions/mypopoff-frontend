import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function GettingStartedPage() {
  return (
    <main
      className={`flex flex-col items-center justify-start w-full min-h-dvh overflow-hidden`}
    >
      <NavBar />
      <section className={`py-6 md:py-10 px-4 max-w-xl`}>
        <h1 className={`mb-4 text-xl md:text-4xl font-bold`}>
          Getting Started
        </h1>
        <p className={`mb-4 text-base`}>
          My Pop Off makes it a breeze to create and customise your own
          link-in-bio landing page for easy sharing anywhere but especially on
          social media.
        </p>
        <p className={`mb-4 text-base`}>
          Once you have created your{" "}
          <Link
            href={`/register`}
            className={`text-action hover:underline transition-all duration-300`}
          >
            free account
          </Link>
          , visit your dashboard and start setting up your landing page.
        </p>
        <h2 className={`mt-8 mb-2 text-lg md:text-xl font-bold`}>
          1. Add Important Links
        </h2>
        <p className={`mb-4 text-base`}>
          Links are at the heart of your Pop Off landing page. Add links from
          your dashboard and label them appropriately to encourage visitors to
          click on them.
        </p>
        <article className={`flex justify-center w-full`}>
          <div className="my-4 p-2 bg-action rounded-lg w-full max-w-xs text-white dark:text-primary-dark text-center">
            + Add New Link
          </div>
        </article>
        <p className={`mb-4 text-base`}>
          Remember that anyone visiting your landing page will be focusing most
          on the top handful of links so make sure to put your most important
          links at the top.
        </p>
        <p className={`mb-4 text-base`}>
          Don't worry, you can always reorder your links later.
        </p>

        <h2 className={`mt-8 mb-2 text-lg md:text-xl font-bold`}>
          2. Customise your Landing Page
        </h2>
        <p className={`mb-4 text-base`}>
          Let your Pop Off speak your brand and style!
        </p>
        <p className={`mb-4 text-base`}>
          Start customising by choosing from 8 different landing page styles and
          10 different button styles that best suit your brand.
        </p>
        <p className={`mb-4 text-base`}>
          Then, complement those with your brand colours to give that finishing
          touch.
        </p>

        <h2 className={`mt-8 mb-2 text-lg md:text-xl font-bold`}>
          3. Fill in Your Account Information
        </h2>
        <p className={`mb-4 text-base`}>
          Your username, bio description, category and tags are important to
          make your landing page easier to find. Although most of these are
          optional, it is important that you at least fill in your username so
          that you have a personal link to share with your friends and fans.
        </p>
      </section>
      <Footer />
    </main>
  );
}
