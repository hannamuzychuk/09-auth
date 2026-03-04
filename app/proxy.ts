import { NextResponse, type NextRequest } from "next/server";

export function Proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken");

  const isPrivate =
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/notes");

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");

  if (!token && isPrivate) {
    return NextResponse.redirect(
      new URL("/sign-in", request.url)
    );
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL("/profile", request.url)
    );
  }

  return NextResponse.next();
}