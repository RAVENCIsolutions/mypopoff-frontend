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
      <section className="pt-8 pb-0 flex flex-col items-center justify-center rounded-xl w-5/6 max-w-3xl h-max bg-white/60 text-center gap-6 z-10 overflow-hidden">
        <h1 className="font-bold uppercase text-xl md:text-5xl text-center">
          @{username}
        </h1>
        <p className="mb-2 text-lg md:text-xl max-w-xs">{bio}</p>

        {/* Links */}
        <ul className="mb-2 px-4 md:px-20 pt-4 pb-8 flex flex-col gap-4 items-center w-full max-h-[30dvh] font-sans text-base md:text-xl overflow-y-auto">
          {userData.links &&
            userData.links.map((link, index) => (
              <Link
                href={link.url}
                key={`link-${index}`}
                className={`pt-1.5 pb-1 px-5 mx-auto min-w-44 max-w-full rounded-full hover:opacity-80 hover:shadow-[3px_3px_5px_rgba(0,0,0,0.25)] hover:scale-105 text-center transition-all duration-300`}
                style={{
                  backgroundColor: palette.buttonMain,
                  color: palette.buttonText,
                }}
              >
                {link.title}
              </Link>
            ))}
        </ul>
      </section>

      {/* Social Media */}
      {/*<section className="flex flex-row gap-4">*/}
      {/*  <BiLogoFacebookCircle*/}
      {/*    size={30}*/}
      {/*    className="cursor-pointer text-white hover:scale-110 transition-all duration-300"*/}
      {/*  />*/}
      {/*  <BiLogoInstagramAlt*/}
      {/*    size={30}*/}
      {/*    className="cursor-pointer text-white hover:scale-110 transition-all duration-300"*/}
      {/*  />*/}
      {/*  <BiLogoTwitch*/}
      {/*    size={30}*/}
      {/*    className="cursor-pointer text-white hover:scale-110 transition-all duration-300"*/}
      {/*  />*/}
      {/*</section>*/}

      <footer className="absolute bottom-6 text-base text-white/80 z-20">
        Copyright © {new Date().getFullYear()}.{" "}
        <Link href={"/"}>My Pop Off</Link>
      </footer>
    </main>
  );
};

export default Layout09;
