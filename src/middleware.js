import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request) {
  if (request.url.includes("/images/") || request.url.includes("/fonts")) {
    return NextResponse.next();
  }

  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { data: user, error } = await supabase
      .from("users")
      .select()
      .eq("uid", session.user.id);

    if (user) {
      try {
        const nonPrivate = [
          "/auth/login",
          "/auth/register",
          "/auth/forgot-password",
        ];

        if (nonPrivate.some((value) => request.url.includes(value)))
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
    }
  } else {
    if (request.url.includes("/me") || request.url.includes("/onboarding")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
}
