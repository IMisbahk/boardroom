import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/meetings", "/team", "/reports", "/settings", "/context", "/decisions", "/uploads"];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const protectedRoute = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (!protectedRoute) return NextResponse.next();

  const hasSession = request.cookies.get("boardroom_session")?.value === "1";
  if (hasSession) return NextResponse.next();

  const signinUrl = new URL("/signin", request.url);
  signinUrl.searchParams.set("returnTo", `${pathname}${search}`);
  return NextResponse.redirect(signinUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/meetings/:path*", "/team/:path*", "/reports/:path*", "/settings/:path*", "/context/:path*", "/decisions/:path*", "/uploads/:path*"],
};
