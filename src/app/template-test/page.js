"use client";

import { useState } from "react";
import ZenSpaceTheme from "@/templates/zenspace-theme";
import FlatModeTheme from "@/templates/flatmode-theme";
import NeoBrutalismTheme from "@/templates/neobrutalism-theme";
import CardologyTheme from "@/templates/cardology-theme";

import "../(public)/globals.scss";
import VelvetographyTheme from "@/templates/velvetography-theme";
import SideBySideTheme from "@/templates/sidebyside-theme";
import TakeMyAwayTheme from "@/templates/takemeaway-theme";
import BombastikTheme from "@/templates/bombastik-theme";
import LapisAzuliTheme from "@/templates/lapisazuli-theme";

export default function TemplateTest({ theme = "flatMode" }) {
  const themes = {
    bombastik: { name: "Bombastik", component: <BombastikTheme /> },
    cardology: { name: "Cardology", component: <CardologyTheme /> },
    flatMode: { name: "Flat Mode", component: <FlatModeTheme /> },
    lapisAzuli: { name: "Lapis Azuli", component: <LapisAzuliTheme /> },
    neoBrutalism: { name: "Neobrutalism", component: <NeoBrutalismTheme /> },
    sideBySide: { name: "Side-by-Side", component: <SideBySideTheme /> },
    takeMeAway: { name: "Take Me Away", component: <TakeMyAwayTheme /> },
    velvetography: { name: "Velvetography", component: <VelvetographyTheme /> },
    zenSpace: { name: "Zen Space", component: <ZenSpaceTheme /> },
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
