/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        // sm	640px
        // md	768px
        // lg	1024px
        // xl	1280px
        // 2xl	1536px
        xs: "480px",
        "2xs": "360px",
        "3xs": "260px",
      },
      colors: {
        // fluro blue: 5ce1e6
        // fluro pink: f10098
        // original gold: c68a4e
        // action: "#f10098",
        // "primary-light": "#fff",
        // "primary-dark": "#202224",
        // "secondary-light": "#eee",
        // "secondary-dark": "#a4a4a4",
        // "dashboard-primary-light": "#fff",
        // "dashboard-secondary-light": "#eee",
        // "dashboard-primary-dark": "#383532",
        // "dashboard-secondary-dark": "#2A2826",

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
        anonymous: ["anonymous-pro", "monospace"],
        display: ["bely-display", "sans-serif"],
        abril: ["AbrilFatface", "sans-serif"],
        alegreya: ["AlegreyaSans", "sans-serif"],
        amatic: ["AmaticSC", "sans-serif"],
        anton: ["Anton", "sans-serif"],
        barlowCondensed: ["BarlowCondensed", "sans-serif"],
        bebasNeue: ["bebas-neue", "sans-serif"],
        bodoni: ["bodoni-urw", "serif"],
        calluna: ["calluna", "serif"],
        dmsans: ["DMSans", "sans-serif"],
        newSpirit: ["new-spirit", "serif"],
        proximaNova: ["proxima-nova-condensed", "sans-serif"],
        vistaSlab: ["vista-slab", "serif"],
      },
      fontWeight: {
        anonymous: "700",
      },
      width: {
        auth: "400px",
        windowed: "1200px",
        squeezed: "1000px",
        thirty: "31%",
      },
      maxWidth: {
        windowed: "1200px",
        squeezed: "1000px",
      },
      minHeight: {
        auth: "342px",
      },
      boxShadow: {
        neobrutalism: "4px 6px 0 black",
      },
    },
  },
  plugins: [],
};
