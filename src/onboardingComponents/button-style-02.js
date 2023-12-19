import { useState } from "react";

const ButtonStyle02 = (props) => {
  const [hover, setHover] = useState(false);

  const { label, palette } = props;

  return (
    <button
      className={`p-1 px-5 mx-2 w-full hover:opacity-80 hover:shadow-[3px_3px_5px_rgba(0,0,0,0.25)] hover:scale-105 transition-all duration-300`}
      style={{
        backgroundColor: palette.buttonMain,
        color: palette.buttonText,
      }}
    >
      {label}
    </button>
  );
};

export default ButtonStyle02;
