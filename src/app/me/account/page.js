import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import AccountsBlock from "@/components/AccountsBlock";
import { verifyUserData } from "@/utility/generalUtils";
import { defaultUser } from "@/data/defaultUser";

export default async function AccountPage() {
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
    <article className="relative w-full h-full rounded-none lg:rounded-lg sm:overflow-hidden">
      <AccountsBlock session={session} data={verifiedData} />
    </article>
  );
}
