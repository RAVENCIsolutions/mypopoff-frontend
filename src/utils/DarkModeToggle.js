"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";
import { Flex, Switch } from "@radix-ui/themes";

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Flex gap="2">
      <FiMoon size={20} />
      <Switch
        color="gray"
        defaultChecked={theme !== "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <FiSun size={20} />
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
    </Flex>
  );
};

export default DarkModeToggle;
