import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SitemapGenerator from "@/components/SitemapGenerator";

export default async function SiteMapPage() {
  const supabase = await createServerComponentClient({ cookies });

  // grab all usernames
  const { data, error } = await supabase.from("users").select("username");

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  if (data)
    data.forEach((user, index) => {
      const url = `${process.env.NEXT_PUBLIC_HOME_ROUTE}${user.username}`;
      sitemap += `
  <url>
      <loc>${url}</loc>
  </url>`;
    });

  sitemap += `
</urlset>`;

  return <SitemapGenerator data={sitemap} />;
}
