import "@/app/globals.scss";

import { useClerk } from "@clerk/nextjs";

import userStore from "@/stores/UserStore";
import Providers from "@/providers/Providers";
import DashboardNavigation from "@/components/DashboardNavigation";
import NavBar from "@/components/NavBar";
import { CgLogOff } from "react-icons/cg";
import DarkModeToggle from "@/components/DarkModeToggle";
import LogOffButton from "@/components/LogOffButton";

export const metadata = {
  title: "Dashboard | My Pop Off",
  description:
    "Create and manage your own Pop Off with our easy to use dashboard.",
};

export default function MeLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/oya4ufz.css" />
      </head>
      <body className="flex flex-col items-stretch w-full h-auto sm:h-screen max-h-screen bg-primary-light dark:bg-primary-dark overflow-hidden">
        <Providers>
          <NavBar />
          <div
            className={`h-full pt-2 sm:pb-6 flex sm:flex-row flex-col justify-start sm:justify-between sm:items-stretch overflow-hidden`}
          >
            <section className={`py-2 px-4 md:pl-6 w-full sm:w-auto`}>
              <DashboardNavigation />
            </section>

            <main className="flex-grow sm:mr-4 flex justify-stretch sm:w-11/12 lg:w-5/6 h-full bg-dashboard-secondary-light dark:bg-dashboard-primary-dark rounded-none sm:rounded-3xl shadow-xl shadow-black/5 lg:shadow-black/20 overflow-hidden">
              {children}
            </main>
          </div>

          {/* Bottom Bar */}
          <section
            className={`relative py-2 px-4 left-0 bottom-0 flex justify-between items-center w-full bg-dashboard-primary-dark`}
          >
            <LogOffButton />
            <article className="">
              <DarkModeToggle
                size={"s"}
                textInLight="#f7f5f3"
                textInDark="#f7f5f3"
              />
            </article>
          </section>
        </Providers>
      </body>
    </html>
  );
}
