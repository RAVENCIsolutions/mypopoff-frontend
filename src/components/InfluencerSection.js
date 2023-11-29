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

    const scrollContent = () => {
      requestAnimationFrame(() => {
        scrollElement.scrollTo({
          left: scrollElement.scrollLeft + 1,
          behavior: "auto",
        });

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
            className="group relative aspect-square w-52 md:w-72 lg:w-80 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
          >
            <img src={influencer.photo} alt={influencer.name} />
            <div className="p-4 absolute left-0 bottom-0 w-full bg-primary-dark/70 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h2 className="text-lg text-primary-light font-bold">
                @{influencer.name}
              </h2>
              <p className="text-primary-light/70 text-sm">
                {influencer.category}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const dummyData = [
  {
    photo: "/images/influencer-01.png",
    name: "Gardenism",
    category: "Lifestyle",
  },
  {
    photo: "/images/influencer-02.png",
    name: "TheCallumShow",
    category: "Entertainment",
  },
  {
    photo: "/images/influencer-03.png",
    name: "Travelover",
    category: "Travel",
  },
  {
    photo: "/images/influencer-04.png",
    name: "FoundationAndLips",
    category: "Beauty",
  },
  {
    photo: "/images/influencer-05.png",
    name: "StreetArtiste",
    category: "Creative",
  },
  {
    photo: "/images/influencer-06.png",
    name: "DEVolish",
    category: "Technology",
  },
];

export default InfluencerSection;
