import Link from "next/link";
import { CgCoffee } from "react-icons/cg";
import { Skeleton } from "@mui/material";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

export default function AuthLayout({ children }) {
  return (
    // <main className="flex flex-col items-center justify-start overflow-hidden">
    <main className="flex flex-col items-center justify-start h-screen min-h-fit">
      <nav className="relative my-10 px-5 md:px-14 flex items-center w-full max-w-windowed">
        <div className="md:absolute flex flex-row items-center justify-between top-1/2 left-5 md:left-1/2 -translate-y-1/2 md:-translate-x-1/2 w-full md:w-auto z-40">
          <p className="text-lg text-action dark:text-action font-bold font-display">
            <Link href="/">My Pop Off</Link>
          </p>
        </div>
      </nav>

      <section className="py-10 flex flex-col flex-grow flex items-center justify-center">
        <ClerkLoading>
          <article className="pt-9 pb-12 px-8 w-auth max-w-full min-h-auth bg-white rounded-2xl shadow-2xl shadow-black/50">
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

      <footer className="py-4 flex justify-center gap-2 text-secondary-light w-full">
        Start Getting Noticed
        <CgCoffee
          size={20}
          className="text-secondary-light hover:text-action transition-all duration-200"
        />
        My Pop Off
      </footer>
    </main>
  );
}
