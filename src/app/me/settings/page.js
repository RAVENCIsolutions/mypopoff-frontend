import SettingsBlock from "@/components/SettingsBlock";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function SettingsPage() {
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="relative flex flex-col justify-between w-full h-full rounded-none sm:rounded-3xl shadow-xl text-primary-dark dark:text-primary-light sm:overflow-hidden">
      <SettingsBlock session={session} />
    </main>
  );
}
