import { useState } from "react";
import Link from "next/link";

const ButtonStyle06 = (props) => {
  const [hover, setHover] = useState(false);

  const { link, title, palette } = props;

  return (
    <Link
      href={link}
      className={`p-1 px-5 mx-2 min-w-max rounded-full border-2 text-center transition-all duration-300`}
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

export default ButtonStyle06;
