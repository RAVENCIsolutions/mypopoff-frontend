"use client";

import { useEffect, useState } from "react";
import { CircularProgress, TextField } from "@mui/material";
import { TwitterPicker } from "react-color";
import ColourPickerBlock from "@/components/ColourPickerBlock";
import { observer } from "mobx-react";
import onBoardingStore from "@/stores/OnBoardingStore";
import { onBoardingButtons } from "@/data/OnBoardingButtons";

const OnBoardingThree = observer(() => {
  const [loading, setLoading] = useState(false);
  const [activeLayout, setActiveLayout] = useState(0);

  const activeColours = {
    ...onBoardingStore.onBoardingCurrent.layoutColours,
    ...onBoardingStore.onBoardingCurrent.buttonColours,
  };

  useEffect(() => {
    setLoading(true);

    setLoading(false);
  }, []);

  return (
    <>
      <section className="relative mb-10 md:pt-6 flex flex-col md:flex-row items-stretch justify-between">
        <section className="md:pt-3 md:pr-6 relative flex items-center w-1/2 border-r-2">
          <h3 className="hidden md:block absolute top-0 font-bold text-base md:text-lg italic opacity-50">
            Options
          </h3>
          <article className="mt-10 p-3 md:p-5 rounded-none md:rounded-3xl w-full bg-white shadow-lg shadow-dashboard-primary-dark/10">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
              {Object.keys(activeColours).map((key, index) => {
                return (
                  <article key={key} className="w-4/5">
                    <ColourPickerBlock
                      label={onBoardingStore.colourLabels[key]}
                    />
                  </article>
                );
              })}
            </div>
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
                <article className="p-1 relative flex flex-col items-center justify-center h-full aspect-[370/750]">
                  <img
                    src="/images/onboarding/mobile-frame.png"
                    className="pointer-events-none absolute w-full h-full object-contain z-50"
                  />
                  <div className="flex flex-col items-center justify-center gap-4 w-full h-full bg-action/40 rounded-3xl overflow-hidden">
                    {onBoardingStore.onBoardingCurrent.pageLayout}
                    {onBoardingStore.onBoardingCurrent.buttonStyle}
                  </div>
                </article>
              </>
            )}
          </div>
        </section>
      </section>
    </>
  );
});

export default OnBoardingThree;
