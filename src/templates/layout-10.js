import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

import "../app/(public)/globals.scss";

const Layout10 = () => {
  const sampleLinks = [
    { url: "/", title: "Book a Free Consultation" },
    { url: "/", title: "My Website" },
    { url: "/", title: "My Portfolio" },
    { url: "/", title: "Email Me" },
  ];

  return (
    <main
      className={`px-2 sm:px-10 py-10 flex items-center justify-center h-screen min-h-fit bg-purple-700`}
    >
      <article className="p-10 flex flex-col items-center bg-white border-2 border-black rounded-xl w-10/12 max-w-sm">
        <section className="mb-8">
          <h2
            className={`font-black text-3xl text-center tracking-wide text-purple-700`}
          >
            Hello!
          </h2>
          <h1 className="text-xl text-black">My name is username</h1>
        </section>

        {/* Links */}
        <section className="mb-16 w-full">
          <ul className="mx-auto flex flex-col gap-8 items-center text-center w-full font-sans">
            {sampleLinks.map((link, index) => (
              <Link
                key={index}
                className={`cursor-pointer pt-3 pb-2 px-5 w-full max-w-xs bg-purple-700 border-2 border-black rounded-md text-white font-bold tracking-wider shadow-neobrutalism hover:translate-x-1 hover:translate-y-1 transition-all duration-200`}
                href={link.url}
              >
                <li>{link.title}</li>
              </Link>
            ))}
          </ul>
        </section>

        {/* Social Media */}
        <section className="flex flex-row gap-4">
          <BiLogoFacebookCircle size={30} className="text-purple-700" />
          <BiLogoInstagramAlt size={30} className="text-purple-700" />
          <BiLogoTwitch size={30} className="text-purple-700" />
        </section>
      </article>

      <footer className="absolute bottom-3 text-sm text-white">
        Copyright © {new Date().getFullYear()}. My Pop Off
      </footer>
    </main>
  );
};

export default Layout10;
