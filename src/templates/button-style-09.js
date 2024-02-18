"use client";

import { useState } from "react";
import Link from "next/link";

const ButtonStyle09 = (props) => {
  const [hover, setHover] = useState(false);

  const { link, title, palette } = props;

  return (
    <Link
      href={link}
      target={`_blank`}
      className={`group flex self-start items-center gap-2 transition-all duration-300`}
      style={{
        color: palette.buttonText,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`block group-hover:ml-2 px-[0.15rem] py-[0.15rem] border-2 text-base sm:text-lg transition-all duration-300`}
        style={{
          borderColor: palette.buttonMain,
          backgroundColor: hover ? palette.buttonMain : "transparent",
        }}
      ></div>
      {title}
    </Link>
  );
};

export default ButtonStyle09;
