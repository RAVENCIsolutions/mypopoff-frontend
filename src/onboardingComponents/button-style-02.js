import { useState } from "react";
import Link from "next/link";

const ButtonStyle02 = (props) => {
  const { link, title, palette } = props;

  return (
    <Link
      href={link}
      className={`p-1 px-5 mx-2 w-full text-center hover:opacity-80 hover:shadow-[3px_3px_5px_rgba(0,0,0,0.25)] hover:scale-105 transition-all duration-300`}
      style={{
        backgroundColor: palette.buttonMain,
        color: palette.buttonText,
      }}
    >
      {title}
    </Link>
  );
};

export default ButtonStyle02;
