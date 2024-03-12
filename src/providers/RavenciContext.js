import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import userStore from "@/stores/UserStore";
import { defaultUser } from "@/data/defaultUser";
import { createUser, fetchUser } from "@/utility/dbUtils";

export const RavenciProvider = async ({ children }) => {
  return <>{children}</>;
};
