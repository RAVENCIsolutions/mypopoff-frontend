"use client";

import { useState } from "react";
import ThemeName from "@/templates/ThemeName";
import ZenSpaceTheme from "@/templates/zenspace-theme";
import FlatModeTheme from "@/templates/flatmode-theme";
import NeoBrutalismTheme from "@/templates/neobrutalism-theme";
import CardologyTheme from "@/templates/cardology-theme";

import "../(public)/globals.scss";
import VelvetographyTheme from "@/templates/velvetography-theme";

export default function TemplateTest({ theme = "flatMode" }) {
  const themes = {
    cardology: { name: "Cardology", component: <CardologyTheme /> },
    flatMode: { name: "Flat Mode", component: <FlatModeTheme /> },
    neoBrutalism: { name: "Neobrutalism", component: <NeoBrutalismTheme /> },
    velvetography: { name: "Velvetography", component: <VelvetographyTheme /> },
    zenSpace: { name: "Zen Space", component: <ZenSpaceTheme /> },
  };

  const [currentTheme, setCurrentTheme] = useState(theme);

  return (
    <div>
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
    </div>
  );
}
