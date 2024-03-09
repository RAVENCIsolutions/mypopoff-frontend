"use client";

import ColorWheelPicker from "@/components/ColorWheelPicker/ColorWheelPicker";
import { useState } from "react";

export default function ColourWheelTestPage() {
  const [thisColor, setThisColor] = useState("");

  const handleChange = (value) => {
    setThisColor(value);
  };

  return (
    <main
      className={`flex justify-center items-center w-full h-dvh bg-dashboard-primary-light`}
    >
      <ColorWheelPicker value={thisColor} handleChange={handleChange} />
    </main>
  );
}
