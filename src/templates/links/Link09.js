"use client";

import { useState } from "react";
import Link from "next/link";

const Link09 = ({ title, url, palette }) => {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={url}
      className={`group py-0.5 -ml-4 hover:ml-0 inline-flex self-start items-center gap-2 uppercase transition-all duration-[0.35s]`}
      style={{
        color: palette.buttonText,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`block px-[0.15rem] py-[0.15rem] border-[2px]`}
        style={{
          borderColor: palette.buttonOutline,
          backgroundColor: hover ? palette.buttonHover : "transparent",
        }}
      ></div>
      {title}
    </Link>
  );
};

export default Link09;
