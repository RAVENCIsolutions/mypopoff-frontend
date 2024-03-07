import Link from "next/link";
import { CgCoffee } from "react-icons/cg";
import { Skeleton } from "@mui/material";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

export const metadata = {
  title: "Start your free Pop Off journey!",
  description:
    "Register a new Pop Off account for free or sign in and customise!",
};

export default function AuthLayout({ children }) {
  return (
    <main className="flex flex-col items-center justify-start h-screen min-h-fit">
      <section className="py-10 flex flex-col items-center justify-start sm:justify-center w-full h-full">
        <ClerkLoading>
          <article className="pt-9 pb-12 px-8 w-full bg-white rounded-2xl shadow-2xl shadow-black/50">
            <Skeleton
              className="mb-2"
              variant="rectangular"
              width="80px"
              height="30px"
            />
            <Skeleton
              className="mb-12"
              variant="rectangular"
              width="200px"
              height="20px"
            />
            <Skeleton
              className="mb-2"
              variant="rectangular"
              width="100px"
              height="12px"
            />
            <Skeleton
              className="mb-4 w-full max-w-auth rounded-md"
              variant="rectangular"
              height="50px"
            />
            <Skeleton
              className="mb-8 w-full max-w-auth rounded-md"
              variant="rectangular"
              height="35px"
            />
            <Skeleton
              className=""
              variant="rectangular"
              height="15px"
              width="150px"
            />
          </article>
        </ClerkLoading>

        <ClerkLoaded>{children}</ClerkLoaded>
      </section>

      <footer
        className={`my-4 sm:mt-0 flex flex-col 2xs:flex-row items-center gap-2 min-w-fit`}
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
