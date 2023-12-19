import { useState } from "react";
import { observe } from "mobx";
import { observer } from "mobx-react";
import onBoardingStore from "@/stores/OnBoardingStore";

const ButtonStyle03 = observer((props) => {
  const [hover, setHover] = useState(false);

  const { label } = props;
  const { palette } = onBoardingStore.onBoardingCurrent;

  return (
    <button className="group relative px-5 py-1 mx-2 w-full hover:scale-105 transition-all duration-100">
      <div
        className={`absolute left-0 top-0 w-full h-full group-hover:opacity-80 -skew-x-[20deg] transition-all duration-100`}
        style={{
          backgroundColor: palette.buttonMain,
        }}
      ></div>
      <p
        className={`relative left-0 top-0 flex items-center justify-center w-full h-full text-base transition-all duration-100 z-10`}
        style={{
          color: palette.buttonText,
          whiteSpace: "none",
        }}
      >
        {label}
      </p>
    </button>
  );
});

export default ButtonStyle03;
