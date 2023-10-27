import "../(public)/globals.scss";
import { ClerkProvider } from "@clerk/nextjs";
import DashboardNavigation from "@/components/DashboardNavigation";

export default function MeLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/oya4ufz.css" />
      </head>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <body className="p-6 flex flex-row items-stretch w-full h-screen min-h-fit bg-primary-light dark:bg-primary-dark">
          <DashboardNavigation />

          <section className="ml-6 flex flex-col w-full h-full">
            <main className="w-full h-full bg-dashboard-primary-light dark:bg-dashboard-primary-dark rounded-3xl shadow-xl shadow-black/40 overflow-hidden">
              {children}
            </main>
          </section>
        </body>
      </ClerkProvider>
    </html>
  );
}
