import DarkModeToggle from "@/components/DarkModeToggle";
import Link from "next/link";
import { CgCoffee } from "react-icons/cg";

const Footer = () => {
  return (
    <footer className="mx-auto px-5 lg:px-14 pt-8 pb-4 w-full max-w-windowed">
      <section className="py-4 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
        <ul className="flex flex-col xs:flex-row justify-between sm:justify-start gap-4 sm:gap-10 w-full font-medium text-secondary-dark dark:text-secondary-light text-center">
          <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
            <Link href={"/explore"}>Explore</Link>
          </li>
          {/*<li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">*/}
          {/* Blog */}
          {/*</li>*/}
          <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
            <Link href={`/support`}>Support</Link>
          </li>
        </ul>

        <div className={`relative xs:absolute sm:relative`}>
          <DarkModeToggle size={"s"} />
        </div>
      </section>

      <section className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-between border-t-[1.5px] border-secondary-dark dark:border-secondary-light">
        <p className="flex gap-2 text-sm text-secondary-dark dark:text-secondary-light min-w-fit">
          Start Getting Noticed
          <CgCoffee
            size={18}
            className="text-secondary-dark dark:text-secondary-light hover:text-action hover:dark:text-action transition-all duration-200"
          />
          <Link href={"/"}>My Pop Off</Link>
        </p>
        <ul className="pb-6 sm:pb-0 flex flex-col xs:flex-row justify-between sm:justify-end gap-4 sm:gap-10 w-full font-medium text-secondary-dark dark:text-secondary-light text-center">
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
