import { useState } from "react";
import Link from "next/link";

const ButtonStyle01 = (props) => {
  const [hover, setHover] = useState(false);

  const { link, index, title, palette } = props;

  return (
    <Link
      href={link}
      className={`py-1.5 px-5 mx-auto min-w-44 max-w-full rounded-full hover:opacity-80 hover:shadow-[3px_3px_5px_rgba(0,0,0,0.25)] hover:scale-105 text-center transition-all duration-300`}
      style={{
        backgroundColor: palette.buttonMain,
        color: palette.buttonText,
      }}
    >
      {title}
    </Link>
  );
};

export default ButtonStyle01;
