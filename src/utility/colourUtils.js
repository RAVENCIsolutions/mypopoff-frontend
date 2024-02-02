import {
  hexToRgb,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from "@/utility/colourConversions";

const isValidHex = (value) => {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(value);
};

const generateRandomColor = () => {
  const startingColour = [];
  const hexChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

  for (let char = 0; char < 6; char++) {
    const newChar = hexChars[Math.floor(Math.random() * hexChars.length)];
    startingColour.push(newChar);
  }

  return startingColour.join("");
};

const makePastel = (colors = []) => {
  return colors.map((color, index) => {
    const RGBColor = hexToRgb(color);
    const HSLColor = rgbToHsl(RGBColor);

    const pastelHSL = {
      h: HSLColor.h,
      s: Math.min(50, HSLColor.s),
      l: Math.min(90, Math.max(70, HSLColor.l)),
    };

    const pastelRGB = hslToRgb(pastelHSL);

    return rgbToHex(pastelRGB);
  });
};

export { isValidHex, generateRandomColor, makePastel };
