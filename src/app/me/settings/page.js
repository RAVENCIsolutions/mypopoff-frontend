import SettingsBlock from "@/components/SettingsBlock";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { verifyUserData } from "@/utility/generalUtils";
import { defaultUser } from "@/data/defaultUser";

export default async function SettingsPage() {
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
    <main className="relative flex flex-col justify-between w-full h-full rounded-none sm:rounded-3xl shadow-xl text-primary-dark dark:text-primary-light sm:overflow-hidden">
      <SettingsBlock session={session} data={verifiedData} />
    </main>
  );
}
