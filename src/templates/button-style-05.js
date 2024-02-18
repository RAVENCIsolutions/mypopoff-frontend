"use client";

import { useState } from "react";
import Link from "next/link";

const ButtonStyle05 = (props) => {
  const [hover, setHover] = useState(false);

  const { link, title, palette } = props;

  return (
    <Link
      href={link}
      target={`_blank`}
      className={`group relative p-3 w-full flex border-t-2 last-of-type:border-b-2 transition-all duration-300 z-10`}
      style={{
        borderColor: palette.buttonMain,
        backgroundColor: hover ? palette.buttonMain : "transparent",
        color: palette.buttonText,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`absolute left-0 top-0 w-0 group-hover:w-full h-full transition-all duration-300 -z-10`}
        style={{ backgroundColor: palette.buttonMain }}
      ></div>
      <p
        className={`group-hover:translate-x-3 text-base sm:text-lg transition-all duration-500`}
      >
        {title}
      </p>
    </Link>
  );
};

export default ButtonStyle05;
