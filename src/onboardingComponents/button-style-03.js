import { useState } from "react";

const ButtonStyle03 = (props) => {
  const [hover, setHover] = useState(false);

  const { label, palette } = props;

  return (
    <button className="group relative m-2 px-5 w-4/6 min-w-max h-8 hover:scale-105 transition-all duration-100">
      <div
        className={`absolute left-0 top-0 w-full h-full group-hover:opacity-80 -skew-x-[20deg]`}
        style={{
          backgroundColor: palette.buttonMain,
        }}
      ></div>
      <p
        className={`absolute left-0 top-0 flex items-center justify-center w-full h-full text-base`}
        style={{
          color: palette.buttonText,
        }}
      >
        {label}
      </p>
    </button>
  );
};

export default ButtonStyle03;
