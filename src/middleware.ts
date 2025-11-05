import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const validRoutes = [
    "/",
    "/candidates",
    "/employers",
    "/job-board",
    "/job-board/category",
    "/my-network",
    "/signin",
    "/signup",
    "/register",
    "/messages",
    "/notifications",
    "/upgrade",
    "/profile",
    "/my-profile",
    "/jobs",
    "/companies",
    "/not-found",
    "/email-verification",
    "/success-message",
    "/create-new-password",
    "/forgate-password",
  ];

  // Dynamic route patterns
  const dynamicPatterns = [
    /^\/job\/(.+)$/,
    /^\/job-board\/category\/(.+)$/,
    /^\/profile\/(.+)$/,
  ];

  const isValid =
    validRoutes.some((route) => {
      // Allow exact, with trailing slash, or with query params
      return (
        pathname === route ||
        pathname === `${route}/` ||
        pathname.startsWith(`${route}/`) ||
        pathname.startsWith(`${route}?`)
      );
    }) || dynamicPatterns.some((pattern) => pattern.test(pathname));

  if (!isValid) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
