import { NextRequest, NextResponse } from "next/server";
import { checkSession, refreshSession } from "@/lib/api/serverApi";
import { cookies } from "next/headers";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPrivateRoute = pathname.startsWith("/profile") || pathname.startsWith("/notes");
  const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  const refreshToken = cookieStore.get("refreshToken")?.value || null;

  let session = null;

  if (accessToken) {
    session = await checkSession();
  }

  if (!session && refreshToken) {
    const newTokens = await refreshSession(refreshToken);
    if (newTokens) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = newTokens;

      const response = NextResponse.next();
      response.cookies.set("accessToken", newAccessToken, { httpOnly: true, path: "/" });
      response.cookies.set("refreshToken", newRefreshToken, { httpOnly: true, path: "/" });

      session = await checkSession();

      if (!session && isPrivateRoute) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      if (isAuthRoute && session) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return response;
    }
  }

  if (isPrivateRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};