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
import MPOLetterMark from "@/components/MPOLetterMark";
import Link from "next/link";

export const fetchCache = "force-no-store";

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

  return userData.public ? (
    layoutLookup[userData.page_layout]
  ) : (
    <main>
      <article
        className={`flex items-center justify-center min-w-full min-h-dvh bg-primary-dark`}
      >
        <section className={`text-center text-primary-light`}>
          <MPOLetterMark
            width={80}
            className={`mx-auto mb-10 fill-primary-light`}
          />
          <h1 className={`text-2xl font-bold`}>
            It looks like this Pop Off is private.
          </h1>
          <p className={`text-lg`}>
            Try another?{" "}
            <Link href={`/explore`} className={`text-action underline`}>
              Explore some here.
            </Link>
          </p>
        </section>
      </article>
    </main>
  );
  // return layoutLookup["layout-06"];
}
