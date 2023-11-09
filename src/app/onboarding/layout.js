import "../(public)/globals.scss";
import Link from "next/link";
import OnBoardingMain from "@/onboardingComponents/OnBoardingMain";

export const metadata = {
  title: "Congratulations! | My Pop Off",
  description: "Onboarding will help you build your Pop Off landing page!",
};

export default function OnBoardingLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/oya4ufz.css" />
      </head>
      <body className="px-3 sm:px-5 py-8 mx-auto flex flex-col w-full min-h-fit md:h-screen bg-primary-light max-w-windowed">
        <nav className="mb-4 pt-1.5 flex flex-col items-center w-full text-primary-dark font-light">
          <p className="text-base sm:text-lg text-action dark:text-action font-bold font-display">
            <Link href="/">My Pop Off</Link>
          </p>
        </nav>
        <>{children}</>
      </body>
    </html>
  );
}
