"use client";

import { useEffect, useState } from "react";

const SitemapGenerator = ({ data }) => {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (downloaded) return;

    const blob = new Blob([data], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sitemap.xml");

    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    link.parentNode.removeChild(link);

    setDownloaded(true);
  }, []);

  return (
    <div>
      <p>Downloading sitemap...</p>
    </div>
  );
};

export default SitemapGenerator;
