"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CgCloseR, CgMenuBoxed } from "react-icons/cg";
import { BiSolidUserCircle } from "react-icons/bi";

const NavBar = ({ session }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    menuOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <nav className="relative my-4 md:my-auto md:mt-7 md:mb-4 mx-auto px-5 flex items-center justify-between w-full">
      {menuOpen ? (
        <div
          className="block xs:hidden absolute -top-10 left-0 w-screen h-screen bg-primary-light/50 dark:bg-primary-dark/50 z-20"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <div
        className={
          "absolute xs:relative px-5 pt-20 pb-10 xs:p-0 -top-4 xs:top-0 right-0 flex flex-col xs:flex-row items-start xs:items-center justify-start xs:justify-between gap-6 xs:gap-0 bg-secondary-light dark:bg-secondary-light xs:bg-transparent xs:dark:bg-transparent xs:h-auto w-full max-w-full text-primary-dark dark:text-primary-light text-lg xs:text-base transition-all duration-300 z-50 xs:z-0 " +
          (menuOpen ? "translate-y-0" : "-translate-y-full xs:translate-y-0")
        }
      >
        <ul className="mt-0 xs:mt-0 flex flex-col xs:flex-row gap-6">
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
              className={`hover:text-action  transition-all duration-300`}
            >
              Explore
            </Link>
          </li>
        </ul>

        <ul className="mb-0 flex flex-col xs:flex-row items-start xs:items-center gap-6 text-primary-dark dark:text-primary-light">
          {session ? (
            <>
              {/* Authenticated */}
              <li>
                <Link href={"/me"}>
                  <div className={`hidden xs:block`}>
                    <BiSolidUserCircle className={`text-action`} size={32} />
                  </div>
                  <div className={`block xs:hidden`}>
                    <p className={`font-bold text-action`}>My Dashboard</p>
                  </div>
                </Link>
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
