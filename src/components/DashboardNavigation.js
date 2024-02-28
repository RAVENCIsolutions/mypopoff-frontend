"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { observer } from "mobx-react";
import { useClerk, useUser } from "@clerk/nextjs";

import { CgPerformance, CgUser, CgWebsite } from "react-icons/cg";
import { RiPaletteLine } from "react-icons/ri";

import "@/app/me/dashboard.scss";
import userStore from "@/stores/UserStore";
import { ImCog } from "react-icons/im";

const DashboardNavigation = observer(() => {
  const pathname = usePathname();

  const { user, isSignedIn, isLoaded } = useUser();

  const topLinks = [
    {
      title: "Dashboard",
      alt: "Dashboard where you can overview all your activities and settings",
      route: "/me/dashboard",
      icon: <CgPerformance size={20} />,
    },
    {
      title: "My Links",
      alt: "Add and manage your favourite links for your Pop Off",
      route: "/me/my-links",
      icon: <CgWebsite size={20} />,
    },
    {
      title: "Customise",
      alt: "Customise the look and feel of your Pop Off",
      route: "/me/customise",
      icon: <RiPaletteLine size={20} />,
    },
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

  // const bottomLinks = [];

  useEffect(() => {
    const handleUser = async () => {
      return await userStore.loadUserData(user.id);
    };

    if (isSignedIn) {
      handleUser().then((data) => {
        userStore.completeLoad();
      });
    }
  }, [user, isSignedIn, isLoaded]);

  return (
    <nav className="mb-4 sm:mb-0 flex flex-col h-full text-primary-dark dark:text-primary-light font-light">
      <section className="flex-grow flex flex-row sm:flex-col justify-between h-auto sm:h-full">
        <ul className="relative flex flex-row sm:flex-col justify-between sm:justify-start sm:gap-8 w-full">
          {topLinks.map((link, index) => (
            <Link
              key={index}
              href={link.route}
              className={
                `flex-grow flex justify-center sm:justify-start items-center gap-3 hover:text-action` +
                " transition-all duration-300" +
                (pathname === link.route ? " active" : "")
              }
            >
              {link.icon}{" "}
              <span className="hidden sm:block text-sm">{link.title}</span>
            </Link>
          ))}
        </ul>
      </section>
    </nav>
  );
});

export default DashboardNavigation;
