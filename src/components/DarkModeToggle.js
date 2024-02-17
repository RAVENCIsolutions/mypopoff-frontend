"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import Switch from "@mui/material/Switch";
import { useTheme } from "next-themes";

import { observer } from "mobx-react";
import { Stack } from "@mui/material";

const DarkModeToggle = observer(({ size = "l", className = "" }) => {
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState(false);

  const { setTheme, resolvedTheme } = useTheme();

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
    setMounted(true);

    setChecked(resolvedTheme !== "dark");
  }, []);

  const toggleTheme = () => {
    console.log(resolvedTheme);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setChecked(resolvedTheme === "dark");
  };

  return (
    <article
      className={"flex flex-row items-center " + sizing[size].gap + className}
    >
      <FiMoon
        size={sizing[size].iconSize}
        onClick={toggleTheme}
        className="text-primary-dark dark:text-primary-light"
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
        className="text-primary-dark dark:text-primary-light"
      />
    </article>
  );
});

export default DarkModeToggle;
