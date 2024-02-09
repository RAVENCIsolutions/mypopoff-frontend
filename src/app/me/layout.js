import "@/app/(public)/globals.scss";
import { auth, ClerkProvider, useUser } from "@clerk/nextjs";
import DashboardNavigation from "@/components/DashboardNavigation";
import Providers from "@/providers/Providers";

export const metadata = {
  title: "Dashboard | My Pop Off",
  description:
    "Create and manage your own Pop Off with our easy to use dashboard.",
};

export default function MeLayout({ children }) {
  const { isSignedIn } = useUser;

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" className="dark" suppressHydrationWarning>
        <head>
          <link rel="stylesheet" href="https://use.typekit.net/oya4ufz.css" />
        </head>
        <body className="p-0 sm:p-6 flex flex-col sm:flex-row items-stretch w-full h-auto md:h-screen min-h-fit bg-primary-light dark:bg-primary-dark">
          <Providers>
            <DashboardNavigation />

            <section className="ml-0 sm:ml-6 flex flex-col w-full h-full">
              <main className="w-full h-full bg-dashboard-secondary-light dark:bg-dashboard-primary-dark rounded-none md:rounded-3xl shadow-xl shadow-black/5 lg:shadow-black/20 sm:overflow-hidden">
                {isSignedIn && children}
              </main>
            </section>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
