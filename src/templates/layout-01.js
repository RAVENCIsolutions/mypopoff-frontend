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
import ButtonStyle01 from "@/onboardingComponents/button-style-01";
import { ButtonsLookup } from "@/data/ButtonsLookup";

const Layout01 = observer(
  ({ previewWindow = false, userData = defaultUser, buttonStyle = 0 }) => {
    const { username, bio, links, palette } = userData;

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
          className={`flex-grow flex flex-col items-center justify-center w-full max-w-lg`}
        >
          <section
            className={`${
              previewWindow ? "mb-4" : "mb-8"
            } flex flex-col items-center max-w-[80%]`}
          >
            <img
              className="mb-3 w-32 h-32 rounded-full shadow-lg shadow-black/40 bg-dashboard-primary-dark object-cover object-center"
              src="https://img.freepik.com/free-photo/portrait-woman-with-blue-eyes_188544-7646.jpg"
              alt="Influencer Username"
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
          {/*<section className={`${previewWindow ? "mb-4" : "mb-10"} w-full`}>*/}
          {/*  <ul*/}
          {/*    className={`mx-auto flex flex-col ${*/}
          {/*      previewWindow ? "gap-2" : "gap-4"*/}
          {/*    } ${*/}
          {/*      buttonStyle01.uniqueClasses*/}
          {/*    } text-center max-w-max font-sans tracking-wide`}*/}
          {/*  >*/}
          {/*    {userData.links &&*/}
          {/*      userData.links.map((link, index) => {*/}
          {/*        if (currentButtonStyle && currentButtonStyle.component) {*/}
          {/*          return currentButtonStyle.component(*/}
          {/*            link.title,*/}
          {/*            onBoardingStore.userData.palette,*/}
          {/*            index,*/}
          {/*          );*/}
          {/*        }*/}
          {/*      })}*/}
          {/*  </ul>*/}
          {/*</section>*/}
          <section
            className={`mb-10 flex flex-col items-stretch justify-center gap-3`}
          >
            {userData.links &&
              userData.links.map(
                (link, index) =>
                  ButtonsLookup[
                    getButtonStyleIndex(userData.button_style)
                  ].component(link.url, link.title, palette, index),
                // (
                // <Link
                //   href={link.url}
                //   key={`link-${index}`}
                //   className={`py-1.5 px-5 mx-auto min-w-44 max-w-full rounded-full hover:opacity-80 hover:shadow-[3px_3px_5px_rgba(0,0,0,0.25)] hover:scale-105 text-center transition-all duration-300`}
                //   style={{
                //     backgroundColor: palette.buttonMain,
                //     color: palette.buttonText,
                //   }}
                // >
                //   {link.title}
                // </Link>
                // );
              )}
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
