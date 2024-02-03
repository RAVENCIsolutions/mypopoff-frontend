import { useEffect, useRef, useState } from "react";
import { BiHomeHeart } from "react-icons/bi";
import { hexToRgb, rgbToHsl } from "@/utility/colourConversions";
import {
  generateRandomColor,
  handleHex,
  isValidHex,
  removeLeadingHash,
} from "@/utility/colourUtils";
import { FaCheck, FaSlackHash, FaTimes } from "react-icons/fa";
import WheelSegments from "@/components/ColorWheelPicker/WheelSegments";

const ColorWheel = ({
  size,
  innerWheelSize,
  value,
  handleChange,
  extraPalettes = [],
  parentCenter,
  speed = 25,
  buffer = 20,
  show,
  ...props
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

  const [buttonsTooltips, setButtonsTooltips] = useState(false);
  const [buttonsTooltipsOpacity, setButtonsTooltipsOpacity] = useState("100");

  const [saveCancelOpacity, setSaveCancelOpacity] = useState("0");

  const [showError, setShowError] = useState("");

  const segmentsRef = useRef(null);

  const defaultColours = [
    "#D80F0F",
    "#A61B30",
    "#752651",
    "#443172",
    "#123D93",
    "#135C5B",
    "#157C22",
    "#83A511",
    "#F2CF00",
    "#EC9F03",
    "#E56F07",
    "#DF3F0B",
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
    setShowError("");

    pop && setHashBlockScale(2);

    const newValue = removeLeadingHash(color);
    const RGBColor = hexToRgb(color);
    const HSLColor = rgbToHsl(RGBColor);

    setHashColour(HSLColor.l >= 50 ? "#141414" : "#ffffff");

    setColor(newValue);

    pop &&
      setTimeout(() => {
        setHashBlockScale(1);
      }, 200);
  };

  const closeWheel = () => {
    let delay = 0;
    const waitForOpacity = 300;
    const waitForClose = 500;

    setSaveCancelOpacity("0");

    setTimeout(() => {
      setRotateIcons(0);
      setTranslateIcons(innerWheelSize / 2);
      setElementsOpacity("0");
    }, waitForOpacity);

    if (segmentsRef.current) {
      delay = 12 * speed;

      setTimeout(() => {
        segmentsRef.current.callCloseMe();
      }, waitForClose);
    }

    setTimeout(
      () => {
        show(false);
      },
      waitForOpacity + waitForClose + delay + buffer,
    );
  };

  const saveChanges = () => {
    const finalColor = handleHex(color);

    if (finalColor) {
      setColor(finalColor);
      handleChange(finalColor);
      closeWheel();
    } else {
      setShowError("Oops! Invalid Hex value.");
    }
  };

  const cancelChanges = () => {
    setColor(value);
    closeWheel();
  };

  const changeButtonTooltips = () => {
    setButtonsTooltipsOpacity("0");

    setTimeout(() => {
      setButtonsTooltips(true);
    }, 500);
  };

  useEffect(() => {
    const colorChangeDelay = 200;
    const opacityDelay = 1000;
    const buttonsTooltipDelay = 2500;

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
    }, colorChangeDelay);

    setTimeout(() => {
      setSaveCancelOpacity("initial");
    }, opacityDelay);

    setTimeout(() => {
      changeButtonTooltips();
    }, buttonsTooltipDelay);
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
        className={`cursor-pointer absolute top-0 right-0 text-dashboard-primary-dark hover:text-rose-700 transition-all duration-500`}
        style={{
          opacity: saveCancelOpacity,
        }}
        onClick={cancelChanges}
      >
        {buttonsTooltips ? (
          <FaTimes
            size={20}
            className={`${
              saveCancelOpacity === "0"
                ? "opacity-0"
                : "opacity-30 hover:opacity-100"
            }`}
          />
        ) : (
          <p
            className={`text-sm text-rose-700 transition-all duration-500`}
            style={{ opacity: buttonsTooltipsOpacity / 100 }}
          >
            Cancel
          </p>
        )}
      </section>
      <section
        className={`cursor-pointer absolute bottom-0 right-0 opacity-100 text-dashboard-primary-dark hover:text-emerald-700 transition-all duration-500`}
        style={{ opacity: saveCancelOpacity }}
        onClick={saveChanges}
      >
        {buttonsTooltips ? (
          <FaCheck size={20} />
        ) : (
          <p
            className={`text-sm text-emerald-700 transition-all duration-500`}
            style={{ opacity: buttonsTooltipsOpacity / 100 }}
          >
            Save
          </p>
        )}
      </section>

      <WheelSegments
        ref={segmentsRef}
        wheelPalette={wheelPalette}
        handleColorChange={handleColorChange}
        speed={speed}
        buffer={buffer}
      />
      <article
        className={`absolute flex justify-center items-center top-1/2 left-1/2 w-3/4 aspect-square bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500`}
      >
        {/* Current Palette Label */}
        <section
          className={`absolute top-1/2 -translate-y-10 transition-all duration-500`}
          style={{ opacity: elementsOpacity }}
        >
          <p
            className={`font-semibold text-sm tracking-wider text-dashboard-primary-dark/80 italic`}
            style={{ opacity: elementsOpacity }}
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
            opacity: elementsOpacity,
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
        </section>
      </article>

      <div
        className={`pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10`}
        style={{
          width:
            window.innerWidth < 350
              ? innerWheelSize * 0.7
              : innerWheelSize * 0.6,
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
        {showError && (
          <p
            className={`absolute top-1/2 translate-y-6 w-full text-center text-xs text-rose-700 font-semibold italic transition-all duration-500`}
          >
            {showError}
          </p>
        )}
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
  );
};
export default ColorWheel;
