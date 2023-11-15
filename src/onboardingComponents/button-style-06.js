import { useState } from "react";

const ButtonStyle06 = (props) => {
  const [hover, setHover] = useState(false);

  const { label, palette } = props;

  return (
    <button
      className={`p-1 m-2 px-5 min-w-max rounded-full border-2 transition-all duration-300`}
      style={{
        borderColor: palette.buttonOutline,
        backgroundColor: hover ? palette.buttonHover : "transparent",
        color: hover ? palette.buttonHoverText : palette.buttonText,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
    </button>
  );
};

export default ButtonStyle06;
