"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { observer } from "mobx-react";
import { useClerk, useUser } from "@clerk/nextjs";

import { CgLogOff, CgPerformance, CgUser, CgWebsite } from "react-icons/cg";
import { RiPaletteLine } from "react-icons/ri";

import "@/app/me/dashboard.scss";
import userStore from "@/stores/UserStore";
import DarkModeToggle from "@/components/DarkModeToggle";

const DashboardNavigation = observer(() => {
  const pathname = usePathname();

  const clerkObject = useClerk();
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
  ];

  const bottomLinks = [
    {
      title: "Account",
      alt: "Account to see and manage your account details",
      route: "/me/account",
      icon: <CgUser size={20} />,
    },
    // {
    //   title: "Settings",
    //   alt: "Settings for application preferences and configurations",
    //   route: "/me/settings",
    //   icon: <ImCog size={18} />,
    // },
  ];

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
    <nav className="flex flex-col h-full text-primary-dark dark:text-primary-light font-light">
      <p className="pb-6 sm:pb-12 text-base sm:text-lg text-action dark:text-action font-bold font-display">
        <Link href="/">My Pop Off</Link>
      </p>
      <div className="flex flex-row md:flex-col justify-between h-auto md:h-full">
        <section className="w-3/5 md:w-auto">
          <ul className="relative flex flex-row md:flex-col justify-between md:justify-start sm:gap-8 w-full">
            {topLinks.map((link, index) => (
              <Link
                key={index}
                href={link.route}
                className={
                  `flex-grow flex justify-center md:justify-start items-center gap-3 hover:text-action` +
                  " transition-all duration-300" +
                  (pathname === link.route ? " active" : "")
                }
              >
                {link.icon}{" "}
                <span className="hidden md:block text-sm">{link.title}</span>
              </Link>
            ))}
          </ul>
        </section>
        <section className="w-2/5 md:w-auto">
          <ul className="flex flex-row md:flex-col justify-between md:justify-start sm:gap-8 w-full">
            <div className="absolute md:relative right-4 md:right-auto top-5 md:top-auto block">
              <DarkModeToggle size={"s"} />
            </div>
            {bottomLinks.map((link, index) => (
              <Link
                key={index}
                href={link.route}
                className={
                  `flex-grow flex justify-center md:justify-start items-center gap-3 hover:text-action` +
                  " transition-all duration-300" +
                  (pathname === link.route ? " active" : "")
                }
              >
                {link.icon}{" "}
                <span className="hidden md:block text-sm">{link.title}</span>
              </Link>
            ))}

            <div
              className="cursor-pointer flex-grow flex justify-center md:justify-start items-center gap-3 hover:text-action hover:font-bold transition-all duration-300"
              onClick={async () => {
                clerkObject.signOut().then(async () => {
                  await userStore.logoutUser();
                });
              }}
            >
              <>
                <CgLogOff size={20} />{" "}
                <span className="hidden md:block text-sm">Logout</span>
              </>
            </div>
          </ul>
        </section>
      </div>
    </nav>
  );
});

export default DashboardNavigation;
