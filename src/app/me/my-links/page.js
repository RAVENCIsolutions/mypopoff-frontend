import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import LinksPageBlock from "@/components/LinksPageBlock";
import { verifyUserData } from "@/utility/generalUtils";
import { defaultUser } from "@/data/defaultUser";

export default async function MyLinks() {
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
    <article className="relative w-full max-h-full overflow-hidden rounded-none sm:rounded-3xl">
      <LinksPageBlock session={session} data={verifiedData} />
    </article>
  );
}
