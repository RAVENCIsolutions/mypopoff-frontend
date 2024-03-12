﻿import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    await supabase.auth
      .exchangeCodeForSession(code)
      .then()
      .catch((error) => {
        return NextResponse.redirect(`${requestUrl.origin}`);
      });
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}`);
}
