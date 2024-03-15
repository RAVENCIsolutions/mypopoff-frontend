import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import LinksPageBlock from "@/components/LinksPageBlock";

export default async function MyLinks() {
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <article className="relative w-full max-h-full overflow-hidden sm:rounded-lg">
      <LinksPageBlock session={session} />
    </article>
  );
}
