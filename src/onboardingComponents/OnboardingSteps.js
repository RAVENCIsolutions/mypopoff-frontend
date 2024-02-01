"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

const OnboardingSteps = (props) => {
  const [activeIndex, setActiveIndex] = useState(props.active);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveIndex(props.active);
    setLoading(false);
  }, [props]);

  return (
    <section
      className={`px-0 sm:px-4 pt-3 lg:pt-5 pb-3 lg:pb-4 flex items-center justify-between gap-0 md:gap-2 w-full max-w-2xl border-y-[1px] border-stone-200`}
    >
      {props.pages &&
        props.pages.map((page, index) => {
          return (
            <article
              key={`onboarding-${index}`}
              className={`flex flex-col items-center justify-center w-28 text-center ${
                activeIndex === index ? "text-action" : "text-black"
              } ${
                index <= activeIndex ? "opacity-100" : "opacity-10"
              } transition-all duration-500`}
            >
              <h3
                className={`text-xl sm:text-2xl lg:text-3xl font-bold leading-5`}
              >
                {page.index}
              </h3>
              <p
                className={`hidden sm:block text-base lg:text-lg ${
                  index <= activeIndex ? "font-bold" : "font-normal"
                }`}
              >
                {page.title}
              </p>
            </article>
          );
        })}
    </section>
  );
};

export default OnboardingSteps;
