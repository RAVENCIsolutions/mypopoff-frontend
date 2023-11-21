"use client";

import { useState } from "react";
import ZenSpaceTheme from "@/templates/zenspace-theme";
import Layout01 from "@/templates/layout-01";
import Layout10 from "@/templates/layout-10";
import Layout05 from "@/templates/layout-05";

import "../(public)/globals.scss";
import Layout02 from "@/templates/layout-02";
import SideBySideTheme from "@/templates/sidebyside-theme";
import Layout03 from "@/templates/layout-03";
import Layout07 from "@/templates/layout-07";
import LapisAzuliTheme from "@/templates/lapisazuli-theme";
import Layout06 from "@/templates/layout-06";
import Layout04 from "@/templates/layout-04";
import Layout08 from "@/templates/layout-08";
import Layout09 from "@/templates/layout-09";

export default function TemplateTest({ theme = "layout01" }) {
  const themes = {
    layout01: { name: "The Classic", component: <Layout01 /> },
    layout02: {
      name: "For the 'Gram",
      component: <Layout02 previewWindow={false} />,
    },
    layout03: { name: "The Poster", component: <Layout03 /> },
    layout04: { name: "Office Attire", component: <Layout04 /> },
    layout05: { name: "Cardology", component: <Layout05 /> },
    layout06: {
      name: "The Gallery",
      component: <Layout06 />,
    },
    layout07: { name: "Bombastik", component: <Layout07 /> },
    layout08: { name: "Bannerific", component: <Layout08 /> },
    layout09: { name: "Business Card", component: <Layout09 /> },
    layout10: { name: "Neobrutalism", component: <Layout10 /> },
    // sideBySide: { name: "Side-by-Side", component: <SideBySideTheme /> },
    // zenSpace: { name: "Zen Space", component: <ZenSpaceTheme /> },
    // lapisAzuli: { name: "Lapis Azuli", component: <LapisAzuliTheme /> },
  };

  const [currentTheme, setCurrentTheme] = useState(theme);

  return (
    <section>
      {themes[currentTheme]?.component || "Theme not found"}
      <div className="fixed top-3 left-3">
        <select
          value={currentTheme}
          onChange={(e) => setCurrentTheme(e.target.value)}
        >
          {Object.keys(themes).map((key) => (
            <option key={key} value={key}>
              {themes[key].name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
