import { useEffect, useState } from "react";
import { BiHomeHeart } from "react-icons/bi";
import { hexToRgb, rgbToHsl } from "@/utility/colourConversions";
import { generateRandomColor, isValidHex } from "@/utility/colourUtils";
import { FaCheck, FaSlackHash, FaTimes } from "react-icons/fa";
import WheelSegments from "@/components/ColorWheelPicker/WheelSegments";

const ColorWheel = ({
  size,
  innerWheelSize,
  value,
  handleChange,
  extraPalettes = [],
  parentCenter,
  show,
}) => {
  const [color, setColor] = useState(value);
  const [wheelPalette, setWheelPalette] = useState([]);
  const [hashColour, setHashColour] = useState("");
  const [hashBlockScale, setHashBlockScale] = useState(1);
  const [paletteSelection, setHashSelection] = useState(0);
  const [paletteLabel, setPaletteLabel] = useState("Standard");

  const [translateIcons, setTranslateIcons] = useState(innerWheelSize / 2);
  const [rotateIcons, setRotateIcons] = useState(0);
  const [elementsOpacity, setElementsOpacity] = useState("0");

  const [saveCancelOpacity, setSaveCancelOpacity] = useState("0");

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

  const defaultPalette = [
    {
      label: "Standard",
      component: (colour) => <BiHomeHeart size={27} color={colour} />,
      colors: defaultColours,
    },
  ];

  const palettes = [...defaultPalette, ...extraPalettes];

  const handleColorChange = (color, pop = true) => {
    pop && setHashBlockScale(2);

    const newValue = color[0] === "#" ? color.split("#")[1] : color;
    const RGBColor = hexToRgb(color);
    const HSLColor = rgbToHsl(RGBColor);

    setHashColour(HSLColor.l >= 50 ? "#141414" : "#ffffff");

    setColor(newValue);

    pop &&
      setTimeout(() => {
        setHashBlockScale(1);
      }, 200);
  };

  const saveChanges = () => {
    handleChange(color);
    show(false);
  };

  const cancelChanges = () => {
    setColor(value);
    show(false);
  };

  useEffect(() => {
    setWheelPalette(defaultColours);

    setTranslateIcons(innerWheelSize / 2);

    setRotateIcons(360 / palettes.length);
    setTranslateIcons(0);
    setElementsOpacity("initial");

    setTimeout(() => {
      handleColorChange(
        isValidHex(value) ? value : generateRandomColor(),
        false,
      );
    }, 200);

    setTimeout(() => {
      setSaveCancelOpacity("initial");
    }, 1000);
  }, []);

  return (
    <section
      className={`absolute`}
      style={{
        width: `${size}px`,
        left: Math.min(
          Math.max(0, parentCenter.left - size / 2),
          window.innerWidth - size,
        ),
        top: Math.min(
          Math.max(0, parentCenter.top - size / 2),
          window.innerHeight - size,
        ),
      }}
    >
      {/* Save / Cancel */}
      <section
        className={`cursor-pointer absolute top-0 right-0 ${
          saveCancelOpacity === "0"
            ? "opacity-0"
            : "opacity-30 hover:opacity-100"
        } text-dashboard-primary-dark hover:text-rose-700 transition-all duration-500`}
        onClick={cancelChanges}
      >
        <FaTimes size={20} />
      </section>
      <section
        className={`cursor-pointer absolute bottom-0 right-0 opacity-100 text-dashboard-primary-dark hover:text-emerald-700 transition-all duration-500`}
        style={{ opacity: saveCancelOpacity }}
        onClick={saveChanges}
      >
        <FaCheck size={20} />
      </section>

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
            width: innerWheelSize,
            height: innerWheelSize,
          }}
        >
          {palettes.map((palette, index) => (
            <article
              key={`palette-change-${index}`}
              className={`${
                window.innerWidth < 350 ? "hidden" : "flex"
              } cursor-pointer pointer-events-auto absolute justify-center items-center w-12 rounded-full aspect-square transition-all duration-700 ${
                index === paletteSelection
                  ? "opacity-100"
                  : "opacity-30 hover:opacity-100"
              }`}
              style={{
                transformOrigin: `${innerWheelSize / 2}px`,
                transform: `rotate(${
                  rotateIcons * index
                }deg) translateX(${translateIcons}px)`,
              }}
              onClick={() => {
                setHashSelection(index);

                setWheelPalette(palette.colors);
                setPaletteLabel(palette.label);
                // if (palette.palette) {
                // } else {
                //   palette.callBack();
                // }
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
            className={`pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            style={{
              width:
                window.innerWidth < 350
                  ? innerWheelSize * 0.7
                  : innerWheelSize * 0.55,
            }}
          >
            <input
              type="text"
              value={color.toUpperCase()}
              className={`p-0.5 pr-2 pl-6 w-full bg-white shadow-xl shadow-black/15 rounded-lg border-2 outline-none font-semibold text-lg text-black/70 tracking-widest text-right transition-all duration-700`}
              style={{ borderColor: "#" + color.toUpperCase() }}
              maxLength={6}
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
export default ColorWheel;
