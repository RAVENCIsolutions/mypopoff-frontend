"use client";
import { useEffect, useState } from "react";

import onBoardingStore from "@/stores/OnBoardingStore";
import { onBoardingButtons } from "@/data/OnBoardingButtons";
import { CircularProgress } from "@mui/material";

const OnBoardingTwo = (props) => {
  const [activeLayout, setActiveLayout] = useState(0);
  const [loading, setLoading] = useState(false);

  const activeColours = onBoardingStore.onBoardingCurrent.palette;

  const buttonNames = [
    "Make a Booking",
    "Join the VIP Club",
    "Visit my Website",
  ];

  useEffect(() => {
    setLoading(true);

    props.setGreenLight(true);

    const currentToIndex = onBoardingButtons.findIndex(
      (layout) => layout.id === onBoardingStore.onBoardingCurrent.buttonStyle,
    );

    onBoardingStore.resetColours();
    setActiveLayout(currentToIndex);

    setLoading(false);
  }, []);

  return (
    <>
      <section className="relative mb-10 md:pt-6 flex flex-col md:flex-row items-stretch justify-between">
        <section className="md:pt-3 md:pr-6 relative flex items-center w-full md:w-1/2 md:border-r-2">
          <h3 className="hidden md:block absolute top-0 font-bold text-base md:text-lg italic opacity-50">
            Options
          </h3>
          <article className="mt-10 p-3 md:p-5 rounded-none md:rounded-3xl w-full bg-white shadow-lg shadow-dashboard-primary-dark/10">
            <div className="grid grid-cols-1 3xs:grid-cols-2 2xs:grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-5 gap-4 md:gap-4">
              {onBoardingButtons.map((layout, index) => (
                <article
                  key={`image-${index}`}
                  className={`cursor-pointer bg-white rounded-lg overflow-hidden transition-all duration-300 ${
                    activeLayout === index
                      ? "border-[2px] border-action opacity-100 shadow-lg shadow-black/30"
                      : "border-[1px] border-primary-dark opacity-30 hover:opacity-100"
                  }`}
                  onClick={() => {
                    onBoardingStore.updateButtonStyle(index);
                    onBoardingStore.resetColours();
                    setActiveLayout(index);
                  }}
                >
                  <img
                    className="object-cover w-full h-full"
                    src={layout.selector}
                  />
                </article>
              ))}
            </div>
            <h4 className="mt-6 font-light text-sm">
              Layout Selected:{" "}
              <span className="font-bold">
                {onBoardingButtons[activeLayout].title}
              </span>
            </h4>
          </article>
        </section>

        <section className="hidden md:block relative pt-3 pl-6 w-1/2 min-h-[500px]">
          <h3 className="absolute top-0 left-6 self-center font-bold text-lg italic opacity-50">
            Examples
          </h3>
          <div className="mt-5 relative flex flex-row items-center justify-center h-full">
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <article className="px-6 relative flex flex-col items-center gap-2 justify-center h-full aspect-[370/750] max-w-[45%]">
                  <img
                    src="/images/onboarding/mobile-frame.png"
                    className="pointer-events-none absolute w-full h-full object-contain z-50"
                  />
                  {buttonNames.map((item, index) =>
                    onBoardingButtons[activeLayout].component(
                      item,
                      activeColours,
                      index,
                    ),
                  )}
                </article>
              </>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default OnBoardingTwo;
