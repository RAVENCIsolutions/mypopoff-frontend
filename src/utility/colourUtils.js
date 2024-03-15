import {
  hexToRgb,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from "@/utility/colourConversions";

const removeLeadingHash = (value) => {
  if (!value) return;

  return value.replace(/^#/, "");
};

const addLeadingHash = (value) => {
  return value[0] === "#" ? value : `#${value}`;
};

const isValidHex = (value) => {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(value);
};

const handleHex = (value) => {
  value = removeLeadingHash(value.toUpperCase());

  switch (value.length) {
    case 1:
      value = value.repeat(6);
      break;
    case 2:
      value = value.repeat(3);
      break;
    case 3:
      value = value.repeat(2);
      break;
    case 4:
      if (value[0] === value[3]) {
        value = value.slice(0, 3).repeat(2);
      } else {
        return false;
      }

      break;
    case 5:
      if (value.slice(0, 2) === value.slice(3)) {
        value = value.slice(0, 3).repeat(2);
      } else {
        return false;
      }
      break;

    default:
      break;
  }

  return value;
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

export {
  removeLeadingHash,
  addLeadingHash,
  isValidHex,
  handleHex,
  generateRandomColor,
  makePastel,
};
