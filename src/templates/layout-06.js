import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Layout06 = () => {
  const scrollRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const [scrollingForwards, setScrollingForwards] = useState(true);

  let intervalId = null;

  const sampleLinks = [
    {
      url: "/",
      title: "Visit my official portfolio",
      image: "/images/templates/modernNewsprint_photo01.jpg",
    },
    {
      url: "/",
      title: "My Website",
      image: "/images/templates/modernNewsprint_photo02.jpg",
    },
    {
      url: "/",
      title: "My Portfolio",
      image: "/images/templates/modernNewsprint_photo04.jpg",
    },
    {
      url: "/",
      title: "Email Me",
      image: "/images/templates/modernNewsprint_photo03.jpg",
    },
    {
      url: "/",
      title: "Email Me",
      image: "/images/templates/modernNewsprint_photo04.jpg",
    },
  ];

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
          <ul className="py-10 flex flex-row gap-6 md:gap-10 items-start text-center w-max font-sans tracking-wide">
            {sampleLinks.map((link, index) => (
              <Link
                key={index}
                className="group cursor-pointer w-36 md:w-44 text-stone-100 transition-all duration-300"
                href={link.url}
                onMouseEnter={() => setIsScrolling(false)}
                onMouseLeave={() => setIsScrolling(true)}
              >
                <li className="flex flex-col items-stretch gap-2 md:gap-4">
                  <img
                    className="w-full h-56 aspect-auto object-cover md:grayscale hover:grayscale-0 origin-left group-hover:scale-105 transition-all duration-300"
                    src={link.image}
                    alt=""
                  />
                  <h3 className="font-barlowCondensed font-semibold uppercase text-left text-xl md:text-2xl text-neutral-900">
                    {link.title}
                  </h3>
                </li>
              </Link>
            ))}
          </ul>
        </section>

        {/* Social Media */}

        <footer className="py-2 md:py-3 flex flex-col md:flex-row md:justify-between gap-2 border-t-2 border-neutral-900 text-neutral-900">
          <p className="text-base md:text-lg font-barlowCondensed uppercase font-bold text-neutral-900">
            Copyright © {new Date().getFullYear()}. My Pop Off
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
