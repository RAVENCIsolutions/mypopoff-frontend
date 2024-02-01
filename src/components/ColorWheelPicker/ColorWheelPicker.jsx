"use client";

import { useEffect, useState } from "react";

import WheelSegments from "./WheelSegments";
import { FaSlackHash } from "react-icons/fa";
import {
  hexToRgb,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from "@/utility/colourConversions";
import { BiHomeHeart, BiRadio } from "react-icons/bi";
import { LuLeaf } from "react-icons/lu";

const ColorWheelPicker = () => {
  const [color, setColor] = useState("000000");
  const [wheelPalette, setWheelPalette] = useState([]);
  const [hashColour, setHashColour] = useState("");
  const [hashBlockScale, setHashBlockScale] = useState(1);
  const [paletteSelection, setHashSelection] = useState(0);
  const [paletteLabel, setPaletteLabel] = useState("Standard");

  const wheelSize = Math.min(300, window.innerWidth * 0.85);

  const [translateIcons, setTranslateIcons] = useState((wheelSize * 0.73) / 2);
  const [rotateIcons, setRotateIcons] = useState(0);
  const [elementsOpacity, setElementsOpacity] = useState("0");

  const defaultColours = [
    "#a71e48",
    "#dd0500",
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
  ];

  const handleColorChange = (color) => {
    setHashBlockScale(2);

    const newValue = color[0] === "#" ? color.split("#")[1] : color;
    const RGBColor = hexToRgb(color);
    const HSLColor = rgbToHsl(RGBColor);

    setHashColour(HSLColor.l >= 50 ? "#141414" : "#ffffff");

    setColor(newValue);

    setTimeout(() => {
      setHashBlockScale(1);
    }, 200);
  };

  const makePastel = (colors = []) => {
    const pastel = [];

    colors.map((color, index) => {
      const RGBColor = hexToRgb(color);
      const HSLColor = rgbToHsl(RGBColor);

      const pastelHSL = {
        h: HSLColor.h,
        s: Math.min(50, HSLColor.s),
        l: Math.min(90, Math.max(70, HSLColor.l)),
      };

      const pastelRGB = hslToRgb(pastelHSL);
      const pastelHex = rgbToHex(pastelRGB);

      pastel.push(pastelHex);
    });

    setWheelPalette(pastel);
  };

  const palettes = [
    {
      component: (colour) => <BiHomeHeart size={27} color={colour} />,
      callBack: () => {
        setWheelPalette(defaultColours);
        setPaletteLabel("Standard");
      },
    },
    {
      component: (colour) => (
        <i
          className={`fi fi-br-tree-christmas text-2xl`}
          style={{ color: colour }}
        ></i>
      ),
      callBack: () => {
        setWheelPalette([
          "#D5C2D5",
          "#9A0000",
          "#5A0502",
          "#024D2E",
          "#007000",
          "#80B25D",
          "#008483",
          "#AC846B",
          "#A52B2A",
          "#784333",
          "#604033",
          "#2C1712",
        ]);
        setPaletteLabel("Christmas");
      },
    },
    {
      component: (colour) => <LuLeaf size={25} color={colour} />,
      callBack: () => {
        setWheelPalette([
          "#004600",
          "#466603",
          "#B5BD11",
          "#FBE730",
          "#FFAC3B",
          "#EA3F00",
          "#870002",
          "#FF8F9B",
          "#994C90",
          "#54014F",
          "#00003C",
          "#2C72A8",
        ]);
        setPaletteLabel("Autumn");
      },
    },
    {
      component: (colour) => <BiRadio size={25} color={colour} />,
      callBack: () => {
        setWheelPalette([
          "#43E7D4",
          "#0B2B40",
          "#92D622",
          "#FF970C",
          "#E5570C",
          "#197384",
          "#20CED1",
          "#FA3960",
          "#CC033D",
          "#730F33",
          "#3B1850",
          "#1B1714",
        ]);
        setPaletteLabel("Retro");
      },
    },
    {
      component: (colour) => (
        <i
          className={`fi fi-br-watermelon text-xl`}
          style={{ color: colour }}
        ></i>
      ),
      callBack: () => {
        setWheelPalette([
          "#005F39",
          "#2E8B57",
          "#7FC08A",
          "#C3F25C",
          "#FF6F61",
          "#FFA07A",
          "#FFD1C1",
          "#8C0335",
          "#F2003C",
          "#FFC0CB",
          "#000000",
          "#444444",
        ]);
        setPaletteLabel("Watermelon");
      },
    },
    {
      component: (colour) => (
        <i
          className={`fi fi-br-galaxy-planet text-xl`}
          style={{ color: colour }}
        ></i>
      ),
      callBack: () => {
        setWheelPalette([
          "#331E36",
          "#5E1742",
          "#882367",
          "#3B1F87",
          "#264B96",
          "#0077BE",
          "#0094C6",
          "#00BBD6",
          "#28D2E5",
          "#32EEDB",
          "#8CFF98",
          "#FFF47D",
        ]);
        setPaletteLabel("Nebula");
      },
    },
  ];

  useEffect(() => {
    setWheelPalette(defaultColours);

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
      startingColour.push(newChar);
    }

    setTranslateIcons((wheelSize * 0.73) / 2);

    setRotateIcons(360 / palettes.length);
    setTranslateIcons(0);
    setElementsOpacity("initial");

    setTimeout(() => {
      handleColorChange(startingColour.join(""));
    }, 200);
  }, []);

  return (
    <section className={`relative`} style={{ width: wheelSize + "px" }}>
      <WheelSegments
        wheelPalette={wheelPalette}
        handleColorChange={handleColorChange}
      />
      <article
        className={`absolute flex justify-center items-center top-1/2 left-1/2 w-3/4 aspect-square bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500`}
        style={{ opacity: elementsOpacity }}
      >
        {/* Current Palette Label */}
        <section
          className={`absolute top-1/2 -translate-y-10 transition-all duration-500`}
        >
          <p
            className={`font-semibold text-sm tracking-wider text-dashboard-primary-dark/80 italic`}
          >
            {paletteLabel}
          </p>
        </section>

        {/* Preset Palette Buttons */}
        <section
          className={`pointer-events-none relative flex items-center transition-all duration-500`}
          style={{
            width: wheelSize * 0.73,
            height: wheelSize * 0.73,
          }}
        >
          {palettes.map((palette, index) => (
            <article
              key={`palette-change-${index}`}
              className={`${
                window.innerWidth < 400 ? "none" : "flex"
              } cursor-pointer pointer-events-auto absolute justify-center items-center w-12 rounded-full aspect-square transition-all duration-700 ${
                index === paletteSelection
                  ? "opacity-100"
                  : "opacity-30 hover:opacity-100"
              }`}
              style={{
                transformOrigin: `${(wheelSize * 0.73) / 2}px`,
                transform: `rotate(${
                  rotateIcons * index
                }deg) translateX(${translateIcons}px)`,
              }}
              onClick={() => {
                setHashSelection(index);
                palette.callBack();
              }}
            >
              <div
                style={{
                  transform: `rotate(${(-360 / palettes.length) * index}deg)`,
                }}
              >
                {palette.component(
                  index === paletteSelection ? "#141414" : "#141414",
                )}
              </div>
            </article>
          ))}

          <div
            className={`pointer-events-auto absolute top-1/2 left-1/2 ${
              window.innerWidth < 400 ? "w-[70%]" : "w-[55%]"
            } -translate-x-1/2 -translate-y-1/2`}
          >
            <input
              type="text"
              value={color.toUpperCase()}
              className={`p-0.5 pr-2 pl-6 w-full bg-white shadow-xl shadow-black/15 rounded-lg border-2 outline-none font-semibold text-lg text-black/70 tracking-widest text-right transition-all duration-700`}
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
                transform: `scale(${hashBlockScale})`,
              }}
            >
              <FaSlackHash size={20} />
            </div>
          </div>
        </section>
      </article>
    </section>
  );
};

export default ColorWheelPicker;
