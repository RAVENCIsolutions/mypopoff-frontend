import dynamic from "next/dynamic";
import userStore from "@/stores/UserStore";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const metadata = {
  title: "Dashboard | My Pop Off",
  description:
    "Create and manage your own Pop Off with our easy to use dashboard.",
};

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

export default async function Dashboard() {
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: user } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_USERS_TABLE)
    .select()
    .eq("uid", session.user.id)
    .single();

  const LayoutComponent = layoutComponents[user.page_layout || "layout-01"];

  return (
    <section className="w-full sm:rounded-lg">
      <div className="flex flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="p-5 md:p-6 flex flex-col w-full max-h-full rounded-sm">
          <h2 className="mb-2 md:mb-4 pb-2 md:pb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            Dashboard
          </h2>
          <article className={`flex-grow`}>
            <LayoutComponent userData={user} previewWindow={true} />
          </article>
          {/*<p className={`text-base`}>*/}
          {/*  Start by{" "}*/}
          {/*  <Link href={`/me/my-links`} className={`text-action`}>*/}
          {/*    adding links*/}
          {/*  </Link>{" "}*/}
          {/*  or how about{" "}*/}
          {/*  <Link href={`/me/customise`} className={`text-action`}>*/}
          {/*    customising*/}
          {/*  </Link>{" "}*/}
          {/*  your Pop Off landing page.*/}
          {/*</p>*/}
        </section>
      </div>
    </section>
  );
}
