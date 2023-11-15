import { useState } from "react";

const ButtonStyle09 = (props) => {
  const [hover, setHover] = useState(false);

  const { label, palette } = props;

  return (
    <button
      className={`group p-0.5 m-2 ml-6 hover:ml-8 inline-flex self-start items-center gap-2 transition-all duration-[0.35s]`}
      style={{
        color: palette.buttonText,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`block px-[0.15rem] py-[0.15rem] border-[2px]`}
        style={{
          borderColor: palette.buttonOutline,
          backgroundColor: hover ? palette.buttonHover : "transparent",
        }}
      ></div>
      {label}
    </button>
  );
};

export default ButtonStyle09;
