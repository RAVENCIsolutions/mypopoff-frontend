"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import Switch from "@mui/material/Switch";
import { FiMoon, FiSun } from "react-icons/fi";

const DarkModeToggle = ({ size = "l", className = "", keepLight = false }) => {
  const [checked, setChecked] = useState(false);
  const { theme, setTheme } = useTheme();

  const sizing = {
    s: {
      iconSize: 16,
      switchSize: "small",
      gap: "gap-0",
    },
    m: {
      iconSize: 18,
      switchSize: "large",
      gap: "gap-0",
    },
    l: {
      iconSize: 20,
      switchSize: "large",
      gap: "gap-1",
    },
  };

  useEffect(() => {
    setChecked(theme !== "dark");
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setChecked(theme === "dark");
  };

  return (
    <article
      className={"flex flex-row items-center " + sizing[size].gap + className}
    >
      <FiMoon
        size={sizing[size].iconSize}
        onClick={toggleTheme}
        className={`${
          keepLight
            ? "text-primary-light"
            : "text-primary-dark dark:text-primary-light"
        }`}
      />
      <Switch
        sx={{
          "& .MuiSwitch-switchBase": {
            color: "#c68a4e", // color for the off state
            "&.Mui-checked": {
              color: "#c68a4e", // color for the on state
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#c68a4e", // background color for the on state
            },
          },
          "& .MuiSwitch-track": {
            backgroundColor: "#c68a4e", // adjust to change the track color when off if needed
          },
        }}
        checked={checked}
        size={sizing[size].switchSize}
        onChange={toggleTheme}
      />
      <FiSun
        size={sizing[size].iconSize}
        onClick={toggleTheme}
        className={`${
          keepLight
            ? "text-primary-light"
            : "text-primary-dark dark:text-primary-light"
        }`}
      />
    </article>
  );
};

export default DarkModeToggle;
