"use client";

import { useState } from "react";
import Link from "next/link";

const ButtonStyle07 = (props) => {
  const [hover, setHover] = useState(false);

  const { link, title, palette } = props;

  return (
    <Link
      href={link}
      target={`_blank`}
      className={`px-5 py-1.5 border-2 text-base sm:text-lg transition-all duration-300`}
      style={{
        borderColor: palette.buttonMain,
        backgroundColor: hover ? palette.buttonMain : "transparent",
        color: palette.buttonText,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {title}
    </Link>
  );
};

export default ButtonStyle07;
