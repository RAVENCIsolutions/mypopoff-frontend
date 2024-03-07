import "./globals.scss";

import Providers from "@/providers/Providers";
import { RavenciProvider } from "@/providers/RavenciContext";

const RootLayout = ({ children }) => {
  return (
    <RavenciProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="stylesheet" href="https://use.typekit.net/oya4ufz.css" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </head>

        <body className={`bg-primary-light dark:bg-primary-dark`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </RavenciProvider>
  );
};

export default RootLayout;
