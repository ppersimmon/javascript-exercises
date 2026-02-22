import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/my-profile") && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if ((pathname === "/sign-in" || pathname === "/sign-up") && token) {
    return NextResponse.redirect(new URL("/my-profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-profile", "/sign-in", "/sign-up"],
};
