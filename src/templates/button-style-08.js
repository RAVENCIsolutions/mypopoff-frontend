"use client";

import { useState } from "react";
import Link from "next/link";

const ButtonStyle08 = (props) => {
  const [hover, setHover] = useState(false);

  const { link, title, palette } = props;

  return (
    <Link
      href={link}
      target={`_blank`}
      className="group relative px-5 py-1 hover:scale-105 transition-all duration-100"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`absolute left-0 top-0 w-full h-full border-2 -skew-x-[20deg]`}
        style={{
          borderColor: palette.buttonMain,
          backgroundColor: hover ? palette.buttonMain : "transparent",
        }}
      ></div>
      <p
        className={`relative left-0 top-0 flex items-center justify-center text-base sm:text-lg transition-all duration-100`}
        style={{
          color: palette.buttonText,
        }}
      >
        {title}
      </p>
    </Link>
  );
};

export default ButtonStyle08;
