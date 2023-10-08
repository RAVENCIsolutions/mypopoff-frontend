import "./globals.scss";

const RootLayout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/oya4ufz.css" />
      </head>
      <body
        className={"bg-primary-light dark:bg-primary-dark"
        }
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
