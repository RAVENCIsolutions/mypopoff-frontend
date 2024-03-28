import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import LayoutComponentWrapper from "@/components/LayoutComponentWrapper";
import { verifyUserData } from "@/utility/generalUtils";
import { defaultUser } from "@/data/defaultUser";

export const fetchCache = "force-no-store";

export default async function Dashboard() {
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: user, error } = await supabase
    .from("users")
    .select("")
    .eq("uid", session.user.id)
    .single();

  const verifiedData = user ? verifyUserData(user, true) : defaultUser;

  return (
    <section className="w-full sm:rounded-lg">
      <div className="flex flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="p-5 md:p-6 flex flex-col w-full max-h-full rounded-sm">
          <h2 className="mb-2 md:mb-4 pb-2 md:pb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            Dashboard
          </h2>
          <article className={`h-full overflow-y-auto`}>
            <LayoutComponentWrapper session={session} data={verifiedData} />
          </article>
        </section>
      </div>
    </section>
  );
}
