"use client";

import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";

import Link from "next/link";
import { observer } from "mobx-react";

import { defaultUser } from "@/data/defaultUser";
import Link07 from "@/templates/links/Link07";

const Layout03 = observer(
  ({ previewWindow = false, userData = defaultUser }) => {
    const { username, bio, links, palette } = userData;

    return (
      <main
        className={`relative ${
          previewWindow ? "h-full" : "h-screen"
        } w-full bg-stone-700 font-barlowCondensed text-white bg-[url(/images/templates/takeMeAway_background.jpg)] bg-cover bg-center overflow-hidden`}
      >
        <div
          className={`absolute block left-0 top-0 ${
            previewWindow ? "w-full h-full" : "w-full h-full"
          } bg-stone-900/70 z-0`}
        ></div>

        <section className="absolute mx-auto flex flex-col items-center justify-between w-full h-full text-center gap-6 z-10 overflow-y-auto">
          <article className={`py-10 flex-grow flex flex-col justify-center`}>
            <h1
              className={`font-bold ${
                previewWindow ? "text-2xl" : "text-2xl md:text-4xl"
              } text-center `}
              style={{ color: palette.mainText }}
            >
              @{username}
            </h1>
            <p
              className={`mb-4 ${
                previewWindow ? "text-base" : "text-base md:text-xl"
              }`}
              style={{ color: palette.subText }}
            >
              {bio}
            </p>

            {/* Links */}
            {/*<ul*/}
            {/*  className={`flex flex-col ${*/}
            {/*    currentButtonStyle.uniqueClasses*/}
            {/*  } w-fit font-sans ${*/}
            {/*    previewWindow*/}
            {/*      ? "mb-2 gap-2 text-base"*/}
            {/*      : "mb-6 gap-6 text-base md:text-xl"*/}
            {/*  }`}*/}
            {/*>*/}
            {/*  {sampleLinks.map((link, index) => {*/}
            {/*    if (currentButtonStyle && currentButtonStyle.component) {*/}
            {/*      return currentButtonStyle.component(*/}
            {/*        link.title,*/}
            {/*        onBoardingStore.onBoardingCurrent.palette,*/}
            {/*        index,*/}
            {/*      );*/}
            {/*    }*/}
            {/*  })}*/}
            {/*</ul>*/}
            <ul className={`flex flex-col gap-3`}>
              {userData.links &&
                userData.links.map((link, index) => (
                  <Link07
                    key={`link-${index}`}
                    title={link.title}
                    url={link.url}
                    palette={palette}
                  />
                ))}
            </ul>

            {/* Social Media */}
            {/*<section className="flex flex-row gap-4">*/}
            {/*  <BiLogoFacebookCircle*/}
            {/*    size={30}*/}
            {/*    className="cursor-pointer text-white/60 hover:text-white transition-all duration-300"*/}
            {/*  />*/}
            {/*  <BiLogoInstagramAlt*/}
            {/*    size={30}*/}
            {/*    className="cursor-pointer text-white/60 hover:text-white transition-all duration-300"*/}
            {/*  />*/}
            {/*  <BiLogoTwitch*/}
            {/*    size={30}*/}
            {/*    className="cursor-pointer text-white/60 hover:text-white transition-all duration-300"*/}
            {/*  />*/}
            {/*</section>*/}
          </article>

          <footer className={`relative text-sm text-white/50`}>
            Copyright © {new Date().getFullYear()}.{" "}
            <Link href={"/"}>My Pop Off</Link>
          </footer>
        </section>
      </main>
    );
  },
);

export default Layout03;
