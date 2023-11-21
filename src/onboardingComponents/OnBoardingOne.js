"use client";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import { observer } from "mobx-react";
import onBoardingStore from "@/stores/OnBoardingStore";
import { onBoardingLayouts } from "@/data/OnBoardingLayouts";

const OnBoardingOne = observer((props) => {
  const [activeLayout, setActiveLayout] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    props.setGreenLight(true);

    const currentToIndex = onBoardingLayouts.findIndex(
      (layout) =>
        layout.layoutID === onBoardingStore.onBoardingCurrent.pageLayout
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
              {onBoardingLayouts.map((layout, index) => (
                <article
                  key={`image-${index}`}
                  className={`cursor-pointer bg-white rounded-lg overflow-hidden transition-all duration-300 ${
                    activeLayout === index
                      ? "border-[2px] border-action opacity-100 shadow-lg shadow-black/30"
                      : "border-[1px] border-primary-dark opacity-30 hover:opacity-100"
                  }`}
                  onClick={() => {
                    onBoardingStore.updateLayout(index);
                    onBoardingStore.resetColours();
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
        </section>

        <section className="hidden md:block relative pt-3 pl-6 w-1/2 min-h-[500px]">
          <h3 className="absolute top-0 left-6 self-center font-bold text-lg italic opacity-50">
            Examples
          </h3>
          <div className="mt-5 relative flex flex-row items-center justify-between h-full">
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <article className="absolute h-full aspect-[370/750] max-w-[45%] left-1/2 -translate-x-1/2 bg-contain bg-[url('/images/onboarding/mobile-frame.png')] bg-no-repeat bg-center z-50"></article>
                <article className="relative h-full aspect-[370/750] max-w-[30%] opacity-60">
                  <img
                    src={onBoardingLayouts[activeLayout].images[0] || ""}
                    className="w-full h-full object-contain object-center"
                  />
                </article>
                <article className="absolute h-full aspect-[370/750] max-w-[45%] left-1/2 -translate-x-1/2 z-20">
                  <img
                    src={onBoardingLayouts[activeLayout].images[1] || ""}
                    className="w-full h-full object-contain object-center"
                  />
                </article>
                <article className="relative h-full aspect-[370/750] max-w-[30%] opacity-60">
                  <img
                    src={onBoardingLayouts[activeLayout].images[2] || ""}
                    className="w-full h-full object-contain object-center"
                  />
                </article>
              </>
            )}
          </div>
        </section>
      </section>
    </>
  );
});

export default OnBoardingOne;
