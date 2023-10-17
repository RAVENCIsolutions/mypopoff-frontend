import "../(public)/globals.scss";
import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import Link from "next/link";
import { CgCoffee } from "react-icons/cg";
import { Skeleton } from "@mui/material";

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/oya4ufz.css" />
      </head>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        signInUrl="/auth/login"
        afterSignInUrl="/me/dashboard"
        afterSignUpUrl="/me/dashboard"
      >
        <body className={"bg-primary-light dark:bg-primary-dark"}>
          <main className="flex flex-col items-center justify-start bg-primary-light dark:bg-primary-dark h-screen min-h-fit bg-primary-light">
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

            <footer className="py-4 flex gap-2 text-secondary-light">
              Start Getting Noticed
              <CgCoffee
                size={20}
                className="text-secondary-light hover:text-action transition-all duration-200"
              />
            </footer>
          </main>
        </body>
      </ClerkProvider>
    </html>
  );
};

export default RootLayout;
