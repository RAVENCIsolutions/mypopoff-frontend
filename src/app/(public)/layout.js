import "./globals.css";
import Providers from "@/providers/Providers";
import Link from "next/link";
import DarkModeToggle from "@/utils/DarkModeToggle";
import Footer from "@/components/Footer";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
