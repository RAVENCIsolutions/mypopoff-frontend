import Link from "next/link";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import MPOLetterMark from "@/components/MPOLetterMark";

export const fetchCache = "force-no-store";

const Layout01 = dynamic(() => import("@/templates/layout-01"));
const Layout02 = dynamic(() => import("@/templates/layout-02"));
const Layout03 = dynamic(() => import("@/templates/layout-03"));
const Layout04 = dynamic(() => import("@/templates/layout-04"));
// const Layout05 = dynamic(() => import("@/templates/layout-05"));
// const Layout06 = dynamic(() => import("@/templates/layout-06"));
const Layout07 = dynamic(() => import("@/templates/layout-07"));
const Layout08 = dynamic(() => import("@/templates/layout-08"));
const Layout09 = dynamic(() => import("@/templates/layout-09"));
const Layout10 = dynamic(() => import("@/templates/layout-10"));

const layoutComponents = {
  "layout-01": Layout01,
  "layout-02": Layout02,
  "layout-03": Layout03,
  "layout-04": Layout04,
  // 'layout-05' : Layout05,
  // 'layout-06' : Layout06,
  "layout-07": Layout07,
  "layout-08": Layout08,
  "layout-09": Layout09,
  "layout-10": Layout10,
};

export async function Data(username) {
  const supabase = createServerComponentClient({ cookies });
  const { data: user, error } = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();

  if (!user || error) {
    notFound();
  }

  return user;
}

export async function generateMetadata({ params: { influencer } }) {
  const user = await Data(influencer);

  return {
    title: `@${user.username} | My Pop Off`,
  };
}

export default async function Page({ params: { influencer } }) {
  const data = await Data(influencer);
  const LayoutComponent = layoutComponents[data.page_layout || "layout-01"];

  return data.public ? (
    <LayoutComponent userData={data} />
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
}
