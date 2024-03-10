import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    console.log(session);
    try {
      if (request.url.includes("/auth"))
        return NextResponse.redirect(new URL("/me/dashboard", request.url));

      // Check if onboarding is complete
      const { data, error } = await supabase
        .from(process.env.NEXT_PUBLIC_SUPABASE_USERS_TABLE)
        .select("onboarding_complete")
        .eq("uid", session.user.id)
        .single();

      if (request.url.includes("/me")) {
        if (!data.onboarding_complete)
          return NextResponse.redirect(new URL("/onboarding", request.url));
      }

      if (request.url.includes("/onboarding")) {
        if (data.onboarding_complete) {
          return NextResponse.redirect(new URL("/me/dashboard", request.url));
        }
      }
    } catch (e) {
      const { error } = await supabase.auth.signOut();
    }
  } else {
    if (request.url.includes("/me") || request.url.includes("/onboarding")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
}
