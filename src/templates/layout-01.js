"use client";

import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";

import Link from "next/link";
import { observer } from "mobx-react";

import {
  getButtonStyleIndex,
  getContrastLuminance,
} from "@/utility/generalUtils";
import { defaultUser } from "@/data/defaultUser";
import { ButtonsLookup } from "@/data/ButtonsLookup";

const Layout01 = observer(
  ({ previewWindow = false, userData = defaultUser, buttonStyle = 0 }) => {
    const { username, bio, links, palette } = userData;

    console.log(userData);

    return (
      <main
        className={`${
          previewWindow ? "px-2 py-4" : "px-2 sm:px-10 py-2"
        } flex flex-col items-center justify-between`}
        style={{
          minHeight: previewWindow ? "100%" : "100vh",
          backgroundColor: palette.background,
        }}
      >
        {/* Image */}
        <article
          className={`flex-grow flex flex-col items-center justify-center w-full max-w-sm`}
        >
          <section
            className={`${
              previewWindow ? "mb-4" : "mb-8"
            } flex flex-col items-center`}
          >
            <img
              className="mb-3 w-32 h-32 rounded-full shadow-lg shadow-black/40 bg-dashboard-primary-dark object-cover object-center"
              src={userData.images || ""}
              alt={userData.username || ""}
            />
            <p
              className={`font-bold text-xl text-center tracking-wide uppercase`}
              style={{ color: palette.mainText }}
            >
              @{userData.username && userData.username}
            </p>
            <p className="text-base text-center">
              {userData.bio && userData.bio}
            </p>
          </section>

          {/* Links */}
          <section
            className={`mb-10 flex flex-col text-base md:text-xl ${
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

          {/* Social Media */}
          {/*<section className="flex flex-row gap-4">*/}
          {/*  <BiLogoFacebookCircle size={30} style={{ color: palette.subText }} />*/}
          {/*  <BiLogoInstagramAlt size={30} style={{ color: palette.subText }} />*/}
          {/*  <BiLogoTwitch size={30} style={{ color: palette.subText }} />*/}
          {/*</section>*/}
        </article>

        <footer
          className={`relative text-sm opacity-50`}
          style={{ color: getContrastLuminance(palette.background) }}
        >
          Copyright © {new Date().getFullYear()}.{" "}
          <Link href={"/"}>My Pop Off</Link>
        </footer>
      </main>
    );
  },
);

export default Layout01;
