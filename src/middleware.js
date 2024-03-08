import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function middleware(request) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (request.url.includes("/me")) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      // Check if onboarding is complete
      const { data, error } = await supabase
        .from(process.env.NEXT_PUBLIC_SUPABASE_USERS_TABLE)
        .select("onboarding_complete")
        .eq("uid", session.user.id)
        .single();

      if (!data["onboarding_complete"])
        return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }
}
