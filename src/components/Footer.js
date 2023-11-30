import DarkModeToggle from "@/components/DarkModeToggle";
import Link from "next/link";
import { CgCoffee } from "react-icons/cg";

const Footer = () => {
  return (
    <footer className="mt-4 mx-auto px-5 lg:px-14 w-full max-w-windowed">
      <section className="flex flex-col-reverse sm:flex-row justify-between items-center">
        <ul className="py-4 sm:py-8 flex flex-row justify-between sm:justify-start gap-0 sm:gap-10 w-full font-medium text-secondary-dark dark:text-secondary-light">
          <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
            <a>Explore</a>
          </li>
          {/*<li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">*/}
          {/*  Blog*/}
          {/*</li>*/}
          <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
            Support
          </li>
        </ul>

        <DarkModeToggle />
      </section>

      <section className="py-4 sm:py-8 flex flex-col-reverse sm:flex-row items-center justify-between max-w-windowed border-t-2 border-secondary-dark dark:border-secondary-light">
        <p className="flex gap-2 text-sm text-secondary-dark dark:text-secondary-light min-w-fit">
          Start Getting Noticed
          <CgCoffee
            size={18}
            className="text-secondary-dark dark:text-secondary-light hover:text-action hover:dark:text-action transition-all duration-200"
          />
          My Pop Off
        </p>
        <ul className="pb-6 sm:pb-0 flex flex-row justify-between sm:justify-end gap-0 sm:gap-10 w-full font-medium text-secondary-dark dark:text-secondary-light">
          <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
            <Link href="/privacy-policy">Privacy</Link>
          </li>
          <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
            <Link href="/terms-of-service">Terms</Link>
          </li>
          <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
            <Link href="/cookies-policy">Cookies</Link>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
