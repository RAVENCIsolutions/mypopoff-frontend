import OnBoardingMain from "@/onboardingComponents/OnBoardingMain";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function OnBoardingPage() {
  const supabase = await createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <OnBoardingMain session={session} />;
}
