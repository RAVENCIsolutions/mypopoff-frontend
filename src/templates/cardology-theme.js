import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const CardologyTheme = () => {
  const sampleLinks = [
    { url: "/", title: "Book a Free Consultation" },
    { url: "/", title: "My Website" },
    { url: "/", title: "My Portfolio" },
    { url: "/", title: "Email Me" },
  ];

  const cards = [
    {
      title: "About Me",
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <img
            className="mb-3 w-32 h-32 rounded-full shadow-lg shadow-black/40 bg-dashboard-primary-dark object-cover object-center"
            src="https://img.freepik.com/free-photo/portrait-woman-with-blue-eyes_188544-7646.jpg"
            alt="Influencer Username"
          />
          <h1 className="mb-2 font-bold text-2xl text-center tracking-wide text-sky-600">
            username
          </h1>
          <p className="text-lg text-stone-600">something about me</p>
        </div>
      ),
    },

    {
      title: "Links",
      content: (
        <ul className="px-8 flex flex-col gap-5 items-stretch justify-center h-full text-center font-sans tracking-wide">
          {sampleLinks.map((link, index) => (
            <Link
              key={index}
              className="cursor-pointer py-2 px-5 bg-white hover:bg-sky-600 border-[3px] border-sky-600 rounded-lg text-sky-600 hover:text-white transition-all duration-300"
              href={link.url}
            >
              <li>{link.title}</li>
            </Link>
          ))}
        </ul>
      ),
    },

    {
      title: "Socials",
      content: (
        <>
          <BiLogoFacebookCircle size={30} className="text-stone-900" />
          <BiLogoInstagramAlt size={30} className="text-stone-900" />
          <BiLogoTwitch size={30} className="text-stone-900" />
        </>
      ),
    },
  ];

  const [currentCard, setCurrentCard] = useState(0);

  return (
    <main className="relative px-2 sm:px-10 py-10 flex flex-col items-center justify-center w-screen h-screen min-h-fit bg-sky-600/20">
      <section className="flex flex-row h-96 fit rounded-2xl">
        {cards.map((card, index) => (
          <article
            className={`relative h-full bg-white transition-all duration-1000 shadow-xl shadow-black/10 overflow-hidden ${
              currentCard === index ? "w-[36rem]" : "w-8"
            }`}
          >
            <div
              className="inline-flex items-center justify-center w-9 h-full bg-stone-700 shadow-xl shadow-black/80 border-2 border-stone-500 [writing-mode:vertical-lr] rotate-180 uppercase tracking-wider text-white"
              onClick={() => {
                if (currentCard === index) {
                  setCurrentCard(index === 0 ? 0 : index - 1);
                } else setCurrentCard(index);
              }}
            >
              {card.title}
            </div>
            <div
              className={`absolute p-6 inline-block w-[calc(36rem-2.25rem)] h-full overflow-x-auto`}
            >
              {card.content}
            </div>
          </article>
        ))}
      </section>

      <footer className="absolute bottom-3 text-sm text-stone-500">
        Copyright © {new Date().getFullYear()}. My Pop Off
      </footer>
    </main>
  );
};

export default CardologyTheme;
