"use client";

import { makeAutoObservable } from "mobx";

class DarkModeStore {
  darkMode = "";

  constructor() {
    makeAutoObservable(this);

    const savedDarkMode = localStorage.getItem("darkMode");

    if (savedDarkMode) {
      this.darkMode = savedDarkMode;
    } else {
      this.darkMode = "dark";

      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      this.darkMode = prefersDarkMode ? "dark" : "";
    }

    this.updateDarkMode();
  }

  toggleDarkMode() {
    this.darkMode = this.darkMode === "dark" ? "light" : "dark";
    localStorage.setItem("darkMode", this.darkMode);

    this.updateDarkMode();
  }

  updateDarkMode() {
    if (this.darkMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
}

export const darkModeContext = new DarkModeStore();
