"use client";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { onBoardingLayouts } from "@/data/OnBoardingLayouts";

const OnBoardingOne = () => {
  const [activeLayout, setActiveLayout] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

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
        ? onBoardingLayouts.findIndex(
            (layout) => layout.layoutID === prevChoice.layoutStyle
          )
        : 0
    );

    setLoading(false);
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
              {onBoardingLayouts.map((layout, index) => (
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
                {onBoardingLayouts[activeLayout].layoutTitle}
              </span>
            </h4>
          </article>
        </article>

        <article className="hidden md:block pt-3 relative md:w-[55%] lg:w-[50%]">
          <h3 className="absolute top-0 left-10 self-end font-bold text-lg italic opacity-50">
            Examples
          </h3>
          <div className="-ml-5 md:ml-0 mt-5 relative flex flex-row items-center justify-center">
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <article className="absolute aspect-[1/2] w-[40%] bg-contain bg-[url('/images/onboarding/mobile-frame.png')] bg-no-repeat bg-center z-50"></article>
                <article className="md:-mr-5 aspect-[1/2] w-[30%] opacity-60">
                  <img
                    src={onBoardingLayouts[activeLayout].images[0] || ""}
                    className="object-contain"
                  />
                </article>
                <article className="-ml-5 md:ml-0 aspect-[1/2] w-[40%] scale-100 z-20">
                  <img
                    src={onBoardingLayouts[activeLayout].images[1] || ""}
                    className="object-contain"
                  />
                </article>
                <article className="-ml-5 aspect-[1/2] w-[30%] opacity-60">
                  <img
                    src={onBoardingLayouts[activeLayout].images[2] || ""}
                    className="object-contain"
                  />
                </article>
              </>
            )}
          </div>
        </article>
      </section>
    </>
  );
};

export default OnBoardingOne;
