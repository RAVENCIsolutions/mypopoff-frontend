import { LinearProgress, Stack } from "@mui/material";

import { getFromLocalStorage } from "@/utility/localStorageUtils";
import userStore from "@/stores/UserStore";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Me = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, userError } = await supabase
    .from(process.env.NEXT_PUBLIC_SUPABASE_USERS_TABLE)
    .select("username")
    .eq("uid", session.user.id)
    .single();

  return (
    <main className="w-full h-full rounded-lg">
      <div className="flex flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="p-5 md:p-6 w-full h-full rounded-sm bg-dashboard-primary-light dark:bg-dashboard-primary-dark">
          <h2 className="mb-2 md:mb-2 pb-2 md:pb-4 w-full text-lg">
            Welcome{data ? ` ${data.username}` : null}!
          </h2>
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        </section>
      </div>
    </main>
  );
};

export default Me;
