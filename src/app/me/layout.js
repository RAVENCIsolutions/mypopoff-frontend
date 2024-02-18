import "@/app/(public)/globals.scss";
import { ClerkProvider, useUser } from "@clerk/nextjs";
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
      afterSignInUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
      afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="stylesheet" href="https://use.typekit.net/oya4ufz.css" />
        </head>
        <body className="flex flex-col md:flex-row items-stretch w-full h-auto md:h-screen bg-primary-light dark:bg-primary-dark">
          <Providers>
            <section
              className={`md:fixed p-4 md:pl-6 md:py-6 md:1/5 lg:w-1/6 relative w-full md:h-screen`}
            >
              <DashboardNavigation />
            </section>

            <section className="md:absolute right-0 md:ml-6 md:px-6 md:py-6 flex flex-col md:w-4/5 lg:w-5/6 h-full">
              <main className="w-full min-h-full bg-dashboard-secondary-light dark:bg-dashboard-primary-dark rounded-none md:rounded-3xl shadow-xl shadow-black/5 lg:shadow-black/20 sm:overflow-hidden">
                {isSignedIn && children}
              </main>
            </section>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
