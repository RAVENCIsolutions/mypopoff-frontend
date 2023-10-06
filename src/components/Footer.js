"use client";

import DarkModeToggle from "@/utils/DarkModeToggle";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mx-auto px-14 w-full max-w-windowed">
      <section className="flex flex-row justify-between items-center">
        <ul className="py-8 flex flex-row justify-center gap-10 font-medium text-secondary-dark dark:text-secondary-light">
          <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
            <a>Explore</a>
          </li>
          <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
            Blog
          </li>
          <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
            Support
          </li>
        </ul>

        <DarkModeToggle />
      </section>

      <section className="py-8 flex items-center justify-between max-w-windowed border-t-2 border-secondary-dark dark:border-secondary-light">
        <p className="text-sm text-secondary-dark dark:text-secondary-light">
          Copyright © 2023. My Pop Off
        </p>
        <ul className="flex flex-row gap-10 font-medium text-secondary-dark dark:text-secondary-light">
          <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
            <Link href="/terms">Terms</Link>
          </li>
          <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
            <Link href="/privacy">Privacy</Link>
          </li>
          <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
            <Link href="/cookies">Cookies</Link>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
