import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ComponentsBlock from "@/components/ComponentsBlock";

export default async function CustomisePage() {
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <section className="w-full max-h-full overflow-hidden sm:rounded-lg">
      <ComponentsBlock session={session} />
    </section>
  );
}
