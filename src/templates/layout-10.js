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
            previewWindow
              ? "mx-auto w-10/12 p-3"
              : "w-10/12 max-w-sm p-3 md:p-10"
          } flex flex-col items-center border-2 border-black rounded-xl`}
          style={{ backgroundColor: palette.middleGround }}
        >
          <section className="mb-8">
            <h2
              className={`font-black text-xl md:text-3xl text-center tracking-wide`}
              style={{ color: palette.mainText }}
            >
              Hello!
            </h2>
            <h1 className="text-base" style={{ color: palette.subText }}>
              I am @{username}
            </h1>
          </section>

          {/* Links */}
          <section className="mb-16 w-full">
            <ul
              className={`${
                previewWindow ? "gap-2" : "gap-4"
              } mx-auto flex flex-col text-center justify-center w-full font-sans`}
            >
              {userData.links &&
                userData.links.map((link, index) => (
                  <Link
                    href={link.url}
                    key={`link-${index}`}
                    className={`p-0.5 md:p-1 m-1 px-5 min-w-max rounded-lg shadow-[5px_6px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-x-1 hover:-translate-y-1 transition-all duration-100`}
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
          Copyright © {new Date().getFullYear()}.{" "}
          <Link href={"/"}>My Pop Off</Link>
        </footer>
      </main>
    );
  },
);

export default Layout10;
