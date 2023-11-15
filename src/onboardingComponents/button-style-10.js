import { useState } from "react";

const ButtonStyle10 = (props) => {
  const [hover, setHover] = useState(false);

  const { label, palette } = props;

  return (
    <button
      className={`group relative pt-0.5 m-2 ml-6 hover:ml-8 inline-flex self-start flex transition-all duration-[0.35s]`}
      style={{
        color: palette.buttonText,
      }}
    >
      <div
        className={`absolute bottom-0 w-0 group-hover:w-full z-10 transition-all duration-300`}
        style={{ height: "1.5px", backgroundColor: palette.buttonMain }}
      ></div>
      {label}
    </button>
  );
};

export default ButtonStyle10;
