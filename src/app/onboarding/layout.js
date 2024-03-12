import "@/app/globals.scss";
import Link from "next/link";
import onBoardingStore from "@/stores/OnboardingStore";
import UpdateOnBoardingStorage from "@/components/UpdateOnBoardingStorage";

export const metadata = {
  title: "Congratulations! | My Pop Off",
  description: "Onboarding will help you build your Pop Off landing page!",
};

export default function OnBoardingLayout({ children }) {
  return (
    <main className="px-2 sm:px-5 py-8 mx-auto flex flex-col w-full min-h-fit md:min-h-screen bg-primary-light dark:bg-primary-light dark:text-primary-dark">
      <nav className="mb-4 pt-1.5 flex flex-col items-center w-full text-primary-dark font-light">
        <p className="text-base sm:text-lg text-action dark:text-action font-bold font-display">
          <Link href="/">My Pop Off</Link>
        </p>
      </nav>
      <UpdateOnBoardingStorage />
      {children}
    </main>
  );
}
