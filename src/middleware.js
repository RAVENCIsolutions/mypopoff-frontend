import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.url.includes("/me")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
