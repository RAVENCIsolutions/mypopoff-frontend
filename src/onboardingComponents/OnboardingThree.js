"use client";

import { useEffect, useRef, useState } from "react";

import { LayoutsLookup } from "@/data/LayoutsLookup";
import onBoardingStore from "@/stores/OnboardingStore";
import { ButtonsLookup } from "@/data/ButtonsLookup";

const OnboardingThree = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);

  const handleLayoutSelect = (index) => {
    setActiveIndex(index);
    onBoardingStore.setUserData({
      ...onBoardingStore.userData,
      page_layout: LayoutsLookup[index].id,
    });

    // Layout-10 and Button-04 are exclusive to each other
    if (LayoutsLookup[index].id === "layout-10") {
      setSelectedButton(
        ButtonsLookup.findIndex((item) => item.id === "button-04")
      );
    } else {
      selectedButton ===
        ButtonsLookup.findIndex((item) => item.id === "button-04") &&
        setSelectedButton(0);
    }
  };

  const handleButtonSelect = (index) => {
    setSelectedButton(index);

    onBoardingStore.setUserData({
      ...onBoardingStore.userData,
      button_style: ButtonsLookup[index].id,
    });
  };

  useEffect(() => {
    const selectedLayoutIndex = Math.max(
      0,
      LayoutsLookup.findIndex(
        (layout) => layout.id === onBoardingStore.userData.page_layout
      )
    );

    const selectedButtonIndex = Math.max(
      0,
      ButtonsLookup.findIndex(
        (button) => button.id === onBoardingStore.userData.button_style
      )
    );

    setActiveIndex(selectedLayoutIndex);
    setSelectedButton(selectedButtonIndex);
  }, []);

  return (
    <section
      className={`p-3 2xs:p-4 xs:p-6 flex flex-col gap-10 bg-white rounded-none sm:rounded-3xl w-full`}
    >
      <div>
        <h4 className="mb-2 text-base font-bold text-left md:text-left">
          Choose a Page Layout:
        </h4>
        <article
          className={`grid grid-cols-2 3xs:grid-cols-3 2xs:grid-cols-4 sm:grid-cols-6 gap-4 w-full`}
        >
          {LayoutsLookup.map((layout, index) => (
            <div
              key={`page-layout-${index}`}
              className={`cursor-pointer mx-auto ${
                activeIndex === index
                  ? "opacity-100"
                  : "opacity-30 hover:opacity-100"
              } transition-all duration-300`}
              onClick={() => handleLayoutSelect(index)}
            >
              <img
                className={`${
                  activeIndex === index
                    ? "border-action shadow-xl shadow-primary-dark/10"
                    : "border-dashboard-primary-dark/30"
                } border-2 rounded-lg overflow-hidden transition-all duration-300`}
                src={layout.selector}
                alt={layout.title}
              />
            </div>
          ))}
        </article>
      </div>

      <div>
        <h4 className="mb-2 text-base font-bold text-left md:text-left">
          Choose a Button Style:
        </h4>
        <article
          className={`grid grid-cols-2 3xs:grid-cols-3 2xs:grid-cols-4 sm:grid-cols-6 gap-4 w-full`}
        >
          {ButtonsLookup.map((item, index) => (
            <div
              key={`button-selector-${index}`}
              className={`cursor-pointer mx-auto ${
                selectedButton === index
                  ? "opacity-100"
                  : "opacity-30 hover:opacity-100"
              } ${
                ((LayoutsLookup[activeIndex].id === "layout-10" &&
                  item.id !== "button-04") ||
                  (LayoutsLookup[activeIndex].id !== "layout-10" &&
                    item.id === "button-04")) &&
                "hidden"
              } transition-all duration-300`}
              onClick={() => {
                handleButtonSelect(index);
              }}
            >
              <img
                key={`button-selector-${index}`}
                src={item.selector}
                alt={item.title}
                width={80}
                height={(80 * 23) / 12}
                className={`${
                  selectedButton === index
                    ? "border-action shadow-xl shadow-primary-dark/10"
                    : "border-dashboard-primary-dark/30"
                }  border-2 rounded-lg overflow-hidden transition-all duration-300`}
              />
            </div>
          ))}
        </article>
      </div>
    </section>
  );
};

export default OnboardingThree;
