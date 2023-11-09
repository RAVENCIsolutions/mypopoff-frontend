"use client";
import { useEffect, useState } from "react";

const OnBoardingOne = () => {
  const [activeLayout, setActiveLayout] = useState(0);

  const layouts = [
    {
      layoutID: "layout-01",
      layoutTitle: "The Classic",
      layoutImage: "/images/onboarding/layout-01.png",
      images: [
        "/images/onboarding/layout01_iii.png",
        "/images/onboarding/layout01_ii.png",
        "/images/onboarding/layout01_i.png",
      ],
      colours: {
        background: "bg-white",
        mainText: "text-primary-dark",
        subText: "text-primary-dark",
      },
    },
    {
      layoutID: "layout-02",
      layoutTitle: "For the 'Gram 📷",
      layoutImage: "/images/onboarding/layout-02.png",
      images: [
        "/images/onboarding/layout02_i.png",
        "/images/onboarding/layout02_ii.png",
        "/images/onboarding/layout02_iii.png",
      ],
      colours: {
        background: "bg-white",
        mainText: "text-primary-dark",
        subText: "text-primary-dark",
      },
    },
    {
      layoutID: "layout-03",
      layoutTitle: "The Poster 🖼️",
      layoutImage: "/images/onboarding/layout-03.png",
      images: [
        "/images/onboarding/layout03_i.png",
        "/images/onboarding/layout03_ii.png",
        "/images/onboarding/layout03_iii.png",
      ],
      colours: {
        background: "bg-primary-dark",
        mainText: "text-primary-light",
        subText: "text-primary-light",
      },
    },
    {
      layoutID: "layout-04",
      layoutTitle: "Office Attire 👔",
      layoutImage: "/images/onboarding/layout-04.png",
      images: [
        "/images/onboarding/layout04_i.png",
        "/images/onboarding/layout04_ii.png",
        "/images/onboarding/layout04_iii.png",
      ],
      colours: {
        background: "bg-primary-dark",
        mainText: "text-primary-light",
        subText: "text-primary-light",
      },
    },
    {
      layoutID: "layout-05",
      layoutTitle: "Cardology 🃏",
      layoutImage: "/images/onboarding/layout-05.png",
      images: [
        "/images/onboarding/layout05_i.png",
        "/images/onboarding/layout05_ii.png",
        "/images/onboarding/layout05_iii.png",
      ],
      colours: {
        background: "bg-white",
        mainText: "text-primary-dark",
        subText: "text-primary-dark",
      },
    },
    {
      layoutID: "layout-06",
      layoutTitle: "The Gallery 🗽",
      layoutImage: "/images/onboarding/layout-06.png",
      images: [
        "/images/onboarding/layout06_i.png",
        "/images/onboarding/layout06_ii.png",
        "/images/onboarding/layout06_iii.png",
      ],
      colours: {
        background: "bg-action",
        midground: "bg-white",
        mainText: "text-primary-dark",
        subText: "text-primary-dark",
      },
    },
    {
      layoutID: "layout-07",
      layoutTitle: "Bombastic 🎩",
      layoutImage: "/images/onboarding/layout-07.png",
      images: [
        "/images/onboarding/layout07_i.png",
        "/images/onboarding/layout07_ii.png",
        "/images/onboarding/layout07_iii.png",
      ],
      colours: {
        background: "bg-white",
        mainText: "text-primary-dark",
        subText: "text-primary-dark",
      },
    },
    {
      layoutID: "layout-08",
      layoutTitle: "Bannerific 🪧",
      layoutImage: "/images/onboarding/layout-08.png",
      images: [
        "/images/onboarding/layout08_i.png",
        "/images/onboarding/layout08_ii.png",
        "/images/onboarding/layout08_iii.png",
      ],
      colours: {
        background: "bg-primary-dark",
        mainText: "text-action",
        subText: "text-primary-light",
      },
    },
    {
      layoutID: "layout-09",
      layoutTitle: "Business Card 🪪",
      layoutImage: "/images/onboarding/layout-09.png",
      images: [
        "/images/onboarding/layout09_i.png",
        "/images/onboarding/layout09_ii.png",
        "/images/onboarding/layout09_iii.png",
      ],
      colours: {
        background: "bg-white",
        midground: "bg-white",
        mainText: "text-primary-dark",
        subText: "text-primary-dark",
      },
    },
    {
      layoutID: "layout-10",
      layoutTitle: "Neobrutalism 🎇",
      layoutImage: "/images/onboarding/layout-10.png",
      images: [
        "/images/onboarding/layout10_i.png",
        "/images/onboarding/layout10_ii.png",
        "/images/onboarding/layout10_iii.png",
      ],
      colours: {
        background: "bg-action",
        midground: "bg-white",
        mainText: "text-action",
        subText: "text-primary-dark",
      },
    },
  ];

  useEffect(() => {
    let prevChoice;

    const storedSelectedLayout = localStorage.getItem("selectedLayout");

    if (storedSelectedLayout) {
      try {
        prevChoice = JSON.parse(storedSelectedLayout);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    }

    setActiveLayout(
      prevChoice
        ? layouts.findIndex(
            (layout) => layout.layoutID === prevChoice.layoutStyle
          )
        : 0
    );
  }, []);

  return (
    <>
      <section className="relative pb-4 md:pt-6 flex flex-col md:flex-row justify-between gap-2">
        <article className="md:pt-3 relative flex items-center w-full md:w-[45%] max-w-none md:max-w-md">
          <h3 className="hidden md:block absolute top-0 font-bold text-base md:text-lg italic opacity-50">
            Options
          </h3>
          <article className="md:mt-5 p-3 md:p-5 rounded-none md:rounded-3xl w-full bg-white shadow-lg shadow-dashboard-primary-dark/20 border-2">
            <div className="grid grid-cols-1 3xs:grid-cols-2 2xs:grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-5 gap-4 md:gap-4">
              {layouts.map((layout, index) => (
                <article
                  key={`image-${index}`}
                  className={`cursor-pointer bg-white rounded-lg overflow-hidden transition-all duration-300 ${
                    activeLayout === index
                      ? "border-[2px] border-action opacity-100 shadow-lg shadow-black/30"
                      : "border-[1px] border-primary-dark opacity-30 hover:opacity-100"
                  }`}
                  onClick={() => {
                    const prevChoice = JSON.parse(
                      localStorage.getItem("selectedLayout")
                    );

                    prevChoice.layoutStyle = layout.layoutID;

                    prevChoice.colours = {
                      ...prevChoice.colours,
                      ...layout.colours,
                    };

                    localStorage.setItem(
                      "selectedLayout",
                      JSON.stringify(prevChoice)
                    );

                    setActiveLayout(index);
                  }}
                >
                  <img
                    className="object-cover w-full h-full"
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

        <article className="hidden md:block pt-3 relative md:w-[55%] lg:w-[50%]">
          <h3 className="absolute top-0 left-10 self-end font-bold text-lg italic opacity-50">
            Examples
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
    </>
  );
};

export default OnBoardingOne;
