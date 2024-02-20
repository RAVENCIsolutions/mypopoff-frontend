"use client";

import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Set initial window width
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

export default useWindowWidth;
