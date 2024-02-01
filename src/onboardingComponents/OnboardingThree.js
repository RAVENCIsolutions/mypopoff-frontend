"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import onBoardingStore from "@/stores/OnboardingStore";
import { OnboardingLayouts } from "@/data/OnboardingLayouts";

const OnboardingThree = observer((props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLayoutSelect = (index) => {
    setActiveIndex(index);
    onBoardingStore.updateLayout(index);
  };

  useEffect(() => {
    const activeLayoutIndex = OnboardingLayouts.findIndex(
      (item) => item.id === onBoardingStore.userData.page_layout,
    );

    setActiveIndex(activeLayoutIndex);
  }, []);

  return (
    <section
      className={`p-6 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 xs:gap-4 lg:gap-9 bg-white rounded-3xl w-full`}
    >
      {props.pageLayouts &&
        props.pageLayouts.map((layout, index) => (
          <article
            key={`page-layout-${index}`}
            className={`group cursor-pointer relative flex items-center justify-center rounded-lg md:rounded-2xl ${
              activeIndex === index
                ? "shadow-lg shadow-black/20"
                : "grayscale hover:shadow-lg shadow-black/20"
            } transition-all duration-150`}
            onClick={() => handleLayoutSelect(index)}
          >
            <div
              className={`absolute ${
                activeIndex === index
                  ? "border-[2px] border-action"
                  : "border-[1px] hover:border-dashboard-secondary-dark"
              } rounded-lg md:rounded-2xl w-full h-full transition-all duration-300`}
            ></div>
            <img
              className={`p-2 h-full rounded-lg md:rounded-2xl`}
              src={layout.selector}
              alt={layout.title}
            />
          </article>
        ))}
    </section>
  );
});

export default OnboardingThree;
