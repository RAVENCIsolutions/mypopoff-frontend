"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import Switch from "@mui/material/Switch";
import { getCookie } from "@/utils/utilities";

const DarkModeToggle = () => {
  const [checked, setChecked] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (typeof document === "undefined") return;

    const currentTheme = getCookie("theme");
    updateTheme(currentTheme);

    return () => {
      console.log("unmounting");
    };
  }, []);

  const updateTheme = (value) => {
    const root = document.getElementsByTagName("html")[0];
    value === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");

    document.cookie = `theme=${value}`;
    setChecked(value !== "dark");
  };

  const toggleTheme = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle("dark");

    if (root.classList.contains("dark")) updateTheme("dark");
    else updateTheme("light");
  };

  return (
    <article className="flex flex-row items-center gap-2">
      <FiMoon
        size={20}
        onClick={() => toggleTheme()}
        className="text-primary-dark dark:text-primary-light"
      />
      <Switch
        color="warning"
        checked={checked}
        onChange={() => toggleTheme()}
      />
      <FiSun
        size={20}
        onClick={() => toggleTheme()}
        className="text-primary-dark dark:text-primary-light"
      />
      {/*<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>*/}
      {/*  {theme === "dark" ? (*/}
      {/*    <div className="flex items-center justify-center gap-2">*/}
      {/*      <FiSun size={20} />*/}
      {/*      <p>Switch to Light Mode</p>*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <div className="flex items-center justify-center gap-2">*/}
      {/*      <FiMoon size={20} />*/}
      {/*      <p>Switch to Dark Mode</p>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</button>*/}
    </article>
  );
};

export default DarkModeToggle;
