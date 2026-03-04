import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Приватні маршрути
  const isPrivateRoute = pathname.startsWith("/profile") || pathname.startsWith("/notes");
  // Auth маршрути (логін/реєстрація)
  const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  // Перевірка сесії користувача
  const session = await checkSession();

  // Редірект на логін, якщо приватна сторінка і нема сесії
  if (isPrivateRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Редірект на профіль, якщо auth сторінка і користувач вже залогінений
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/profile", req.url));
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