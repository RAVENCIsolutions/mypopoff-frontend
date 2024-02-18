"use client";

import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { observer } from "mobx-react";

import { defaultUser } from "@/data/defaultUser";
import { ButtonsLookup } from "@/data/ButtonsLookup";
import { getButtonStyleIndex } from "@/utility/generalUtils";

const Layout06 = ({ previewWindow = false, userData = defaultUser }) => {
  const { username, bio, links, palette } = userData;

  const scrollRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const [scrollingForwards, setScrollingForwards] = useState(true);

  let intervalId = null;

  useEffect(() => {
    const scrollElement = scrollRef.current;

    const scrollContent = () => {
      if (!isScrolling) return;

      requestAnimationFrame(() => {
        scrollElement.scrollTo({
          left: scrollingForwards
            ? scrollElement.scrollLeft + 1
            : scrollElement.scrollLeft - 1,
          behavior: "auto",
        });

        if (
          scrollingForwards &&
          scrollElement.scrollLeft >=
            scrollElement.scrollWidth - scrollElement.clientWidth
        )
          setTimeout(() => setScrollingForwards(false), 2000);

        if (!scrollingForwards && scrollElement.scrollLeft <= 0)
          setTimeout(() => setScrollingForwards(true), 2000);
      });
    };

    intervalId = setInterval(scrollContent, 30);

    return () => clearInterval(intervalId);
  }, [isScrolling, scrollingForwards]);

  return (
    <main className="flex items-center justify-center w-screen h-screen bg-neutral-800">
      <article className="px-4 md:px-10 flex flex-col items-stretch justify-between w-screen h-full md:h-fit bg-white shadow-xl shadow-neutral-900">
        <section className="py-2 md:py-5 flex justify-between border-b-2 border-neutral-900">
          <h1 className="flex-grow font-barlowCondensed font-bold text-2xl md:text-5xl uppercase tracking-wide text-neutral-900">
            username
          </h1>
        </section>

        {/* Links */}
        <section
          className="flex-grow w-full overflow-y-hidden overflow-x-scroll hide-scrollbar"
          ref={scrollRef}
        >
          <article className="py-10 flex flex-row gap-6 md:gap-10 items-start text-center w-max font-sans tracking-wide">
            {userData.links &&
              userData.links.map((link, index) => {
                return (
                  link.public &&
                  ButtonsLookup[
                    getButtonStyleIndex(userData.button_style)
                  ].component(link.url, link.title, palette, index)
                );
              })}
          </article>
        </section>

        {/* Social Media */}

        <footer className="py-2 md:py-3 flex flex-col md:flex-row md:justify-between gap-2 border-t-2 border-neutral-900 text-neutral-900">
          <p className="text-base md:text-lg font-barlowCondensed uppercase font-bold text-neutral-900">
            Copyright © {new Date().getFullYear()}.{" "}
            <Link href={"/"}>My Pop Off</Link>
          </p>
          <section className="flex flex-row gap-4">
            <Link href="/">
              <BiLogoFacebookCircle size={30} className="text-stone-900" />
            </Link>
            <Link href="/">
              <BiLogoInstagramAlt size={30} className="text-stone-900" />
            </Link>
            <Link href="/">
              <BiLogoTwitch size={30} className="text-stone-900" />
            </Link>
          </section>
        </footer>
      </article>
    </main>
  );
};

export default Layout06;
