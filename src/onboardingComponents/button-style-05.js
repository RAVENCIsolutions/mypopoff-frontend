import { useState } from "react";
import Link from "next/link";

const ButtonStyle05 = (props) => {
  const [hover, setHover] = useState(false);

  const { link, title, palette } = props;

  return (
    <Link
      href={link}
      className={`group relative p-3 pl-6 hover:pl-9 w-full flex border-t-2 last-of-type:border-b-2 transition-all duration-500 z-10`}
      style={{
        borderColor: palette.buttonMain,
        backgroundColor: hover ? palette.buttonMain : "transparent",
        color: palette.buttonText,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p
        className={`absolute left-0 top-0 w-0 group-hover:w-full h-full transition-all duration-300 -z-10`}
        style={{ backgroundColor: palette.buttonMain }}
      ></p>
      {title}
    </Link>
  );
};

export default ButtonStyle05;
