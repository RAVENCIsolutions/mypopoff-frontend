"use client";

import { useState } from "react";
import { observer } from "mobx-react";

const OnBoardingFour = observer((props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className={`p-6 grid grid-cols-5 gap-7 bg-white rounded-3xl w-full`}
    >
      {props.pageLayouts &&
        props.pageLayouts.map((layout, index) => (
          <article
            key={`page-layout-${index}`}
            className={`group cursor-pointer relative rounded-2xl ${
              activeIndex === index
                ? "shadow-lg shadow-black/20"
                : "hover:shadow-lg shadow-black/20"
            } aspect-[12/23] transition-all duration-300`}
            onClick={() => setActiveIndex(index)}
          >
            <div
              className={`absolute ${
                activeIndex === index
                  ? "border-[2px] border-action"
                  : "border-[1px] hover:border-dashboard-secondary-dark"
              } rounded-2xl w-full h-full transition-all duration-300`}
            ></div>
            <img
              className={`p-2 h-full rounded-2xl aspect-[12/23]`}
              src={layout.layoutImage}
              alt={layout.layoutTitle}
            />
          </article>
        ))}
    </section>
  );
});

export default OnBoardingFour;
