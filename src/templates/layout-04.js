"use client";

import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";

import Link from "next/link";
import { observer } from "mobx-react";

import { defaultUser } from "@/data/defaultUser";

const Layout04 = observer(
  ({ previewWindow = false, userData = defaultUser }) => {
    const { username, bio, links, palette } = userData;

    return (
      <main
        className={`relative ${
          previewWindow ? "pt-12 pb-4 min-h-full" : "py-6 min-h-screen"
        } flex flex-col justify-between h-fit`}
        style={{ backgroundColor: palette.background, color: palette.mainText }}
      >
        <section className="mx-auto px-4 flex flex-col justify-center items-center text-center">
          <h1
            className={`mb-4 font-newSpirit font-bold ${
              previewWindow ? "text-3xl" : "text-3xl md:text-6xl"
            } text-center`}
          >
            @{username}
          </h1>
          <p
            className={`${
              previewWindow ? "text-base" : "text-base md:text-xl"
            } max-w-xs font-calluna font-light text-center`}
            style={{ color: palette.subText }}
          >
            {bio}
          </p>
        </section>
        <ul
          className={`mx-auto px-4 py-8 flex flex-col items-stretch justify-center min-w-44 max-w-full h-full font-calluna font-semibold ${
            previewWindow ? "gap-3" : "gap-8 md:text-3xl"
          }`}
        >
          {userData.links &&
            userData.links.map((link, index) => (
              <Link
                href={link.url}
                key={`link-${index}`}
                className={`p-1 px-5 mx-2 w-full hover:opacity-80 hover:shadow-[3px_3px_5px_rgba(0,0,0,0.25)] hover:scale-105 text-center transition-all duration-300`}
                style={{
                  backgroundColor: palette.buttonMain,
                  color: palette.buttonText,
                }}
              >
                {link.title}
              </Link>
            ))}
        </ul>

        <footer
          className={`mx-auto ${
            previewWindow
              ? "px-4 gap-1 text-sm"
              : "px-4 md:px-16 gap-1 md:gap-3 text-sm md:text-base"
          } bottom-3 flex flex-col items-center justify-between w-max text-neutral-500`}
        >
          {/* Social Media */}
          {/*<section className="flex flex-row gap-4">*/}
          {/*  <BiLogoFacebookCircle*/}
          {/*    size={24}*/}
          {/*    style={{ color: palette.subText }}*/}
          {/*  />*/}
          {/*  <BiLogoInstagramAlt size={24} style={{ color: palette.subText }} />*/}
          {/*  <BiLogoTwitch size={24} style={{ color: palette.subText }} />*/}
          {/*</section>*/}
          Copyright © {new Date().getFullYear()}. My Pop Off
        </footer>
      </main>
    );
  },
);

export default Layout04;
