import { useState } from "react";
import Link from "next/link";

const ButtonStyle10 = (props) => {
  const [hover, setHover] = useState(false);

  const { link, title, palette } = props;

  return (
    <Link
      href={link}
      className={`group relative ml-6 hover:ml-8 inline-flex self-start flex transition-all duration-[0.35s]`}
      style={{
        color: palette.buttonText,
      }}
    >
      <div
        className={`absolute bottom-0 w-0 group-hover:w-full z-10 transition-all duration-300`}
        style={{ height: "1.5px", backgroundColor: palette.buttonMain }}
      ></div>
      {title}
    </Link>
  );
};

export default ButtonStyle10;
