import { useState } from "react";
import { observer } from "mobx-react";

import Link from "next/link";

const ButtonStyle03 = observer((props) => {
  const { link, title, palette } = props;

  return (
    <Link
      href={link}
      className="group relative px-5 py-1 mx-2 min-w-fit hover:scale-105 transition-all duration-100"
    >
      <div
        className={`absolute left-0 top-0 w-full h-full group-hover:opacity-80 -skew-x-[20deg] transition-all duration-100`}
        style={{
          backgroundColor: palette.buttonMain,
          color: palette.buttonText,
        }}
      ></div>
      <p
        className={`relative left-0 top-0 flex items-center justify-center text-base transition-all duration-100 z-10`}
        style={{
          color: palette.buttonText,
          whiteSpace: "none",
        }}
      >
        {title}
      </p>
    </Link>
  );
});

export default ButtonStyle03;
