"use client";
import { useEffect, useState } from "react";

const OnBoardingOne = ({ title = "" }) => {
  const [activeLayout, setActiveLayout] = useState(0);

  const layouts = [
    {
      layoutImage: "/images/onboarding/layout-01.png",
      images: [
        "/images/onboarding/layout01_iii.png",
        "/images/onboarding/layout01_ii.png",
        "/images/onboarding/layout01_i.png",
      ],
    },
    {
      layoutImage: "/images/onboarding/layout-02.png",
      images: [
        "/images/onboarding/layout02_i.png",
        "/images/onboarding/layout02_ii.png",
        "/images/onboarding/layout02_iii.png",
      ],
    },
    {
      layoutImage: "/images/onboarding/layout-03.png",
      images: [
        "/images/onboarding/layout02_i.png",
        "/images/onboarding/layout02_ii.png",
        "/images/onboarding/layout02_iii.png",
      ],
    },
    {
      layoutImage: "/images/onboarding/layout-04.png",
      images: [
        "/images/onboarding/layout02_i.png",
        "/images/onboarding/layout02_ii.png",
        "/images/onboarding/layout02_iii.png",
      ],
    },
    {
      layoutImage: "/images/onboarding/layout-05.png",
      images: [
        "/images/onboarding/layout02_i.png",
        "/images/onboarding/layout02_ii.png",
        "/images/onboarding/layout02_iii.png",
      ],
    },
    {
      layoutImage: "/images/onboarding/layout-06.png",
      images: [
        "/images/onboarding/layout02_i.png",
        "/images/onboarding/layout02_ii.png",
        "/images/onboarding/layout02_iii.png",
      ],
    },
    {
      layoutImage: "/images/onboarding/layout-07.png",
      images: [
        "/images/onboarding/layout02_i.png",
        "/images/onboarding/layout02_ii.png",
        "/images/onboarding/layout02_iii.png",
      ],
    },
    {
      layoutImage: "/images/onboarding/layout-08.png",
      images: [
        "/images/onboarding/layout02_i.png",
        "/images/onboarding/layout02_ii.png",
        "/images/onboarding/layout02_iii.png",
      ],
    },
    {
      layoutImage: "/images/onboarding/layout-09.png",
      images: [
        "/images/onboarding/layout02_i.png",
        "/images/onboarding/layout02_ii.png",
        "/images/onboarding/layout02_iii.png",
      ],
    },
  ];

  return (
    <div className="py-6">
      <h1 className="text-2xl md:text-4xl font-bold font-sans">{title}</h1>
      <section className="relative pt-6 flex flex-col md:flex-row items-center justify-stretch gap-5 md:gap-0">
        <article className="grid grid-cols-5 gap-5 w-full md:w-2/5 max-w-sm md:max-w-none">
          {layouts.map((layout, index) => (
            <article
              key={`image-${index}`}
              className={`cursor-pointer flex items-center justify-center rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                activeLayout === index
                  ? "border-action opacity-100 shadow-lg shadow-black/30"
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
              onClick={() => setActiveLayout(index)}
            >
              <img className="object-contain h-full" src={layout.layoutImage} />
            </article>
          ))}
        </article>
        <article className="relative w-full md:w-3/5">
          <div className="relative flex flex-row items-center justify-center gap-0">
            <article className="absolute aspect-[1/2] w-1/3 bg-contain bg-[url('/images/onboarding/mobile-frame.png')] bg-no-repeat bg-center z-50"></article>
            <article className="-mr-10 md:-mr-16 lg:-mr-20 aspect-[1/2] w-1/3 scale-[0.7] opacity-70">
              <img
                src={layouts[activeLayout].images[0] || ""}
                className="object-contain"
              />
            </article>
            <article className="aspect-[1/2] w-1/3 scale-100 z-20">
              <img
                src={layouts[activeLayout].images[1] || ""}
                className="object-contain"
              />
            </article>
            <article className="-ml-10 md:-ml-16 lg:-ml-20 flex aspect-[1/2] w-1/3 scale-[0.7] opacity-70">
              <img
                src={layouts[activeLayout].images[2] || ""}
                className="object-contain"
              />
            </article>
          </div>
        </article>
      </section>
    </div>
  );
};

export default OnBoardingOne;
