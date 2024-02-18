import { ButtonsLookup } from "@/data/ButtonsLookup";
import userStore from "@/stores/UserStore";

const normaliseUrl = (url) => {
  // Remove protocol (http or https) and www if present
  url = url.replace(/^https?:\/\//, "");
  url = url.replace(/^www\./, "");

  // Remove trailing slash
  url = url.replace(/\/$/, "");

  return url.toLowerCase();
};

const getButtonStyleIndex = (buttonId) => {
  if (!userStore.userData) return 0;

  const found = ButtonsLookup.findIndex((button) => button.id === buttonId);

  return found === -1 ? 0 : found;
};

const decodeHtmlEntities = (str) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
};

const stripHtmlTags = (str) => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();

  return null;
};

const getPageTitle = async (url) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_CX}&q=${url}`,
    );

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const matchLink = data.items.find(
        (item) => normaliseUrl(item.link) === normaliseUrl(url),
      );
      return matchLink
        ? decodeHtmlEntities(stripHtmlTags(matchLink.title))
        : "";
    }
  } catch (err) {
    console.error(`Error:`, err);
  }

  return "here";
};

const hexToRGB = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const getContrastLuminance = (hex) => {
  // Remove preceding # if present
  hex = hex.replace("#", "");

  // Convert hex to RGB Values
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  // Calculate YIQ (Luminance)
  const yiq = (red * 299 + green * 587 + blue * 114) / 1000;

  return yiq >= 128 ? "black" : "white";
};

const generateId = (numberOfChars, listOfIds = []) => {
  let results = "";

  do {
    results = generateRandomString(numberOfChars);
  } while (listOfIds.includes(results));

  return results;
};

const generateRandomString = (numberOfChars) => {
  let results = "";

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < numberOfChars; i++) {
    results += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return results;
};

export {
  getCookie,
  getPageTitle,
  hexToRGB,
  getContrastLuminance,
  getButtonStyleIndex,
  generateId,
  generateRandomString,
};
