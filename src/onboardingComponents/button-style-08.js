import { useState } from "react";

const ButtonStyle08 = (props) => {
  const [hover, setHover] = useState(false);

  const { label, palette } = props;

  return (
    <button
      className="group relative m-2 px-5 w-4/6 min-w-max h-8 hover:scale-105 transition-all duration-100"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`absolute left-0 top-0 w-full h-full border-2 -skew-x-[20deg] transition-all duration-100`}
        style={{
          borderColor: palette.buttonOutline,
          backgroundColor: hover ? palette.buttonHover : "transparent",
        }}
      ></div>
      <p
        className={`absolute left-0 top-0 flex items-center justify-center w-full h-full text-base z-10`}
        style={{
          color: hover ? palette.buttonHoverText : palette.buttonText,
        }}
      >
        {label}
      </p>
    </button>
  );
};

export default ButtonStyle08;
