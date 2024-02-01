"use client";

import { useEffect, useState } from "react";

import WheelSegments from "./WheelSegments";
import { FaSlackHash } from "react-icons/fa";
import { hexToRgb, rgbToHsl } from "@/utility/colourConversions";

const ColorWheelPicker = () => {
  const [color, setColor] = useState("000000");

  const handleColorChange = (color) => {
    document.querySelector(".color-block").style.transform = `scale(1.5)`;

    const newValue = color[0] === "#" ? color.split("#")[1] : color;
    const RGBColor = hexToRgb(color);
    const HSLColor = rgbToHsl(RGBColor);

    setHashColour(HSLColor.l >= 50 ? "#141414" : "#ffffff");

    setColor(newValue);

    setTimeout(() => {
      document.querySelector(".color-block").style.transform = `scale(1.0)`;
    }, 200);
  };

  const [segmentColours, setSegmentColours] = useState([]);
  const [hashColour, setHashColour] = useState("");

  useEffect(() => {
    setSegmentColours([
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
    ]);

    let startingColour = [];
    const hexChars = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];

    for (let char = 0; char < 6; char++) {
      const newChar = hexChars[Math.floor(Math.random() * hexChars.length)];
      console.log(newChar);
      startingColour.push(newChar);
    }

    handleColorChange(startingColour.join(""));
  }, []);

  return (
    <section className={`relative w-96`}>
      <WheelSegments
        segments={segmentColours}
        handleColorChange={handleColorChange}
      />
      <article
        className={`absolute flex justify-center items-center top-1/2 left-1/2 w-3/4 aspect-square bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-10`}
      >
        <div className={`relative w-[60%]`}>
          <input
            type="text"
            value={color.toUpperCase()}
            className={`p-1.5 pl-6 w-full bg-white tracking-widest text-center shadow-xl shadow-black/10 rounded-lg border-none outline-none font-semibold text-xl text-black/70 transition-all duration-700`}
            style={{ borderColor: "#" + color.toUpperCase() }}
            onChange={(e) => {
              handleColorChange(e.target.value);
            }}
          />
          <div
            className={`color-block absolute top-0 left-0 flex justify-center items-center h-full rounded-l-lg aspect-square transition-all duration-700`}
            style={{
              backgroundColor: "#" + color.toUpperCase(),
              color: hashColour,
            }}
          >
            <FaSlackHash size={20} />
          </div>
        </div>
      </article>
    </section>
  );
};

export default ColorWheelPicker;
