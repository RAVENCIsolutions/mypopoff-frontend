import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LayoutComponentWrapper from "@/components/LayoutComponentWrapper";
import { getLoginSession } from "@/utility/dataUtils";

export default async function Dashboard() {
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <section className="w-full sm:rounded-lg">
      <div className="flex flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="p-5 md:p-6 flex flex-col w-full max-h-full rounded-sm">
          <h2 className="mb-2 md:mb-4 pb-2 md:pb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            Dashboard
          </h2>
          <article className={`h-full overflow-y-auto`}>
            <LayoutComponentWrapper session={session} />
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
