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
      route: "/me/customise",
      icon: <CgUser size={20} />,
    },
    {
      title: "Settings",
      alt: "Settings for application preferences and configurations",
      route: "/me/customise",
      icon: <ImCog size={18} />,
    },
  ];

  return (
    <nav className="pb-6 flex flex-col justify-between w-1/6 min-w-max text-primary-dark dark:text-primary-light font-light font-base">
      <section className="flex flex-col">
        <p className="pb-12 text-lg text-action dark:text-action font-bold font-display">
          <Link href="/">My Pop Off</Link>
        </p>
        <ul className="flex flex-col gap-8">
          {topLinks.map((link) => (
            <Link
              href={link.route}
              className={
                "flex gap-3 items-center hover:text-action hover:font-bold transition-all duration-300" +
                (pathname === link.route ? " active" : "")
              }
            >
              {link.icon} {link.title}
            </Link>
          ))}
        </ul>
      </section>
      <section>
        <ul className="flex flex-col gap-8">
          <DarkModeToggle size={"s"} />
          {bottomLinks.map((link) => (
            <Link
              href={link.route}
              className="flex gap-3 items-center hover:text-action hover:font-bold transition-all duration-300"
            >
              {link.icon} {link.title}
            </Link>
          ))}

          <SignOutButton>
            <div className="cursor-pointer flex gap-3 items-center hover:text-action hover:font-bold transition-all duration-300">
              <CgLogOff size={20} /> Logout
            </div>
          </SignOutButton>
        </ul>
      </section>
    </nav>
  );
};

export default DashboardNavigation;
