"use client";

import { useEffect, useRef, useState } from "react";

import { FaSlackHash } from "react-icons/fa";

import { generateRandomColor } from "@/utility/colourUtils";
import { hexToRgb, rgbToHsl } from "@/utility/colourConversions";

import ColorWheel from "@/components/ColorWheelPicker/ColorWheel";
import { extraPalettes } from "@/data/colourPalettes";

const ColorWheelPicker = ({ value = "", handleChange }) => {
  const [hashColour, setHashColour] = useState("");
  const [showWheel, setShowWheel] = useState(false);
  const [myCenter, setMyCenter] = useState({ left: 0, top: 0 });

  const myRef = useRef(null);

  const wheelSize = Math.min(300, window.innerWidth * 0.85);
  const innerWheelSize = wheelSize * 0.73;

  const handleValueChange = (color) => {
    const newValue = color[0] === "#" ? color.split("#")[1] : color;
    const RGBColor = hexToRgb(color);
    const HSLColor = rgbToHsl(RGBColor);

    setHashColour(HSLColor.l >= 50 ? "#141414" : "#ffffff");

    if (handleChange) handleChange(newValue);
  };

  const getMyCenter = () => myRef.current.getBoundingClientRect();

  useEffect(() => {
    handleValueChange(value ? value : generateRandomColor());
  }, []);

  return (
    <>
      <div
        className={`pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        style={{
          width:
            window.innerWidth < 350
              ? innerWheelSize * 0.7
              : innerWheelSize * 0.55,
        }}
      >
        <input
          ref={myRef}
          type="text"
          value={value.toUpperCase()}
          className={`p-0.5 pr-2 pl-6 w-full bg-white rounded-lg border-none outline-none font-semibold text-lg text-black/70 tracking-widest text-right transition-all duration-700`}
          onClick={() => {
            const { left, top, width, height } = getMyCenter();
            setMyCenter({ left: left + width / 2, top: top + height / 2 });

            setShowWheel(true);
          }}
          onChange={(e) => {
            // handleValueChange(e.target.value);
          }}
        />
        <div
          className={`color-block absolute top-0 left-0 flex justify-center items-center h-full rounded-l-lg aspect-square transition-all duration-700`}
          style={{
            backgroundColor: "#" + value.toUpperCase(),
            color: hashColour,
          }}
        >
          <FaSlackHash size={20} />
        </div>
      </div>
      {showWheel && (
        <ColorWheel
          value={value}
          handleChange={handleValueChange}
          size={wheelSize}
          innerWheelSize={innerWheelSize}
          extraPalettes={extraPalettes}
          parentCenter={myCenter}
          show={setShowWheel}
        />
      )}
    </>
  );
};

export default ColorWheelPicker;
