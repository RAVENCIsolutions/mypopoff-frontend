import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import Providers from "@/providers/Providers";

export const metadata = {
  links: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "stylesheet", href: "https://use.typekit.net/oya4ufz.css" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-primary-light dark:bg-primary-dark">
        <Theme>
          <Providers>{children}</Providers>
        </Theme>
      </body>
    </html>
  );
}
