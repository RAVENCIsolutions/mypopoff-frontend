import "./globals.scss";
import { ClerkProvider } from "@clerk/nextjs";

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/oya4ufz.css" />
      </head>
      {/*<ClerkProvider>*/}
      <body className={"bg-primary-light dark:bg-primary-dark"}>
        {children}
      </body>
      {/*</ClerkProvider>*/}
    </html>
  );
};

export default RootLayout;
