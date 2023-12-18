import "@/app/(public)/globals.scss";
import { auth, ClerkProvider } from "@clerk/nextjs";
import DashboardNavigation from "@/components/DashboardNavigation";
import { fetchUserData } from "@/utility/supbaseActions";

export default function MeLayout({ children }) {
  fetchUserData(auth().userId).then((data) => console.log(data));

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
      afterSignInUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
      afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
    >
      <html lang="en" className="dark" suppressHydrationWarning>
        <head>
          <link rel="stylesheet" href="https://use.typekit.net/oya4ufz.css" />
        </head>
        <body className="p-0 sm:p-6 flex flex-col sm:flex-row items-stretch w-full h-screen min-h-fit bg-primary-light dark:bg-primary-dark">
          <DashboardNavigation />

          <section className="ml-0 sm:ml-6 flex flex-col w-full h-full">
            <main className="w-full h-full bg-dashboard-primary-light dark:bg-dashboard-primary-dark rounded-none sm:rounded-3xl shadow-xl shadow-black/40 sm:overflow-hidden">
              {children}
            </main>
          </section>
        </body>
      </html>
    </ClerkProvider>
  );
}
