import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const validRoutes = [
    "/",
    "/candidates",
    "/employers",
    "/job-board",
    "/my-network",
    "/signin",
    "/signup",
    "/register",
    "/messages",
    "/notifications",
    "/upgrade",
    "/profile",
    "/jobs",
    "/job/[id]",
    "/companies",
    "/not-found",
  ];

  if (
    !validRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
