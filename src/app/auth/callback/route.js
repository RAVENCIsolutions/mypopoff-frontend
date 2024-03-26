import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  // Initialize supabase client
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  if (code) {
    try {
      const { user, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;

      if (user) {
        return NextResponse.redirect(
          `${requestUrl.origin}/onboarding?verification=success`
        );
      }
    } catch (error) {
      console.error(`Error with verification: `, error);
      return NextResponse.redirect(`${requestUrl.origin}?verification=failure`);
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}`);
}
