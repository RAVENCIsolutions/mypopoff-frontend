import "./globals.css";
import Providers from "@/providers/Providers";
import Link from "next/link";

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
        <footer className="mx-auto w-full max-w-windowed">
          <ul className="py-8 flex flex-row gap-10 font-medium text-secondary-dark dark:text-secondary-light">
            <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
              <a>Explore</a>
            </li>
            <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
              Blog
            </li>
            <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
              Support
            </li>
          </ul>

          <section className="py-8 flex items-center justify-between max-w-windowed border-t-2 border-secondary-dark dark:border-secondary-light">
            <p className="text-sm text-secondary-dark dark:text-secondary-light">
              Copyright © 2023. My Pop Off
            </p>
            <ul className="flex flex-row gap-10 font-medium text-secondary-dark dark:text-secondary-light">
              <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
                <Link href="/terms">Terms</Link>
              </li>
              <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
                <Link href="/privacy">Privacy</Link>
              </li>
              <li className="cursor-pointer hover:text-primary-dark dark:hover:text-primary-light transition-all duration-300">
                <Link href="/cookies">Cookies</Link>
              </li>
            </ul>
          </section>
        </footer>
      </body>
    </html>
  );
}
