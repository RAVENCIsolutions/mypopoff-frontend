import { useState } from "react";

const ButtonStyle04 = (props) => {
  const [hover, setHover] = useState(false);

  const { label, palette } = props;

  return (
    <button
      className={`p-1 m-2.5 px-5 min-w-max rounded-lg shadow-[5px_6px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-x-1 hover:-translate-y-1 transition-all duration-100`}
      style={{
        backgroundColor: palette.buttonMain,
        color: palette.buttonText,
      }}
    >
      {label}
    </button>
  );
};

export default ButtonStyle04;
