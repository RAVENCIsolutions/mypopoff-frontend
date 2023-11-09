"use client";
import { useEffect, useState } from "react";

const OnBoardingThree = () => {
  const [activeLayout, setActiveLayout] = useState(0);
  const [chosenColours, setChosenColours] = useState({});

  const buttonNames = [
    "Make a Booking",
    "Join the VIP Club",
    "Visit my Website",
  ];

  const layouts = [
    {
      layoutID: "button-01",
      layoutTitle: "Solid Rounded",
      layoutImage: "/images/onboarding/button-01.png",
      colours: {
        buttonOutline: "border-transparent",
        buttonMain: "bg-action",
        buttonHover: "hover:bg-action/90",
        buttonText: "text-primary-light",
        buttonHoverText: "text-primary-light",
      },
      block: (label, index) => (
        <button
          key={`button-${index}`}
          className={`p-1 m-2 px-5 min-w-fit rounded-full ${chosenColours.buttonMain} ${chosenColours.buttonHover} ${chosenColours.buttonText} hover:${chosenColours.buttonHoverText} hover:shadow-[3px_3px_5px_rgba(0,0,0,0.25)] transition-all duration-300`}
        >
          {label}
        </button>
      ),
    },
    {
      layoutID: "button-02",
      layoutTitle: "Solid Squared",
      layoutImage: "/images/onboarding/button-02.png",
      colours: {
        buttonOutline: "border-transparent",
        buttonMain: "bg-action",
        buttonHover: "hover:bg-action/90",
        buttonText: "text-primary-light",
        buttonHoverText: "text-primary-light",
      },
      block: (label, index) => (
        <button
          key={`button-${index}`}
          className={`p-1 m-2 px-5 min-w-max ${chosenColours.buttonMain} ${chosenColours.buttonHover} ${chosenColours.buttonText} hover:${chosenColours.buttonHoverText} hover:shadow-[3px_3px_5px_rgba(0,0,0,0.25)] transition-all duration-300`}
        >
          {label}
        </button>
      ),
    },
    {
      layoutID: "button-03",
      layoutTitle: "Solid Slanted",
      layoutImage: "/images/onboarding/button-03.png",
      colours: {
        buttonOutline: "border-transparent",
        buttonMain: "bg-action",
        buttonHover: "group-hover:bg-action/90",
        buttonText: "text-primary-light",
        buttonHoverText: "text-primary-light",
      },
      block: (label, index) => (
        <button
          key={`button-${index}`}
          className="group relative m-2 px-5 w-4/6 min-w-max h-8 hover:scale-105 transition-all duration-100"
        >
          <div
            className={`absolute left-0 top-0 w-full h-full ${chosenColours.buttonMain} ${chosenColours.buttonHover} -skew-x-[20deg]`}
          ></div>
          <p
            className={`absolute left-0 top-0 flex items-center justify-center w-full h-full ${chosenColours.buttonText} ${chosenColours.buttonHoverText} text-base`}
          >
            {label}
          </p>
        </button>
      ),
    },
    {
      layoutID: "button-04",
      layoutTitle: "Neobrutalist",
      layoutImage: "/images/onboarding/button-04.png",
      colours: {
        buttonMain: "bg-action",
        buttonHover: "hover:bg-action",
        buttonText: "text-black",
      },
      block: (label, index) => (
        <button
          key={`button-${index}`}
          className={`p-1 m-2.5 px-5 min-w-max rounded-lg ${chosenColours.buttonMain} ${chosenColours.buttonHover} shadow-[5px_6px_0px_rgba(0,0,0,1)] ${chosenColours.buttonText} border-2 border-black hover:translate-x-1 hover:-translate-y-1 transition-all duration-100`}
        >
          {label}
        </button>
      ),
    },
    {
      layoutID: "button-05",
      layoutTitle: "The Grid",
      layoutImage: "/images/onboarding/button-05.png",
      colours: {
        buttonOutline: "border-action",
        buttonMain: "bg-action",
        buttonText: "text-action",
        buttonHoverText: "text-primary-light",
      },
      block: (label, index) => (
        <button
          key={`button-${index}`}
          className={`group relative p-2 pl-6 hover:pl-9 w-full flex border-t-2 ${chosenColours.buttonOutline} ${chosenColours.buttonHover} last-of-type:border-b-2 ${chosenColours.buttonText} hover:${chosenColours.buttonHoverText} transition-all duration-500 z-10`}
        >
          <div
            className={`absolute left-0 top-0 w-0 group-hover:w-full h-full ${chosenColours.buttonMain} transition-all duration-300 -z-10`}
          ></div>
          {label}
        </button>
      ),
    },
    {
      layoutID: "button-06",
      layoutTitle: "Outline Rounded",
      layoutImage: "/images/onboarding/button-06.png",
      colours: {
        buttonOutline: "border-action",
        buttonMain: "bg-transparent",
        buttonHover: "hover:bg-action",
        buttonText: "text-action",
        buttonHoverText: "hover:text-primary-light",
      },
      block: (label, index) => (
        <button
          key={`button-${index}`}
          className={`p-1 m-2 px-5 min-w-max rounded-full border-2 ${chosenColours.buttonOutline} ${chosenColours.buttonMain} ${chosenColours.buttonHover} ${chosenColours.buttonText} ${chosenColours.buttonHoverText} transition-all duration-300`}
        >
          {label}
        </button>
      ),
    },
    {
      layoutID: "button-07",
      layoutTitle: "Outline Squared",
      layoutImage: "/images/onboarding/button-07.png",
      colours: {
        buttonOutline: "border-action",
        buttonMain: "bg-transparent",
        buttonHover: "hover:bg-action",
        buttonText: "text-action",
        buttonHoverText: "hover:text-primary-light",
      },
      block: (label, index) => (
        <button
          key={`button-${index}`}
          className={`p-1 m-2 px-5 min-w-max border-2 ${chosenColours.buttonOutline} ${chosenColours.buttonMain} ${chosenColours.buttonHover} ${chosenColours.buttonText} ${chosenColours.buttonHoverText} transition-all duration-300`}
        >
          {label}
        </button>
      ),
    },
    {
      layoutID: "button-08",
      layoutTitle: "Outline Slanted",
      layoutImage: "/images/onboarding/button-08.png",
      colours: {
        buttonOutline: "border-action",
        buttonMain: "bg-transparent",
        buttonHover: "group-hover:bg-action",
        buttonText: "text-action",
        buttonHoverText: "group-hover:text-primary-light",
      },
      block: (label, index) => (
        <button
          key={`button-${index}`}
          className="group relative m-2 px-5 w-4/6 min-w-max h-8 hover:scale-105 transition-all duration-100"
        >
          <div
            className={`absolute left-0 top-0 w-full h-full border-2 ${chosenColours.buttonOutline} ${chosenColours.buttonMain} ${chosenColours.buttonHover} -skew-x-[20deg] transition-all duration-100`}
          ></div>
          <p
            className={`absolute left-0 top-0 flex items-center justify-center w-full h-full ${chosenColours.buttonText} ${chosenColours.buttonHoverText} text-base z-10`}
          >
            {label}
          </p>
        </button>
      ),
    },
    {
      layoutID: "button-09",
      layoutTitle: "Elegant List",
      layoutImage: "/images/onboarding/button-09.png",
      colours: {
        buttonOutline: "border-action",
        buttonMain: "bg-transparent",
        buttonHover: "group-hover:bg-action",
        buttonText: "text-action",
      },
      block: (label, index) => (
        <button
          key={`button-${index}`}
          className={`group p-0.5 m-2 ml-6 hover:ml-8 inline-flex self-start items-center gap-2 ${chosenColours.buttonText} transition-all duration-[0.35s]`}
        >
          <div
            className={`block px-[0.15rem] py-[0.15rem] border-[2px] ${chosenColours.buttonOutline} ${chosenColours.buttonMain} ${chosenColours.buttonHover}`}
          ></div>
          {label}
        </button>
      ),
    },
    {
      layoutID: "button-10",
      layoutTitle: "Underlined",
      layoutImage: "/images/onboarding/button-10.png",
      colours: {
        buttonMain: "bg-action",
        buttonText: "text-action",
      },
      block: (label, index) => (
        <button
          key={`button-${index}`}
          className={`group relative pt-0.5 m-2 ml-6 hover:ml-8 inline-flex self-start flex ${chosenColours.buttonText} transition-all duration-[0.35s]`}
        >
          <div
            className={`absolute pt-0.5 -left-44 group-hover:left-0 bottom-0 ${chosenColours.buttonMain} w-full z-10 transition-all duration-300`}
          ></div>
          {label}
        </button>
      ),
    },
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
      selectedColours = layouts[0].colours;
    }

    setActiveLayout(
      layouts.findIndex(
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
                {layouts[activeLayout].layoutTitle}
              </span>
            </h4>
          </article>
        </article>

        <article className="hidden md:block pt-3 relative md:w-[50%]">
          <h3 className="absolute top-0 left-10 self-end font-bold text-lg italic opacity-50">
            Examples
          </h3>
          <div className="-ml-5 md:ml-0 mt-5 relative flex justify-center">
            <article className="flex flex-col items-center justify-center aspect-[1/2] w-[40%] bg-dashboard-secondary-light/30 rounded-[2rem] overflow-hidden">
              {buttonNames.map((item, index) =>
                layouts[activeLayout].block(item, index)
              )}
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
