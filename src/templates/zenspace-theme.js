import {
  BiCircle,
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
  BiSolidCircle,
} from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

const ZenSpaceTheme = () => {
  const sampleLinks = [
    { url: "/", title: "Book a Retreat" },
    { url: "/", title: "My Website" },
    { url: "/", title: "My Portfolio" },
    { url: "/", title: "Email Me" },
  ];

  return (
    <main className="flex flex-col items-center justify-center h-screen min-h-fit bg-stone-100 font-amatic font-normal">
      {/* Image */}
      <section className="mb-20">
        <h1 className="text-4xl text-center">
          Hi, I'm <span className="text-rose-600">username</span>
        </h1>
      </section>

      {/* Links */}
      <section className="mb-10 w-40">
        <ul className="mx-auto flex flex-col gap-8 w-full max-w-xs">
          {sampleLinks.map((link, index) => (
            <Link
              key={index}
              className="cursor-pointer transition-all duration-300"
              href={link.url}
            >
              <li className="flex items-center gap-2 text-lg hover:text-rose-600 hover:font-bold transition-all duration-500">
                <BiCircle size={16} className="text-stone-800" /> {link.title}
              </li>
            </Link>
          ))}
        </ul>
      </section>

      <footer className="absolute bottom-3 text-sm text-stone-500">
        Copyright © {new Date().getFullYear()}. My Pop Off
      </footer>
    </main>
  );
};

export default ZenSpaceTheme;
