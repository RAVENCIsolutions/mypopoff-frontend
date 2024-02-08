import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import { FaSearch } from "react-icons/fa";

export const metadata = {
  title: "Help & Support | My Pop Off",
  description: "Learn more about My Pop Off and how to get started!",
};

export default function SupportPage() {
  return (
    <main
      className={`px-5 lg:px-14 flex flex-col items-center justify-start w-full min-h-dvh overflow-hidden`}
    >
      <NavBar />

      <section
        className={`py-12 flex justify-center w-full max-w-lg lg:max-w-squeezed`}
      >
        <div className={`relative w-full max-w-lg`}>
          <input
            className={`p-3 pl-5 pr-12 rounded-full w-full bg-primary-dark/10 focus:bg-primary-dark/20 dark:bg-primary-light/10 focus:dark:bg-primary-light/20 placeholder-primary-dark focus:placeholder-primary-dark/60 dark:placeholder-primary-light/40 dark:focus:placeholder-primary-light/70 outline-none shadow-none focus:shadow-xl shadow-primary-dark/10 opacity-60 focus:opacity-100 transition-all duration-500`}
            placeholder={`Search support...`}
          />
          <FaSearch
            size={20}
            className={`cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 text-primary-dark/30 hover:text-primary-dark dark:text-primary-light/50 dark:hover:text-primary-light/90 transition-all duration-300`}
          />
        </div>
      </section>

      <section
        className={`grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl`}
      >
        <article
          className={`p-4 col-span-1 row-span-1 sm:row-span-2 min-h-40 rounded-xl bg-primary-dark/80 dark:bg-primary-light/30 hover:-translate-y-1 shadow-md hover:shadow-xl shadow-primary-dark/20 hover:shadow-primary-dark/10 transition-all duration-300`}
        >
          <p
            className={`px-4 pr-6 py-2 inline bg-primary-dark/70 rounded-xl text-sm font-light text-primary-light/90`}
          >
            General
          </p>
          <p className={`mt-4 text-sm text-primary-dark/70`}>
            If you're new to <strong>My Pop Off</strong> and want to get a head
            start on setting up your landing page, this is the place to start.
          </p>
        </article>
        <article
          className={`p-4 col-span-1 sm:col-span-2 row-span-1 min-h-40 rounded-xl bg-primary-dark/80 dark:bg-primary-light/30 hover:-translate-y-1 shadow-md hover:shadow-xl shadow-primary-dark/20 hover:shadow-primary-dark/10 transition-all duration-300`}
        >
          <p
            className={`px-4 pr-6 py-2 inline bg-primary-dark/70 rounded-xl text-sm font-light text-primary-light/90`}
          >
            Getting Started
          </p>
          <p className={`mt-4 text-sm text-primary-dark/70`}>
            If you're new to <strong>My Pop Off</strong> and want to get a head
            start on setting up your landing page, this is the place to start.
          </p>
        </article>
        <article
          className={`p-4 col-span-1 row-span-1 min-h-40 rounded-xl bg-primary-dark/80 dark:bg-primary-light/30 hover:-translate-y-1 shadow-md hover:shadow-xl shadow-primary-dark/20 hover:shadow-primary-dark/10 transition-all duration-300`}
        >
          <p
            className={`px-4 pr-6 py-2 inline bg-primary-dark/70 rounded-xl text-sm font-light text-primary-light/90`}
          >
            Security
          </p>
          <p className={`mt-4 text-sm text-primary-dark/70`}>
            Find out how <strong>My Pop Off</strong> keeps your data secure.
          </p>
        </article>
        <article
          className={`p-4 col-span-1 row-span-1 min-h-40 rounded-xl bg-primary-dark/80 dark:bg-primary-light/30 hover:-translate-y-1 shadow-md hover:shadow-xl shadow-primary-dark/20 hover:shadow-primary-dark/10 transition-all duration-300`}
        >
          <p
            className={`px-4 py-2 inline bg-primary-dark/70 rounded-xl text-sm font-light text-primary-light/90`}
          >
            Extras
          </p>
          <p className={`mt-4 text-sm text-primary-dark/70`}>
            If you're new to <strong>My Pop Off</strong> and want to get a head
            start on setting up your landing page, this is a great place to
            start.
          </p>
        </article>
      </section>

      {/* FAQs */}
      <section className={`flex-grow`}></section>

      <Footer />
    </main>
  );
}
