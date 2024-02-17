import { useState } from "react";
import Link from "next/link";

const ButtonStyle09 = (props) => {
  const [hover, setHover] = useState(false);

  const { link, title, palette } = props;

  return (
    <Link
      href={link}
      className={`group p-0.5 ml-0 hover:ml-4 inline-flex self-start items-center gap-2 transition-all duration-[0.35s]`}
      style={{
        color: palette.buttonText,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`block px-[0.15rem] py-[0.15rem] border-[2px]`}
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
