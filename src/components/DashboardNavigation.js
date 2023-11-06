"use client";

import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import DarkModeToggle from "@/components/DarkModeToggle";
import { CgLogOff, CgPerformance, CgUser, CgWebsite } from "react-icons/cg";
import { RiPaletteLine } from "react-icons/ri";
import { ImCog } from "react-icons/im";

import "../app/me/dashboard.scss";

const DashboardNavigation = () => {
  const pathname = usePathname();

  const topLinks = [
    {
      title: "Dashboard",
      alt: "Dashboard where you can overview all your activities and settings",
      route: "/me/dashboard",
      icon: <CgPerformance size={20} />,
    },
    {
      title: "Landing Page",
      alt: "The main Landing Page for your Pop Off",
      route: "/me/my-page",
      icon: <CgWebsite size={20} />,
    },
    {
      title: "Customise",
      alt: "Customise the look and feel of your Pop Off",
      route: "/me/customise",
      icon: <RiPaletteLine size={20} />,
    },
  ];

  const bottomLinks = [
    {
      title: "Account",
      alt: "Account to see and manage your account details",
      route: "/me/account",
      icon: <CgUser size={20} />,
    },
    {
      title: "Settings",
      alt: "Settings for application preferences and configurations",
      route: "/me/settings",
      icon: <ImCog size={18} />,
    },
  ];

  return (
    <nav className="p-4 py-5 sm:p-0 pb-6 flex flex-col w-full sm:w-1/6 min-w-max text-primary-dark dark:text-primary-light font-light font-base">
      <p className="pb-6 sm:pb-12 text-base sm:text-lg text-action dark:text-action font-bold font-display">
        <Link href="/">My Pop Off</Link>
      </p>
      <div className="flex flex-row sm:flex-col sm:justify-between h-auto sm:h-full">
        <section className="w-1/2 sm:w-auto">
          <ul className="flex flex-row sm:flex-col justify-around sm:justify-start sm:gap-8">
            {topLinks.map((link, index) => (
              <Link
                key={index}
                href={link.route}
                className={
                  "flex flex-col sm:flex-row gap-2 sm:gap-3 items-center hover:text-action" +
                  " transition-all duration-300" +
                  (pathname === link.route ? " active" : "")
                }
              >
                {link.icon}{" "}
                <span className="text-sm sm:text-base hidden sm:block">
                  {link.title}
                </span>
              </Link>
            ))}
          </ul>
        </section>
        <section className="w-1/2 sm:w-auto">
          <ul className="flex flex-row sm:flex-col justify-around sm:justify-start sm:gap-8">
            <div className="absolute sm:relative right-4 sm:right-auto top-4 sm:top-auto block">
              <DarkModeToggle size={"s"} />
            </div>
            {bottomLinks.map((link, index) => (
              <Link
                key={index}
                href={link.route}
                className="flex gap-3 items-center hover:text-action transition-all duration-300"
              >
                {link.icon}{" "}
                <span className="text-sm sm:text-base hidden sm:block">
                  {link.title}
                </span>
              </Link>
            ))}

            <SignOutButton>
              <div className="cursor-pointer flex gap-3 items-center hover:text-action hover:font-bold transition-all duration-300">
                <CgLogOff size={20} />{" "}
                <span className="hidden sm:block">Logout</span>
              </div>
            </SignOutButton>
          </ul>
        </section>
      </div>
    </nav>
  );
};

export default DashboardNavigation;
