const normaliseUrl = (url) => {
  // Remove protocol (http or https) and www if present
  url = url.replace(/^https?:\/\//, "");
  url = url.replace(/^www\./, "");

  // Remove trailing slash
  url = url.replace(/\/$/, "");

  return url.toLowerCase();
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
      `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_CX}&q=${url}`
    );

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const matchLink = data.items.find(
        (item) => normaliseUrl(item.link) === normaliseUrl(url)
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

export { getCookie, getPageTitle, hexToRGB };
