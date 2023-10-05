import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {FiMoon, FiSun} from "react-icons/fi";

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
          <div className="flex gap-2">
            <FiSun size={24} />
            <p>Light Mode</p>
          </div>
      ) : (
          <div className="flex gap-2">
          <FiMoon size={24} />
            <p>Dark Mode</p>
          </div>
      )}
    </button>
  );
};

export default DarkModeToggle;
