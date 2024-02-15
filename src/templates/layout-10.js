"use client";

import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";

import Link from "next/link";
import { observer } from "mobx-react";

import { defaultUser } from "@/data/defaultUser";

const Layout10 = observer(
  ({ previewWindow = false, userData = defaultUser }) => {
    const { username, bio, links, palette } = userData;

    return (
      <main
        className={`${
          previewWindow
            ? "px-2 py-20 flex-col justify-between gap-8"
            : "px-2 sm:px-10 py-10 min-h-screen justify-center"
        } items-center flex h-fit`}
        style={{ backgroundColor: palette.background }}
      >
        <article
          className={`${
            previewWindow ? "mx-auto w-10/12 p-3" : "w-10/12 max-w-sm p-10"
          } flex flex-col items-center border-2 border-black rounded-xl`}
          style={{ backgroundColor: palette.middleGround }}
        >
          <section className="mb-8">
            <h2
              className={`font-black text-3xl text-center tracking-wide`}
              style={{ color: palette.mainText }}
            >
              Hello!
            </h2>
            <h1 className="text-xl" style={{ color: palette.subText }}>
              My name is username
            </h1>
          </section>

          {/* Links */}
          <section className="mb-16 w-full">
            <ul
              className={`${
                previewWindow ? "gap-2" : "gap-8"
              } mx-auto flex flex-col text-center w-full font-sans ${
                currentButtonStyle.uniqueClasses
              }`}
            >
              {sampleLinks.map((link, index) => {
                if (currentButtonStyle && currentButtonStyle.component) {
                  return currentButtonStyle.component(
                    link.title,
                    onBoardingStore.onBoardingCurrent.palette,
                    index,
                  );
                }
              })}
            </ul>
          </section>

          {/* Social Media */}
          <section className="flex flex-row gap-4">
            <BiLogoFacebookCircle
              size={30}
              style={{ color: palette.mainText }}
            />
            <BiLogoInstagramAlt size={30} style={{ color: palette.mainText }} />
            <BiLogoTwitch size={30} style={{ color: palette.mainText }} />
          </section>
        </article>
        <footer
          className={`${
            previewWindow ? "relative" : "absolute"
          } bottom-3 text-sm text-white`}
        >
          Copyright © {new Date().getFullYear()}. My Pop Off
        </footer>
      </main>
    );
  },
);

export default Layout10;
