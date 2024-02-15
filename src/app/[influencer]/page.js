import { fetchUsername } from "@/utility/dbUtils";
import { notFound, useParams } from "next/navigation";
import Layout01 from "@/templates/layout-01";
import Layout02 from "@/templates/layout-02";
import Layout03 from "@/templates/layout-03";
import Layout04 from "@/templates/layout-04";
// import Layout05 from "@/templates/layout-05";
// import Layout06 from "@/templates/layout-06";
import Layout07 from "@/templates/layout-07";
import Layout08 from "@/templates/layout-08";
import Layout09 from "@/templates/layout-09";
import Layout10 from "@/templates/layout-10";

async function getData(username) {
  const userData = await fetchUsername(username);

  if (!userData) {
    notFound();
  }

  return userData;
}

export async function generateMetadata({ params }) {
  const { username } = await getData(params.influencer);

  return {
    title: `@${username} | My Pop Off`,
  };
}

export default async function Page({ params }) {
  let userData = {};
  const layoutLookup = {};

  await getData(params.influencer).then((data) => {
    userData = data;
    layoutLookup["layout-01"] = <Layout01 userData={data} />;
    layoutLookup["layout-02"] = <Layout02 userData={data} />;
    layoutLookup["layout-03"] = <Layout03 userData={data} />;
    layoutLookup["layout-04"] = <Layout04 userData={data} />;
    // layoutLookup["layout-05"] = <Layout05 userData={data} />;
    // layoutLookup["layout-06"] = <Layout06 userData={data} />;
    layoutLookup["layout-07"] = <Layout07 userData={data} />;
    layoutLookup["layout-08"] = <Layout08 userData={data} />;
    layoutLookup["layout-09"] = <Layout09 userData={data} />;
    layoutLookup["layout-10"] = <Layout10 userData={data} />;
  });

  // return layoutLookup[userData.page_layout];
  return layoutLookup["layout-10"];
}
