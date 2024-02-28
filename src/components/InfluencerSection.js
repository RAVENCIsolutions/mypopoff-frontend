"use client";

import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@mui/material";

let repeats = 0;

const InfluencerSection = ({ data }) => {
  const SWIPE_SENSITIVITY = 1;

  const [combinedData, setCombinedData] = useState([
    ...dummyData,
    ...dummyData,
  ]);

  const scrollRef = useRef(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [startingX, setStartingX] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [loading, setLoading] = useState(true);
  const [wrapperOpacity, setWrapperOpacity] = useState({
    skeleton: 1,
    data: 0,
  });

  useEffect(() => {
    setWrapperOpacity({
      ...wrapperOpacity,
      skeleton: 0,
    });

    setTimeout(() => {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
      setWrapperOpacity({
        ...wrapperOpacity,
        data: 1,
      });
      setLoading(false);
    }, 500);
  }, []);

  const handleStopSwiping = () => {
    const { scrollLeft, offsetLeft, scrollWidth } = scrollRef.current;

    setIsSwiping(false);

    // console.log(scrollLeft);
    //
    // // add data to the left
    // if (scrollLeft <= scrollWidth / repeats) {
    //   const newData = [...dummyData, ...combinedData];
    //   setCombinedData(newData);
    //
    //   scrollRef.current.scrollLeft += scrollWidth / repeats;
    //   repeats++;
    // }
  };

  const handleMouseDown = (e) => {
    const { scrollLeft, offsetLeft } = scrollRef.current;

    setIsSwiping(true);
    setStartingX(e.pageX - offsetLeft);
    setScrollPosition(scrollLeft);
  };

  const handleMouseMove = (e) => {
    const { scrollLeft, offsetLeft, scrollWidth } = scrollRef.current;

    if (!isSwiping) return;

    e.preventDefault();

    const x = e.pageX - offsetLeft;
    const walk = (x - startingX) * SWIPE_SENSITIVITY;
    scrollRef.current.scrollLeft = scrollPosition - walk;

    const delta = startingX - x > 0 ? 1 : -1;

    // add data to the right
    if (scrollLeft >= scrollWidth - scrollWidth / repeats && delta > 0) {
      setCombinedData((prevData) => [...prevData, ...dummyData]);
      repeats++;
    }
  };

  return (
    <section
      className="max-w-full overflow-hidden"
      ref={scrollRef}
      onMouseLeave={handleStopSwiping}
      onMouseUp={handleStopSwiping}
      onMouseMove={handleMouseMove}
    >
      <div
        className="relative flex gap-3 md:gap-8 whitespace-nowrap min-w-fit scroll-smooth"
        onMouseDown={handleMouseDown}
      >
        {loading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
              <div
                key={`skeleton-card-${index}`}
                className={`aspect-square w-32 sm:w-40 md:w-48 lg:w-60 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden`}
                style={{
                  opacity: wrapperOpacity.skeleton,
                  transition: "opacity 0.5s ease-in-out",
                }}
              >
                <Skeleton
                  variant="rect"
                  animation={"wave"}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            {combinedData.map((influencer, index) => (
              <article
                key={`influencer-card-${index}`}
                className={`group relative aspect-square w-32 sm:w-40 md:w-48 lg:w-60 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-300 ease-in-out`}
                style={{
                  opacity: wrapperOpacity.data,
                  transition: "opacity 0.5s ease-in-out",
                }}
              >
                <img src={influencer.photo} alt={influencer.name} />
                <div className="p-2 sm:p-3 md:p-4 absolute left-0 bottom-0 w-full bg-primary-dark/70 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h2 className="text-sm md:text-lg text-primary-light font-bold">
                    @{influencer.name}
                  </h2>
                  <p className="text-primary-light/70 text-sm">
                    {influencer.category}
                  </p>
                </div>
              </article>
            ))}
          </>
        )}
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
