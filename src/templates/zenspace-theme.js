import {
  BiCircle,
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
  BiSolidCircle,
} from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const ZenSpaceTheme = () => {
  const [isHovering, setIsHovering] = useState(null);

  const sampleLinks = [
    { url: "/", title: "Book a Retreat" },
    { url: "/", title: "My Website" },
    { url: "/", title: "My Portfolio" },
    { url: "/", title: "Email Me" },
  ];

  return (
    <main className="p-3 flex flex-col items-center justify-center h-screen min-h-fit bg-stone-100 font-amatic font-normal">
      {/* Image */}
      <section className="mb-20">
        <h1 className="text-4xl md:text-6xl text-center">
          Hi, I'm <span className="text-rose-600">username</span>
        </h1>
      </section>

      {/* Links */}
      <section className="mb-10 w-full">
        <ul className="mx-auto flex flex-col items-center gap-8 w-full">
          {sampleLinks.map((link, index) => (
            <Link
              key={index}
              className="cursor-pointer transition-all duration-300"
              href={link.url}
            >
              <li
                className="flex items-center gap-2 text-xl md:text-3xl font-bold hover:text-rose-600 transition-all duration-500"
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
              >
                {isHovering === index ? (
                  <BiSolidCircle className="text-xs md:text-base text-rose-600 transition-all duration-1000" />
                ) : (
                  <BiCircle className="text-xs md:text-base text-stone-800" />
                )}{" "}
                {link.title}
              </li>
            </Link>
          ))}
        </ul>
      </section>

      <footer className="absolute bottom-3 text-lg text-stone-500">
        Copyright © {new Date().getFullYear()}.{" "}
        <Link href={"/"}>My Pop Off</Link>
      </footer>
    </main>
  );
};

export default ZenSpaceTheme;
