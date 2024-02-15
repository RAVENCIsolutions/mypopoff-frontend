"use client";

import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";

import Link from "next/link";
import { observer } from "mobx-react";

import { defaultUser } from "@/data/defaultUser";

const Layout09 = ({ previewWindow = false, userData = defaultUser }) => {
  const { username, bio, links, palette } = userData;

  return (
    <main className="flex flex-col items-center justify-center gap-8  h-screen min-h-fit bg-stone-700 font-barlowCondensed text-primary-dark bg-[url(/images/templates/business-card_background.jpg)] bg-cover bg-center">
      <section className="px-20 py-14 flex flex-col items-center justify-center rounded-xl w-5/6 max-w-3xl h-max bg-white/60 text-center gap-6 z-10">
        <h1 className="font-bold uppercase text-3xl md:text-5xl text-center tracking-wider">
          username
        </h1>
        <p className="mb-4 text-lg md:text-xl max-w-xs">
          This is a small block of text about the user who owns this particular
          profile.
        </p>

        {/* Links */}
        <ul className="mb-6 flex flex-col gap-6 items-center w-full font-sans text-base md:text-xl">
          {sampleLinks.map((link, index) => (
            <Link
              key={index}
              className="cursor-pointer pt-2 pb-2.5 px-3 md:px-5 w-full bg-rose-500 hover:bg-white border-2 border-transparent hover:border-blue-900 rounded-lg font-light text-white hover:text-blue-900 hover:font-medium transition-all duration-300"
              href={link.url}
            >
              <li>{link.title}</li>
            </Link>
          ))}
        </ul>
        {/* Social Media */}
      </section>
      <section className="flex flex-row gap-4">
        <BiLogoFacebookCircle
          size={30}
          className="cursor-pointer text-white hover:scale-110 transition-all duration-300"
        />
        <BiLogoInstagramAlt
          size={30}
          className="cursor-pointer text-white hover:scale-110 transition-all duration-300"
        />
        <BiLogoTwitch
          size={30}
          className="cursor-pointer text-white hover:scale-110 transition-all duration-300"
        />
      </section>

      <footer className="absolute bottom-6 text-base text-white/80 z-20">
        Copyright © {new Date().getFullYear()}. My Pop Off
      </footer>
    </main>
  );
};

export default Layout09;
