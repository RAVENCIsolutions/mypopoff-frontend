import { useState } from "react";
import Link from "next/link";

const ButtonStyle01 = (props) => {
  const [hover, setHover] = useState(false);

  const { label, palette } = props;

  return (
    <Link
      href={link.url}
      key={`link-${index}`}
      className={`pt-1.5 pb-1 px-5 mx-auto min-w-44 max-w-full rounded-full hover:opacity-80 hover:shadow-[3px_3px_5px_rgba(0,0,0,0.25)] hover:scale-105 text-center transition-all duration-300`}
      style={{
        backgroundColor: palette.buttonMain,
        color: palette.buttonText,
      }}
    >
      {link.title}
    </Link>
  );
};

export default ButtonStyle01;
