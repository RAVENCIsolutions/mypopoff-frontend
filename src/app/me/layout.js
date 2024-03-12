import "@/app/globals.scss";

import { cookies } from "next/headers";

import Providers from "@/providers/Providers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import NavBar from "@/components/NavBar";
import LogOffButton from "@/components/LogOffButton";
import DashboardNavigation from "@/components/DashboardNavigation";

import DarkModeToggle from "@/components/DarkModeToggle";

export const metadata = {
  title: "Dashboard | My Pop Off",
  description:
    "Create and manage your own Pop Off with our easy to use dashboard.",
};

export default async function MeLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    // flex flex-col justify-between w-full h-full max-h-screen bg-primary-light dark:bg-primary-dark overflow-hidden
    <div className={`flex flex-col justify-between h-dvh max-h-dvh`}>
      <Providers>
        <NavBar session={session} />
        <div
          // flex-grow pt-2 sm:pb-6 flex flex-row justify-start sm:justify-between sm:items-stretch overflow-hidden
          className={`flex-grow pt-2 sm:pb-6 flex flex-col sm:flex-row sm:max-h-full sm:overflow-hidden`}
        >
          <section className={`py-2 px-5 md:pr-8 w-full sm:w-auto`}>
            <DashboardNavigation />
          </section>

          <main className="flex-grow sm:mr-4 flex justify-stretch sm:w-11/12 lg:w-5/6 h-full bg-dashboard-primary-light dark:bg-dashboard-primary-dark rounded-none sm:rounded-3xl shadow-xl shadow-black/25">
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
    </div>
  );
}
