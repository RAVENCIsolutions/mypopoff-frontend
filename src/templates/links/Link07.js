"use client";

import { useState } from "react";
import Link from "next/link";

const Link07 = ({ title, url, palette }) => {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={url}
      className={`p-1 px-5 mx-2 min-w-max border-2 transition-all duration-300`}
      style={{
        borderColor: palette.buttonOutline,
        backgroundColor: hover ? palette.buttonHover : "transparent",
        color: hover ? palette.buttonHoverText : palette.buttonText,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {title}
    </Link>
  );
};

export default Link07;
