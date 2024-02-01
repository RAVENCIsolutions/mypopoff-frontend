"use client";

import { useState } from "react";

import WheelSegments from "./WheelSegments";

const ColorWheelPicker = () => {
  const [color, setColor] = useState("#000000");

  return (
    <section className={`relative w-96`}>
      <WheelSegments
        segments={[
          "#a71e48",
          "#ef3224",
          "#f15523",
          "#f99b1e",
          "#f9bd19",
          "#f3ec3a",
          "#d0dd37",
          "#62b146",
          "#1496ce",
          "#3d5eac",
          "#463191",
          "#7c3697",
        ]}
        setColor={setColor}
      />
      <div
        className={`absolute flex justify-center items-center top-1/2 left-1/2 w-3/4 aspect-square bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-10`}
      >
        <input
          type="text"
          value={color}
          className={`p-1.5 w-[60%] bg-white tracking-wider text-center shadow-xl shadow-black/10 rounded-lg border-none outline-none font-semibold text-lg text-black/70`}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </section>
  );
};

export default ColorWheelPicker;
