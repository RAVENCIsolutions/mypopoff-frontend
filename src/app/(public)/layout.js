"use client";

import "./globals.scss";
import "@radix-ui/themes/styles.css";
import { darkModeContext } from "@/stores/DarkModeStore";
import { observer } from "mobx-react";

const RootLayout = observer(({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/oya4ufz.css" />
      </head>
      <body
        className={
          darkModeContext.darkMode + " bg-primary-light dark:bg-primary-dark"
        }
      >
        {children}
      </body>
    </html>
  );
});

export default RootLayout;
