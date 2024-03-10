"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  CgCloseR,
  CgLogOff,
  CgMenuBoxed,
  CgPerformance,
  CgUser,
  CgWebsite,
} from "react-icons/cg";
import { BiSolidUserCircle } from "react-icons/bi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { removeFromStorage } from "@/utility/localStorageUtils";
import { ImCog } from "react-icons/im";
import { useRouter } from "next/navigation";

const accountLinks = [
  {
    id: 1,
    title: "Dashboard",
    href: "/me/dashboard",
    icon: <CgPerformance size={20} />,
  },
  // { id: 2, title: "Links", href: "/me/links", icon: <CgWebsite size={20} /> },
  // {
  //   id: 3,
  //   title: "Customise",
  //   href: "/me/customise",
  //   icon: <RiPaletteLine size={20} />,
  // },
  // { id: 4, title: "Account", href: "/me/account", icon: <CgUser size={20} /> },
  { id: 5, title: "Settings", href: "/me/settings", icon: <ImCog size={18} /> },
];

const NavBar = ({ session }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAccountsMenu, setOpenAccountsMenu] = useState(false);

  const router = useRouter();

  useEffect(() => {
    menuOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <nav className="relative my-4 md:my-auto md:mt-7 md:mb-4 mx-auto px-5 flex items-center justify-between w-full z-10">
      {menuOpen && (
        <div
          className="block xs:hidden absolute -top-10 left-0 w-screen h-screen bg-primary-light/50 dark:bg-primary-dark/50 z-20"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div
        className={
          "absolute xs:relative px-5 pt-20 pb-10 xs:p-0 -top-4 xs:top-0 right-0 flex flex-col xs:flex-row items-start xs:items-center justify-start xs:justify-between gap-3 xs:gap-0 bg-secondary-light dark:bg-secondary-light xs:bg-transparent xs:dark:bg-transparent xs:h-auto w-full max-w-full text-primary-dark dark:text-primary-light text-lg xs:text-base transition-all duration-300 z-50 xs:z-0 " +
          (menuOpen ? "translate-y-0" : "-translate-y-full xs:translate-y-0")
        }
      >
        <ul className="mt-0 xs:mt-0 flex flex-col xs:flex-row gap-3">
          <li>
            <Link
              href={`/`}
              className={`hover:text-action  transition-all duration-300`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={`/explore`}
              className={`hover:text-action transition-all duration-300`}
            >
              Explore
            </Link>
          </li>
        </ul>

        <div
          className={`block xs:hidden h-[1px] w-full bg-primary-dark/30`}
        ></div>

        <ul className="mb-0 flex flex-col xs:flex-row items-start xs:items-center gap-3 w-full xs:w-auto text-primary-dark dark:text-primary-light">
          {session ? (
            <>
              {/* Authenticated */}
              <li className={`group relative w-full`}>
                <div
                  className={`cursor-pointer hidden xs:block`}
                  onClick={() => setOpenAccountsMenu(!openAccountsMenu)}
                >
                  <BiSolidUserCircle className={`text-action`} size={32} />
                </div>
                <section
                  className={`p-0 xs:p-4 relative xs:absolute flex flex-col items-start gap-3 xs:top-10 right-0 w-full xs:w-auto rounded-lg bg-transparent xs:bg-white transition-all duration-300 ${
                    openAccountsMenu ? "block" : "block xs:hidden xs:z-50"
                  }`}
                >
                  {accountLinks.map((link, index) => (
                    <article
                      key={`account-link-${index}`}
                      className={`inline-block hover:text-action transition-all duration-300`}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3`}
                      >
                        {link.icon} {link.title}
                      </Link>
                    </article>
                  ))}

                  <div
                    className={`justify-self-stretch h-[1px] w-full bg-primary-dark/30`}
                  ></div>

                  <article
                    key={`account-link-99`}
                    className={`hover:text-action transition-all duration-300`}
                  >
                    <p
                      className={`cursor-pointer flex items-center gap-3 text-base`}
                      onClick={async () => {
                        const supabase = createClientComponentClient();
                        await supabase.auth.signOut();
                        removeFromStorage("userData");
                        removeFromStorage("lastFetch");
                        router.refresh();
                      }}
                    >
                      <CgLogOff size={20} /> Log Out
                    </p>
                  </article>
                </section>
              </li>
            </>
          ) : (
            <>
              {/* Not Authenticated */}
              <li>
                <Link
                  href="/auth/login"
                  className={`hover:text-action  transition-all duration-300`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 px-4 bg-action hover:bg-primary-dark hover:dark:bg-primary-light rounded-full font-medium text-primary-light dark:text-primary-dark hover:text-action hover:dark:text-action transition-all duration-300`}
                  href="/auth/register"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="relative xs:absolute xs:left-1/2 xs:-translate-x-1/2 xs:w-auto z-50">
        <p className="text-lg text-primary-dark dark:text-primary-light font-bold font-display xs:z-50">
          <Link href="/">My Pop Off</Link>
        </p>
      </div>

      <div
        className={`block xs:hidden cursor-pointer xs:top-4 text-primary-dark dark:text-primary-light z-50 transition-all duration-300 z-50`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <CgCloseR
          size={24}
          className={`absolute top-[0.2rem] ml-[0.2rem] ${
            menuOpen ? "opacity-100" : "opacity-0"
          } -z-10 transition-all duration-300`}
          onClick={() => setMenuOpen(false)}
        />
        <CgMenuBoxed
          size={30}
          className={`${
            menuOpen ? "scale-150 opacity-0" : "opacity-100"
          } z-20 transition-all duration-300`}
          onClick={() => setMenuOpen(true)}
        />
      </div>
    </nav>
  );
};

export default NavBar;
