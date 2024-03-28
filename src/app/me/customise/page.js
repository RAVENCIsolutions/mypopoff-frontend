import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ComponentsBlock from "@/components/ComponentsBlock";
import { verifyUserData } from "@/utility/generalUtils";
import { defaultUser } from "@/data/defaultUser";

export default async function CustomisePage() {
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
    <section className="w-full max-h-full overflow-hidden rounded-none sm:rounded-3xl">
      <ComponentsBlock session={session} data={verifiedData} />
    </section>
  );
}
