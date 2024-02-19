"use client";

import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";

import Link from "next/link";
import { observer } from "mobx-react";

import { defaultUser } from "@/data/defaultUser";
import { ButtonsLookup } from "@/data/ButtonsLookup";
import { getButtonStyleIndex } from "@/utility/generalUtils";

const Layout09 = ({ previewWindow = false, userData = defaultUser }) => {
  const { username, bio, links, palette } = userData;

  return (
    <main
      className={`flex flex-col items-center justify-center h-screen min-h-fit bg-stone-700 font-barlowCondensed text-primary-dark bg-cover bg-center`}
      style={{
        backgroundImage: `url(${userData.images || ""})`,
      }}
    >
      <section className="pt-8 pb-0 flex flex-col items-center justify-center rounded-xl w-5/6 max-w-3xl h-max bg-white/60 text-center gap-6 z-10 overflow-hidden">
        <h1
          className="font-bold uppercase text-xl md:text-5xl text-center"
          style={{ color: palette.mainText }}
        >
          @{userData.username}
        </h1>
        <p
          className="mb-2 text-base md:text-xl max-w-xs"
          style={{ color: palette.subText }}
        >
          {userData.bio}
        </p>

        {/* Links */}
        <article
          className={`mb-2 pt-4 pb-8 flex flex-col max-h-[30dvh] font-sans text-base md:text-xl overflow-y-auto ${
            ButtonsLookup[getButtonStyleIndex(userData.button_style)]
              .uniqueClasses
          }`}
        >
          {userData.links &&
            userData.links.map((link, index) => {
              return (
                link.public &&
                ButtonsLookup[
                  getButtonStyleIndex(userData.button_style)
                ].component(link.url, link.title, palette, index)
              );
            })}
        </article>
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
