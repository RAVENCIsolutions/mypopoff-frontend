"use client";

import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";

import Link from "next/link";
import { observer } from "mobx-react";

import { defaultUser } from "@/data/defaultUser";

const Layout08 = ({ previewWindow = false, userData = defaultUser }) => {
  const { username, bio, links, palette } = userData;

  return (
    <main className="flex items-center justify-center h-screen min-h-fit bg-stone-700 font-barlowCondensed text-blue-900 bg-[url(/images/templates/bannerific_background.jpg)] bg-cover bg-center overflow-hidden">
      <section className="pt-8 pb-14 flex flex-col items-center justify-center w-5/6 max-w-3xl h-full bg-white/90 text-center gap-6 z-10">
        <article
          className={`px-6 md:px-20 flex flex-col justify-between items-center max-h-full overflow-y-auto`}
        >
          <h1 className="font-bold text-xl md:text-4xl text-center tracking-wide">
            @{username}
          </h1>
          <p className="mb-4 text-lg md:text-2xl w-full md:max-w-xs">{bio}</p>

          {/* Links */}
          <ul className="mb-6 flex flex-col gap-6 items-center w-full font-sans text-base md:text-xl">
            {userData.links &&
              userData.links.map((link, index) => (
                <Link
                  href={link.url}
                  key={`link-${index}`}
                  className={`pt-1.5 pb-1 px-5 mx-auto w-full md:min-w-44 rounded-full hover:opacity-80 hover:shadow-[3px_3px_5px_rgba(0,0,0,0.25)] hover:scale-105 text-center transition-all duration-300`}
                  style={{
                    backgroundColor: palette.buttonMain,
                    color: palette.buttonText,
                  }}
                >
                  {link.title}
                </Link>
              ))}
          </ul>
          {/* Social Media */}
          {/*<section className="flex flex-row gap-4">*/}
          {/*  <BiLogoFacebookCircle*/}
          {/*    size={30}*/}
          {/*    className="cursor-pointer text-blue-900 hover:scale-110 transition-all duration-300"*/}
          {/*  />*/}
          {/*  <BiLogoInstagramAlt*/}
          {/*    size={30}*/}
          {/*    className="cursor-pointer text-blue-900 hover:scale-110 transition-all duration-300"*/}
          {/*  />*/}
          {/*  <BiLogoTwitch*/}
          {/*    size={30}*/}
          {/*    className="cursor-pointer text-blue-900 hover:scale-110 transition-all duration-300"*/}
          {/*  />*/}
          {/*</section>*/}
        </article>
      </section>

      <footer className="absolute bottom-3 text-base font-semibold text-blue-900/80 z-20">
        Copyright © {new Date().getFullYear()}. My Pop Off
      </footer>
    </main>
  );
};

export default Layout08;
