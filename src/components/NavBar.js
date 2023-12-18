"use client";

import { useEffect, useState } from "react";
import { CgCloseR, CgMenuBoxed } from "react-icons/cg";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { BiSolidUser, BiSolidUserCircle } from "react-icons/bi";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    menuOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <nav className="relative my-10 mx-auto px-5 lg:px-14 flex items-center w-full max-w-windowed">
      {/*<DarkModeToggle />*/}
      {menuOpen ? (
        <div
          className="block lg:hidden absolute -top-10 left-0 w-screen h-screen bg-primary-light/50 dark:bg-primary-dark/50 z-20"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <div
        className={
          "absolute lg:relative pl-6 sm:pr-20 lg:p-0 -top-10 lg:top-0 right-0 flex flex-col lg:flex-row items-start" +
          " lg:items-center justify-start lg:justify-between gap-8 lg:gap-0 bg-secondary-dark" +
          " dark:bg-secondary-light lg:bg-transparent lg:dark:bg-transparent h-screen lg:h-auto w-full sm:w-max" +
          " lg:w-full max-w-full text-primary-dark dark:text-primary-light text-xl lg:text-base transition-all" +
          " duration-300 z-50 lg:z-0 " +
          (menuOpen
            ? "translate-x-0"
            : "translate-x-full" + " lg:translate-x-0")
        }
      >
        <div
          className={`block lg:hidden cursor-pointer absolute ${
            menuOpen ? "left-5 sm:-left-12" : "-left-12"
          } top-7 text-primary-dark dark:text-primary-light z-50 transition-all duration-300`}
        >
          {menuOpen ? (
            <CgCloseR size={26} onClick={() => setMenuOpen(false)} />
          ) : (
            <CgMenuBoxed size={30} onClick={() => setMenuOpen(true)} />
          )}
        </div>

        <ul className="mt-20 lg:mt-0">
          <li>Explore</li>
        </ul>

        <ul className="mb-10 lg:mb-0 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-4 text-primary-dark dark:text-primary-light">
          <SignedIn>
            <li>
              <Link href={"/me/dashboard"}>
                <BiSolidUserCircle className={`text-action`} size={32} />
              </Link>
            </li>
          </SignedIn>

          <SignedOut>
            <li>
              <Link
                href="/login"
                className="font-normal hover:font-bold transition-all duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                className="py-2 px-4 bg-action rounded-full font-medium text-primary-light dark:text-primary-dark"
                href="/register"
              >
                Free Account
              </Link>
            </li>
          </SignedOut>
        </ul>
      </div>

      <div className="lg:absolute flex flex-row items-center justify-between left-5 lg:left-1/2 lg:-translate-x-1/2 w-full lg:w-auto">
        <p className="text-lg text-primary-dark dark:text-primary-light font-bold font-display lg:z-50">
          <Link href="/">My Pop Off</Link>
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
