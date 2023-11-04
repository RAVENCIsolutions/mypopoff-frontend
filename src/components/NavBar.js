"use client";

import { useEffect, useState } from "react";
import { CgCloseR, CgMenuBoxed } from "react-icons/cg";
import Link from "next/link";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    menuOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <nav className="relative my-10 px-5 md:px-14 flex items-center w-full max-w-windowed">
      {/*<DarkModeToggle />*/}
      {menuOpen ? (
        <div
          className="block md:hidden absolute -top-10 left-0 w-screen h-screen bg-primary-light/50 dark:bg-primary-dark/50 z-20"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <div
        className={
          "absolute md:relative pl-6 pr-20 md:p-0 -top-10 md:top-0 right-0 flex flex-col md:flex-row items-start" +
          " md:items-center justify-start md:justify-between gap-8 md:gap-0 bg-secondary-dark" +
          " dark:bg-secondary-light md:bg-transparent md:dark:bg-transparent h-screen md:h-auto w-max md:w-full" +
          " text-primary-dark" +
          " dark:text-primary-light text-xl md:text-base transition-all duration-300 z-50 " +
          (menuOpen
            ? "translate-x-0"
            : "translate-x-full" + " md:translate-x-0")
        }
      >
        <div className="block md:hidden cursor-pointer absolute -left-12 top-7 text-primary-dark dark:text-primary-light z-50">
          {menuOpen ? (
            <CgCloseR size={26} onClick={() => setMenuOpen(false)} />
          ) : (
            <CgMenuBoxed size={30} onClick={() => setMenuOpen(true)} />
          )}
        </div>

        <ul className="mt-20 md:mt-0">
          <li>Explore</li>
        </ul>

        <ul className="mb-10 md:mb-0 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-4 text-primary-dark dark:text-primary-light">
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
        </ul>
      </div>

      <div className="md:absolute flex flex-row items-center justify-between top-1/2 left-5 md:left-1/2 -translate-y-1/2 md:-translate-x-1/2 w-full md:w-auto z-20">
        <p className="text-lg text-primary-dark dark:text-primary-light font-bold font-display">
          <Link href="/">My Pop Off</Link>
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
