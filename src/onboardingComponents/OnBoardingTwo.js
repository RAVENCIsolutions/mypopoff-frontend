"use client";
import { useEffect, useState } from "react";
import { onBoardingButtons } from "@/data/OnBoardingButtons";

const OnBoardingTwo = () => {
  const [activeLayout, setActiveLayout] = useState(0);
  const [chosenColours, setChosenColours] = useState({});

  const buttonNames = [
    "Make a Booking",
    "Join the VIP Club",
    "Visit my Website",
  ];

  useEffect(() => {
    let prevChoice;
    let selectedColours = {};

    const storedSelectedLayout = localStorage.getItem("selectedLayout");

    if (storedSelectedLayout) {
      try {
        prevChoice = JSON.parse(storedSelectedLayout);
        selectedColours = prevChoice.colours;
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    } else {
      selectedColours = onBoardingButtons[0].colours;
    }

    setActiveLayout(
      onBoardingButtons.findIndex(
        (layout) => layout.layoutID === prevChoice.buttonType
      ) || 0
    );
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
                    const prevChoice = JSON.parse(
                      localStorage.getItem("selectedLayout")
                    );

                    prevChoice.buttonType = layout.layoutID;

                    prevChoice.colours = {
                      ...prevChoice.colours,
                      ...layout.colours,
                    };

                    localStorage.setItem(
                      "selectedLayout",
                      JSON.stringify(prevChoice)
                    );

                    setChosenColours(prevChoice.colours);
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
                {onBoardingButtons[activeLayout].layoutTitle}
              </span>
            </h4>
          </article>
        </article>

        <article className="hidden md:block pt-3 relative md:w-[50%]">
          <h3 className="absolute top-0 left-10 self-end font-bold text-lg italic opacity-50">
            Examples
          </h3>
          <div className="-ml-5 md:ml-0 mt-5 relative flex justify-center">
            <article className="relative flex flex-col items-center justify-center aspect-[1/2] min-w-[45%] bg-dashboard-secondary-light/30 rounded-[2rem]">
              {buttonNames.map((item, index) =>
                onBoardingButtons[activeLayout].block(
                  item,
                  chosenColours,
                  index
                )
              )}
              <img
                src={"/images/onboarding/mobile-frame.png"}
                className="absolute pointer-events-none aspect-[1/2] w-full z-50"
              />
            </article>
          </div>
        </article>
      </section>
    </>
  );
};

export default OnBoardingTwo;
