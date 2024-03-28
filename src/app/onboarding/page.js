import OnBoardingMain from "@/onboardingComponents/OnBoardingMain";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { defaultUser } from "@/data/defaultUser";
import { verifyUserData } from "@/utility/generalUtils";

export default async function OnBoardingPage() {
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

  return <OnBoardingMain session={session} data={verifiedData} />;
}
