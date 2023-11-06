"use client";
import { useEffect, useState } from "react";

const OnBoardingOne = ({ title = "" }) => {
  const [activeLayout, setActiveLayout] = useState(0);

  const layouts = [
    {
      layoutTitle: "The Classic",
      layoutImage: "/images/onboarding/layout-01.png",
      images: [
        "/images/onboarding/layout01_iii.png",
        "/images/onboarding/layout01_ii.png",
        "/images/onboarding/layout01_i.png",
      ],
    },
    {
      layoutTitle: "",
      layoutImage: "/images/onboarding/layout-02.png",
      images: [
        "/images/onboarding/layout02_i.png",
        "/images/onboarding/layout02_ii.png",
        "/images/onboarding/layout02_iii.png",
      ],
    },
    {
      layoutTitle: "",
      layoutImage: "/images/onboarding/layout-03.png",
      images: [
        "/images/onboarding/layout03_i.png",
        "/images/onboarding/layout03_ii.png",
        "/images/onboarding/layout03_iii.png",
      ],
    },
    {
      layoutTitle: "",
      layoutImage: "/images/onboarding/layout-04.png",
      images: [
        "/images/onboarding/layout04_i.png",
        "/images/onboarding/layout04_ii.png",
        "/images/onboarding/layout04_iii.png",
      ],
    },
    {
      layoutTitle: "",
      layoutImage: "/images/onboarding/layout-05.png",
      images: [
        "/images/onboarding/layout05_i.png",
        "/images/onboarding/layout05_ii.png",
        "/images/onboarding/layout05_iii.png",
      ],
    },
    {
      layoutTitle: "",
      layoutImage: "/images/onboarding/layout-06.png",
      images: [
        "/images/onboarding/layout06_i.png",
        "/images/onboarding/layout06_ii.png",
        "/images/onboarding/layout06_iii.png",
      ],
    },
    {
      layoutTitle: "",
      layoutImage: "/images/onboarding/layout-07.png",
      images: [
        "/images/onboarding/layout07_i.png",
        "/images/onboarding/layout07_ii.png",
        "/images/onboarding/layout07_iii.png",
      ],
    },
    {
      layoutTitle: "",
      layoutImage: "/images/onboarding/layout-08.png",
      images: [
        "/images/onboarding/layout08_i.png",
        "/images/onboarding/layout08_ii.png",
        "/images/onboarding/layout08_iii.png",
      ],
    },
    {
      layoutTitle: "",
      layoutImage: "/images/onboarding/layout-09.png",
      images: [
        "/images/onboarding/layout09_i.png",
        "/images/onboarding/layout09_ii.png",
        "/images/onboarding/layout09_iii.png",
      ],
    },
  ];

  return (
    <>
      <section className="mt-8 mb-2 md:my-8">
        <h1 className="text-lg sm:text-xl md:text-2xl font-sans">
          🎈 Congratulations 🎉🎉 on your new account! Let's get you set up
        </h1>
      </section>

      <section className="pt-3 md:pt-6 pl-0 md:pl-6">
        <h3 className="text-xl md:text-3xl font-bold font-sans">{title}</h3>

        <section className="relative py-10 md:pt-6 flex flex-col md:flex-row justify-stretch gap-12 md:gap-4">
          <article className="pt-3 relative flex items-center w-full max-w-none md:max-w-md xl:max-w-lg">
            <h3 className="absolute top-0 font-bold text-base md:text-lg italic opacity-50">
              Options:
            </h3>
            <article className="mt-5 p-3 md:p-5 rounded-none md:rounded-3xl bg-white shadow-lg shadow-dashboard-primary-dark/20 border-2">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-4">
                {layouts.map((layout, index) => (
                  <article
                    key={`image-${index}`}
                    className={`cursor-pointer flex items-center justify-center rounded-lg overflow-hidden transition-all duration-300 ${
                      activeLayout === index
                        ? "border-[2px] border-action opacity-100 shadow-lg shadow-black/30"
                        : "border-[1px] border-primary-dark opacity-30 hover:opacity-100"
                    }`}
                    onClick={() => setActiveLayout(index)}
                  >
                    <img
                      className="object-cover h-full"
                      src={layout.layoutImage}
                    />
                  </article>
                ))}
              </div>
              <h4 className="mt-6 font-light text-sm">
                Layout Selected:{" "}
                <span className="font-bold">
                  {layouts[activeLayout].layoutTitle}
                </span>
              </h4>
            </article>
          </article>

          <article className="pt-3 relative w-full">
            <h3 className="absolute top-0 font-bold text-lg italic opacity-50">
              Examples:
            </h3>
            <div className="-ml-5 md:ml-0 mt-5 relative flex flex-row items-center justify-center">
              <article className="absolute aspect-[1/2] w-[40%] bg-contain bg-[url('/images/onboarding/mobile-frame.png')] bg-no-repeat bg-center z-50"></article>
              <article className="md:-mr-5 aspect-[1/2] w-[30%] opacity-60">
                <img
                  src={layouts[activeLayout].images[0] || ""}
                  className="object-contain"
                />
              </article>
              <article className="-ml-5 md:ml-0 aspect-[1/2] w-[40%] scale-100 z-20">
                <img
                  src={layouts[activeLayout].images[1] || ""}
                  className="object-contain"
                />
              </article>
              <article className="-ml-5 aspect-[1/2] w-[30%] opacity-60">
                <img
                  src={layouts[activeLayout].images[2] || ""}
                  className="object-contain"
                />
              </article>
            </div>
          </article>
        </section>
      </section>
    </>
  );
};

export default OnBoardingOne;
