"use client";

import { useEffect, useState } from "react";

import { LayoutsLookup } from "@/data/LayoutsLookup";
import onBoardingStore from "@/stores/OnboardingStore";
import onboardingStore from "@/stores/OnboardingStore";

const OnboardingThree = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLayoutSelect = (index) => {
    setActiveIndex(index);
    onboardingStore.setUserData({
      ...onboardingStore.userData,
      page_layout: LayoutsLookup[index],
    });
  };

  useEffect(() => {
    const activeLayoutIndex = LayoutsLookup.findIndex(
      (item) => item.id === onBoardingStore.userData.page_layout
    );

    setActiveIndex(activeLayoutIndex);
  }, []);

  return (
    <section
      className={`p-3 xs:p-6 grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 gap-4 bg-white rounded-none xs:rounded-3xl w-full`}
    >
      {LayoutsLookup.map((layout, index) => (
        <article
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
        </article>
      ))}
    </section>
  );
};

export default OnboardingThree;
