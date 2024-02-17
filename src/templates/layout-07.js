"use client";

import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";

import Link from "next/link";
import { observer } from "mobx-react";

import { defaultUser } from "@/data/defaultUser";
import Link09 from "@/templates/links/Link09";

const Layout07 = ({ previewWindow = false, userData = defaultUser }) => {
  const { username, bio, links, palette } = userData;

  return (
    <main className="relative py-4 flex items-center justify-stretch w-full min-h-screen h-full bg-neutral-800 text-orange-600">
      <section className="p-4 md:p-16 block md:flex flex-col justify-center">
        <h1 className="mb-2 font-newSpirit font-bold text-lg md:text-4xl">
          @{username}
        </h1>
        <p className="mb-6 text-base md:text-xl max-w-xs font-sans font-light text-white">
          {bio}
        </p>
        <ul className="py-4 flex flex-col items-start gap-8 h-full font-newSpirit font-bold text-base md:text-3xl overflow-y-auto">
          {userData.links &&
            userData.links.map((link, index) => (
              <Link09
                key={`link-${index}`}
                title={link.title}
                url={link.url}
                palette={palette}
              />
            ))}
        </ul>

        {/* Social Media */}
        {/*<section className="mt-6 mb-8 flex flex-row gap-4">*/}
        {/*  <BiLogoFacebookCircle size={24} className="text-neutral-500" />*/}
        {/*  <BiLogoInstagramAlt size={24} className="text-neutral-500" />*/}
        {/*  <BiLogoTwitch size={24} className="text-neutral-500" />*/}
        {/*</section>*/}
      </section>

      <footer className="fixed px-4 md:px-16 bottom-3 flex flex-col md:flex-row items-center justify-between gap-1 md:gap-0 w-full text-base text-neutral-500 text-center">
        Copyright © {new Date().getFullYear()}.{" "}
        <Link href={"/"}>My Pop Off</Link>
      </footer>
    </main>
  );
};

export default Layout07;
