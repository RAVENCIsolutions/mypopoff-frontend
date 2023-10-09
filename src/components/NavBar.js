"use client";

import { useState } from "react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative my-10 px-5 md:px-14 flex items-center w-full max-w-windowed">
      {/*<DarkModeToggle />*/}
      {menuOpen ? (
        <div
          className="block md:hidden absolute -top-10 left-0 w-screen h-screen bg-primary-dark/50 z-30"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <div
        className={
          "absolute md:relative px-6 md:p-0 top-10 md:top-0 right-0 flex flex-col md:flex-row items-start" +
          " md:items-center justify-start md:justify-between gap-6 md:gap-0 w-full text-primary-dark" +
          " dark:text-primary-light bg-secondary-light md:bg-transparent h-fit md:h-auto w-max md:w-full" +
          " overflow-hidden transition-all duration-300 z-40 " +
          (menuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0")
        }
      >
        <ul className="mt-10 md:mt-0">
          <li>Explore</li>
        </ul>

        <ul className="mb-10 md:mb-0 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-2 text-primary-dark dark:text-primary-light">
          <li>Login</li>
          <li>
            <button className="py-2 px-4 bg-action rounded-full font-medium text-primary-light dark:text-primary-dark">
              Free Account
            </button>
          </li>
        </ul>
      </div>

      <div className="md:absolute flex flex-row items-center top-1/2 left-5 md:left-1/2 -translate-y-1/2 md:-translate-x-1/2 z-50">
        <p
          className="text-lg text-primary-dark dark:text-primary-light font-bold font-display"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          My Pop Off
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
