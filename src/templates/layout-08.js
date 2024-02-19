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

const Layout08 = ({ previewWindow = false, userData = defaultUser }) => {
  return (
    <main
      className={`flex items-center justify-center h-screen min-h-fit bg-stone-700 font-barlowCondensed text-blue-900 bg-cover bg-center overflow-hidden`}
      style={{
        backgroundImage: `url(${userData.images || ""})`,
      }}
    >
      <section className="pt-8 pb-14 flex flex-col items-center justify-center w-5/6 max-w-3xl h-full bg-white/90 text-center gap-6 z-10">
        <article
          className={`px-6 md:px-20 flex flex-col justify-between items-center max-h-full overflow-y-auto`}
        >
          <h1 className="font-bold text-xl md:text-4xl text-center tracking-wide">
            @{userData.username}
          </h1>
          <p className="mb-4 text-lg md:text-2xl w-full md:max-w-xs">
            {userData.bio}
          </p>

          {/* Links */}
          <section
            className={`mb-6 flex flex-col items-center w-full font-sans text-base md:text-xl ${
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
                  ].component(link.url, link.title, userData.palette, index)
                );
              })}
          </section>
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
        Copyright © {new Date().getFullYear()}.{" "}
        <Link href={"/"}>My Pop Off</Link>
      </footer>
    </main>
  );
};

export default Layout08;
