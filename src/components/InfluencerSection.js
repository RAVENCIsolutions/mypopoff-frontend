"use client";

import { useEffect, useRef, useState } from "react";

const InfluencerSection = ({ data }) => {
  // Data is expected to hold
  // - photo from influencer
  // - name of influencer
  // - category of influencer's work
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    let intervalId = null;

    console.log(scrollRef.current);

    const scrollContent = () => {
      requestAnimationFrame(() => {
        scrollElement.scrollLeft = scrollElement.scrollLeft + 0.75;

        if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
          scrollElement.scrollLeft = 0;
        }
      });
    };

    intervalId = setInterval(scrollContent, 16);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const combinedData = [...dummyData, ...dummyData];

  return (
    <section className="max-w-full overflow-hidden" ref={scrollRef}>
      <div className="relative flex gap-8 whitespace-nowrap w-fit">
        {combinedData.map((influencer, index) => (
          <article
            key={index}
            className="relative aspect-square w-52 md:w-72 lg:w-80 border-2 border-gray-300 rounded-3xl overflow-hidden"
          >
            <img src={influencer.photo} alt={influencer.name} />
            {/*<div className="p-7 absolute left-0 bottom-0 w-full">*/}
            {/*  <h2 className="text-xl text-primary-light font-bold">*/}
            {/*    {influencer.name}*/}
            {/*  </h2>*/}
            {/*  <p className="text-primary-light/70">{influencer.category}</p>*/}
            {/*</div>*/}
          </article>
        ))}
      </div>
    </section>
  );
};

const dummyData = [
  {
    photo: "https://placehold.co/390x390",
    name: "Influencer One",
    category: "Category One",
  },
  {
    photo: "https://placehold.co/390x390",
    name: "Influencer One",
    category: "Category One",
  },
  {
    photo: "https://placehold.co/390x390",
    name: "Influencer One",
    category: "Category One",
  },
  {
    photo: "https://placehold.co/390x390",
    name: "Influencer One",
    category: "Category One",
  },
  {
    photo: "https://placehold.co/390x390",
    name: "Influencer One",
    category: "Category One",
  },
];

export default InfluencerSection;
