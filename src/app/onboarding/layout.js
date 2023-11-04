import "../(public)/globals.scss";
import Link from "next/link";
import OnBoardingMain from "@/onboardingComponents/OnBoardingMain";

export default function OnBoardingLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/oya4ufz.css" />
      </head>
      <body className="p-6 w-full min-h-fit bg-primary-light">
        <nav className="mb-6 flex flex-col w-full text-primary-dark font-light">
          <p className="text-base sm:text-lg text-action dark:text-action font-bold font-display">
            <Link href="/">My Pop Off</Link>
          </p>
        </nav>

        <>{children}</>
      </body>
    </html>
  );
}
