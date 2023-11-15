import { useState } from "react";

const ButtonStyle05 = (props) => {
  const [hover, setHover] = useState(false);

  const { label, palette } = props;

  return (
    <button
      className={`group relative p-2 pl-6 hover:pl-9 w-full flex border-t-2 last-of-type:border-b-2 transition-all duration-500 z-10`}
      style={{
        borderColor: palette.buttonOutline,
        color: hover ? palette.buttonHoverText : palette.buttonText,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`absolute left-0 top-0 w-0 group-hover:w-full h-full transition-all duration-300 -z-10`}
        style={{ backgroundColor: palette.buttonMain }}
      ></div>
      {label}
    </button>
  );
};

export default ButtonStyle05;
