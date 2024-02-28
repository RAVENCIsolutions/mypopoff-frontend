"use client";

import { useEffect, useRef, useState } from "react";

const InfluencerSection = ({ data }) => {
  const SWIPE_SENSITIVITY = 1;

  const [combinedData, setCombinedData] = useState([
    ...dummyData,
    ...dummyData,
  ]);
  const scrollRef = useRef(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [startingX, setStartingX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsSwiping(true);
    setStartingX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isSwiping) return;

    e.preventDefault();

    console.log(scrollRef.current.scrollWidth);
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startingX) * SWIPE_SENSITIVITY;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      className="max-w-full overflow-hidden"
      ref={scrollRef}
      onMouseLeave={() => setIsSwiping(false)}
      onMouseUp={() => setIsSwiping(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="relative flex gap-3 md:gap-8 -left-10 whitespace-nowrap min-w-fit scroll-smooth"
        onMouseDown={handleMouseDown}
      >
        {combinedData.map((influencer, index) => (
          <article
            key={index}
            className={`group relative aspect-square w-32 md:w-48 lg:w-60 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-300 ease-in-out`}
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
