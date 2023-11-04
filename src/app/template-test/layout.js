export const metadata = {
  title: "Template Tests | My Pop Off",
  description: "",
};

export default function TemplateTestLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/oya4ufz.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
