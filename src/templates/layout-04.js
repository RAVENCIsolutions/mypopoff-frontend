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
              previewWindow ? "text-3xl" : "text-xl md:text-4xl"
            } text-center`}
          >
            @{username}
          </h1>
          <p
            className={`${
              previewWindow ? "text-base" : "text-sm md:text-xl"
            } max-w-xs font-calluna font-light text-center`}
            style={{ color: palette.subText }}
          >
            {bio}
          </p>
        </section>

        <section
          className={`mx-auto px-4 py-8 flex flex-col items-stretch justify-center min-w-44 max-w-full h-full font-calluna font-semibold ${
            previewWindow ? "gap-3" : "md:text-3xl"
          } ${
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
        </section>

        <footer
          className={`mx-auto ${
            previewWindow
              ? "px-4 gap-1 text-sm"
              : "px-4 md:px-16 gap-1 md:gap-3 text-sm md:text-base"
          } bottom-3 text-neutral-500`}
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
          Copyright © {new Date().getFullYear()}.{" "}
          <Link href={"/"}>My Pop Off</Link>
        </footer>
      </main>
    );
  },
);

export default Layout04;
