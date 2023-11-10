"use client";

import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { TwitterPicker } from "react-color";
import ColourPickerBlock from "@/components/ColourPickerBlock";

const OnBoardingThree = () => {
  const [chosenColours, setChosenColours] = useState({});

  const inputLabels = {
    background: "Background",
    middleGround: "Card",
    mainText: "Special Text",
    subText: "Body Text",
    buttonOutline: "Outline",
    buttonMain: "Button Background",
    buttonHover: "Button Background on Hover",
    buttonText: "Text",
    buttonHoverText: "Text on Hover",
  };

  let prevChoice;
  let selectedColours = {};

  useEffect(() => {
    const storedSelectedLayout = localStorage.getItem("selectedLayout");

    if (storedSelectedLayout) {
      try {
        prevChoice = JSON.parse(storedSelectedLayout);
        selectedColours = prevChoice.colours;
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    }

    console.log(selectedColours);
    setChosenColours(selectedColours);
  }, []);

  return (
    <>
      <section className="relative pb-4 md:pt-6 flex flex-col md:flex-row gap-2">
        <article className="md:pt-3 md:pr-8 relative flex items-center justify-center w-full md:w-[60%] border-r-2">
          <h3 className="hidden md:block absolute top-0 font-bold text-base md:text-lg italic opacity-50">
            Options:
          </h3>
          <article className="md:mt-5 p-3 md:p-5 rounded-none md:rounded-3xl w-full bg-white shadow-lg shadow-dashboard-primary-dark/20 border-2 max-w-none md:max-w-md">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-8">
              {Object.keys(chosenColours).map((key, index) => {
                return (
                  <article key={key} className="w-4/5">
                    <ColourPickerBlock label={inputLabels[key]} />
                  </article>
                );
              })}
            </div>
            <h4 className="font-light text-sm">
              Layout Selected: <span className="font-bold">#ffffff</span>
            </h4>
          </article>
        </article>

        <article className="hidden md:block pt-3 relative md:w-[40%]">
          <h3 className="absolute top-0 left-10 self-end font-bold text-lg italic opacity-50">
            Examples
          </h3>
          <div className="-ml-5 md:ml-0 mt-5 relative flex items-start justify-center h-full">
            <article className="flex flex-col items-center justify-center aspect-[1/2] w-[60%] lg:w-[45%] bg-dashboard-secondary-light/30 rounded-[2rem] overflow-hidden">
              <div className="flex flex-col items-center justify-center gap-4 w-full h-full bg-action/40">
                {[1, 2, 3].map((item, index) => (
                  <button className="p-1 bg-action w-4/5">Button Text</button>
                ))}
              </div>

              <img
                src={"/images/onboarding/mobile-frame.png"}
                className="absolute pointer-events-none aspect-[1/2] w-[60%] lg:w-[45%] z-50"
              />
            </article>
          </div>
        </article>
      </section>
    </>
  );
};

export default OnBoardingThree;
