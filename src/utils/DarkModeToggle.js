"use client";

import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import Switch from "@mui/material/Switch";
import { darkModeContext } from "@/stores/DarkModeStore";
import { observer } from "mobx-react";

const DarkModeToggle = observer(() => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    darkModeContext.toggleDarkMode();
    setChecked(!checked);
  };

  return (
    <article className="flex flex-row items-center gap-2">
      <FiMoon
        size={20}
        onClick={() => handleToggle()}
        className="text-primary-dark dark:text-primary-light"
      />
      <Switch
        color="warning"
        checked={darkModeContext.darkMode !== "dark"}
        onChange={() => handleToggle()}
      />
      <FiSun
        size={20}
        onClick={() => handleToggle()}
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
});

export default DarkModeToggle;
