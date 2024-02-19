"use client";

import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";

import Link from "next/link";
import { observer } from "mobx-react";

import { defaultUser } from "@/data/defaultUser";
import { useState } from "react";
import { ButtonsLookup } from "@/data/ButtonsLookup";
import { getButtonStyleIndex } from "@/utility/generalUtils";

const Layout05 = ({ previewWindow = false, userData = defaultUser }) => {
  const { username, bio, links, palette } = userData;

  const cards = [
    {
      title: "About Me",
      content: (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <img
            className="mb-8 w-32 h-32 rounded-full shadow-lg shadow-black/40 bg-dashboard-primary-dark object-cover object-center"
            src="https://img.freepik.com/free-photo/portrait-woman-with-blue-eyes_188544-7646.jpg"
            alt="Influencer Username"
          />
          <h1 className="mb-4 font-bold text-3xl text-center uppercase tracking-wide text-stone-800">
            @{userData.username}
          </h1>
          <p className="text-lg font-dmsans text-stone-600 text-center max-w-xs">
            {userData.bio}
          </p>
        </div>
      ),
    },

    {
      title: "Links",
      content: (
        <section className="px-0 md:px-8 flex flex-col gap-5 items-stretch justify-between w-full h-full text-center overflow-y-auto">
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
      ),
    },

    // {
    //   title: "Socials",
    //   content: (
    //     <div className="flex justify-center items-center gap-4 w-full h-full">
    //       <BiLogoFacebookCircle size={30} className="text-stone-900" />
    //       <BiLogoInstagramAlt size={30} className="text-stone-900" />
    //       <BiLogoTwitch size={30} className="text-stone-900" />
    //     </div>
    //   ),
    // },
  ];

  const [currentCard, setCurrentCard] = useState(0);

  return (
    <main className="relative px-0 md:px-10 py-20 md:py-10 flex flex-col items-center justify-center w-screen h-screen bg-sky-100 font-anton">
      <section className="flex flex-col md:flex-row items-center justify-center w-full h-full md:h-96 rounded-2xl">
        {cards.map((card, index) => (
          <article
            className={`relative bg-white transition-all duration-1000 shadow-xl shadow-black/10 overflow-hidden ${
              currentCard === index
                ? "w-full md:w-[36rem] h-full"
                : "w-full md:w-8 h-8 md:h-full"
            }`}
          >
            <div
              className={
                "cursor-pointer flex md:inline-flex items-center justify-center w-full md:w-9 h-9 md:h-full" +
                " hover:bg-sky-800 shadow-md shadow-black/30 border-2 border-white md:[writing-mode:vertical-lr]" +
                " rotate-0 md:rotate-180 uppercase text-center tracking-widest transition-all duration-300 " +
                (currentCard === index
                  ? "text-white bg-sky-700"
                  : "text-white/50 bg-sky-900")
              }
              onClick={() => {
                if (currentCard === index) {
                  setCurrentCard(index === 0 ? 0 : index - 1);
                } else setCurrentCard(index);
              }}
            >
              {card.title}
            </div>
            <div
              className={`relative md:absolute py-6 inline-block w-full md:w-[calc(36rem-2.25rem)] h-full overflow-hidden`}
            >
              {card.content}
            </div>
          </article>
        ))}
      </section>

      <footer className="absolute bottom-3 text-sm text-sky-900/30">
        Copyright © {new Date().getFullYear()}.{" "}
        <Link href={"/"}>My Pop Off</Link>
      </footer>
    </main>
  );
};

export default Layout05;
