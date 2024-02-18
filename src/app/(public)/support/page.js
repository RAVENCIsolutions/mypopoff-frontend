import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export const metadata = {
  title: "Help & Support | My Pop Off",
  description: "Learn more about My Pop Off and how to get started!",
};

export default function SupportPage() {
  return (
    <main
      className={`flex flex-col items-center justify-start w-full min-h-dvh overflow-hidden`}
    >
      <NavBar />

      <section
        className={`mt-10 px-5 lg:px-14 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl`}
      >
        <Link
          href={`/support/general`}
          className={`p-4 col-span-1 row-span-1 sm:row-span-2 min-h-40 rounded-xl bg-primary-dark/20 dark:bg-primary-light/30 hover:-translate-y-2 shadow-md hover:shadow-xl shadow-primary-dark/20 hover:shadow-primary-dark/10 transition-all duration-300`}
        >
          <p
            className={`px-4 py-2 inline bg-primary-dark/20 dark:bg-primary-dark/70 rounded-xl text-sm font-light text-primary-dark dark:text-primary-light/90`}
          >
            General
          </p>
          <p className={`mt-4 text-sm text-primary-dark/70`}>
            Learn all about <strong>My Pop Off</strong> and how to make the most
            of your landing page.
          </p>
        </Link>

        <Link
          href={`/support/getting-started`}
          className={`p-4 col-span-1 sm:col-span-2 row-span-1 min-h-40 rounded-xl bg-primary-dark/20 dark:bg-primary-light/30 hover:-translate-y-2 shadow-md hover:shadow-xl shadow-primary-dark/20 hover:shadow-primary-dark/10 transition-all duration-300`}
        >
          <p
            className={`px-4 py-2 inline bg-primary-dark/20 dark:bg-primary-dark/70 rounded-xl text-sm font-light text-primary-dark dark:text-primary-light/90`}
          >
            Getting Started
          </p>
          <p className={`mt-4 text-sm text-primary-dark/70`}>
            If you are new to <strong>My Pop Off</strong> and want to get a head
            start on setting up your landing page, this is the place to start.
          </p>
        </Link>

        <Link
          href={`/support/security`}
          className={`p-4 col-span-1 row-span-1 min-h-40 rounded-xl bg-primary-dark/20 dark:bg-primary-light/30 hover:-translate-y-2 shadow-md hover:shadow-xl shadow-primary-dark/20 hover:shadow-primary-dark/10 transition-all duration-300`}
        >
          <p
            className={`px-4 py-2 inline bg-primary-dark/20 dark:bg-primary-dark/70 rounded-xl text-sm font-light text-primary-dark dark:text-primary-light/90`}
          >
            Security
          </p>
          <p className={`mt-4 text-sm text-primary-dark/70`}>
            Find out what you can do to make sure that your{" "}
            <strong>My Pop Off</strong> data stays secure.
          </p>
        </Link>

        <Link
          href={`/support/extras`}
          className={`p-4 col-span-1 row-span-1 min-h-40 rounded-xl bg-primary-dark/20 dark:bg-primary-light/30 hover:-translate-y-2 shadow-md hover:shadow-xl shadow-primary-dark/20 hover:shadow-primary-dark/10 transition-all duration-300`}
        >
          <p
            className={`px-4 py-2 inline bg-primary-dark/20 dark:bg-primary-dark/70 rounded-xl text-sm font-light text-primary-dark dark:text-primary-light/90`}
          >
            Extras
          </p>
          <p className={`mt-4 text-sm text-primary-dark/70`}>
            Here are some tips and tricks that can help you promote your{" "}
            <strong>Pop Off</strong>.
          </p>
        </Link>
      </section>

      {/* FAQs */}
      <section className={`flex-grow`}></section>

      <Footer />
    </main>
  );
}
