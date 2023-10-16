/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        action: "#c68a4e",
        "primary-light": "#f7f5f3",
        "primary-dark": "#202224",
        "secondary-light": "#6d6d6d",
        "secondary-dark": "#a4a4a4",
        "dashboard-primary-light": "#EAE7E4",
        "dashboard-secondary-light": "#D5D0CA",
        "dashboard-primary-dark": "#383532",
        "dashboard-secondary-dark": "#2A2826",
      },
      fontFamily: {
        sans: ["agenda", "sans-serif"],
        body: ["agenda", "sans-serif"],
        display: ["bely-display", "sans-serif"],
      },
      width: {
        windowed: "1200px",
        squeezed: "1000px",
        thirty: "31%",
      },
      maxWidth: {
        windowed: "1200px",
        squeezed: "1000px",
      },
    },
  },
  plugins: [],
};
