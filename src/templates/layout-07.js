import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";

import Link from "next/link";

import { defaultUser } from "@/data/defaultUser";
import { ButtonsLookup } from "@/data/ButtonsLookup";

import {
  getButtonStyleIndex,
  getContrastLuminance,
} from "@/utility/generalUtils";

const Layout07 = ({ previewWindow = false, userData = defaultUser }) => {
  return (
    <main
      className="relative py-4 flex items-center justify-stretch w-full min-h-screen h-full"
      style={{ backgroundColor: userData.palette.background }}
    >
      <section className="p-4 md:p-16 block md:flex flex-col justify-center">
        <h1
          className="mb-2 font-newSpirit font-bold text-lg md:text-4xl"
          style={{ color: userData.palette.mainText }}
        >
          @{userData.username}
        </h1>
        <p
          className="mb-6 text-base md:text-xl max-w-xs font-sans font-light text-white"
          style={{ color: userData.palette.subText }}
        >
          {userData.bio}
        </p>
        <article
          className={`py-4 flex flex-col h-full font-newSpirit font-bold text-base md:text-3xl overflow-y-auto ${
            ButtonsLookup[getButtonStyleIndex(userData.button_style)]
              .uniqueClasses
          }`}
          style={{ margin: 0 }}
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
        </article>

        {/* Social Media */}
        {/*<section className="mt-6 mb-8 flex flex-row gap-4">*/}
        {/*  <BiLogoFacebookCircle size={24} className="text-neutral-500" />*/}
        {/*  <BiLogoInstagramAlt size={24} className="text-neutral-500" />*/}
        {/*  <BiLogoTwitch size={24} className="text-neutral-500" />*/}
        {/*</section>*/}
      </section>

      <footer
        className="fixed px-4 md:px-16 bottom-3 flex flex-col 3xs:flex-row gap-1 w-full text-base"
        style={{
          color: getContrastLuminance(userData.palette.background),
          opacity: 0.5,
        }}
      >
        Copyright © {new Date().getFullYear()}.{" "}
        <Link href={"/"}>My Pop Off</Link>
      </footer>
    </main>
  );
};

export default Layout07;
