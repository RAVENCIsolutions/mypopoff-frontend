"use client";

import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

const OnBoardingThree = () => {
  const [chosenColours, setChosenColours] = useState({});

  const inputLabels = {
    background: "Background",
    midground: "Card",
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

    setChosenColours(selectedColours);
  }, []);

  return (
    <>
      <section className="relative pb-4 md:pt-6 flex flex-col md:flex-row gap-2">
        <article className="md:pt-3 relative flex items-center justify-center w-full md:w-[50%] border-r-2">
          <h3 className="hidden md:block absolute top-0 font-bold text-base md:text-lg italic opacity-50">
            Options:
          </h3>
          <article className="md:mt-5 p-3 md:p-5 rounded-none md:rounded-3xl w-full bg-white shadow-lg shadow-dashboard-primary-dark/20 border-2 max-w-none md:max-w-md">
            <div className="flex flex-col gap-6">
              {Object.keys(chosenColours).map((key, index) => {
                return (
                  <TextField
                    key={key}
                    id="standard-helperText"
                    label={inputLabels[key]}
                    defaultValue="Default Value"
                    variant="standard"
                  />
                );
              })}
            </div>
            <h4 className="font-light text-sm">
              Layout Selected: <span className="font-bold">#ffffff</span>
            </h4>
          </article>
        </article>

        <article className="hidden md:block pt-3 relative md:w-[50%]">
          <h3 className="absolute top-0 left-10 self-end font-bold text-lg italic opacity-50">
            Examples
          </h3>
          <div className="-ml-5 md:ml-0 mt-5 relative flex items-start justify-center h-full">
            <article className="flex flex-col items-center justify-center aspect-[1/2] w-[40%] bg-dashboard-secondary-light/30 rounded-[2rem] overflow-hidden">
              <div className="scale-50">{}</div>
              <img
                src={"/images/onboarding/mobile-frame.png"}
                className="absolute pointer-events-none aspect-[1/2] w-[40%] z-50"
              />
            </article>
          </div>
        </article>
      </section>
    </>
  );
};

export default OnBoardingThree;
