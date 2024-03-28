import Link from "next/link";

import { CgCoffee } from "react-icons/cg";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";

export const metadata = {
  title: "Start your free Pop Off journey!",
  description:
    "Register a new Pop Off account for free or sign in and customise!",
};

export default function AuthLayout({ children }) {
  return (
    <main className="relative py-20 min-h-screen h-full">
      <section className="mx-auto mb-10 px-3 xs:px-5 py-12 w-full xs:max-w-md bg-white xs:rounded-2xl shadow-xl shadow-primary-dark/5">
        <Suspense>{children}</Suspense>
      </section>

      <footer
        className={`absolute bottom-0 my-4 flex flex-col 2xs:flex-row items-center justify-center gap-2 w-full`}
      >
        <p className={`text-sm text-secondary-dark dark:text-secondary-light`}>
          Start Getting Noticed
        </p>
        <CgCoffee
          size={18}
          className="text-secondary-dark dark:text-secondary-light hover:text-action hover:dark:text-action transition-all duration-200"
        />
        <Link
          href={"/"}
          className={`text-sm text-secondary-dark dark:text-secondary-light hover:text-action hover:dark:text-action`}
        >
          My Pop Off
        </Link>
      </footer>
    </main>
  );
}
