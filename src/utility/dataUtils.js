import { defaultUser } from "@/data/defaultUser";

const verifyData = (key, value) => {
  const checks = {
    uid: "string",
    username: "string",
    bio: "string",
    tagline: "string",
    categories: "object",
    otherCategory: "string",
    tags: "object",
    page_layout: "string",
    button_style: "string",
    palette: "object",
    avatar_url: "string",
    images: "string",
    links: "object",
    onboarding_complete: "boolean",
    public: "boolean",
    extras: "object",
  };

  if (typeof value !== checks[key]) {
    return defaultUser[key];
  } else {
    return value;
  }
};

export { verifyData };
