import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import AccountsBlock from "@/components/AccountsBlock";

export default async function AccountPage() {
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <article className="relative w-full h-full rounded-none lg:rounded-lg sm:overflow-hidden">
      <AccountsBlock session={session} />
    </article>
  );
}
