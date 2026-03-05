import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  let accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  const response = NextResponse.next();

  if (!accessToken) {
    if (refreshToken) {
      try {
        const data = await checkSession();
        const setCookieHeader = data.headers['set-cookie'];

        if (setCookieHeader) {
          const cookieArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];

          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            for (const [name, value] of Object.entries(parsed)) {
              if (value !== undefined) {
                
                cookieStore.set(name, value);

              
                response.cookies.set(name, value, {
                  path: '/', 
                  httpOnly: true,
                  sameSite: 'lax',
                });

              
                if (name === 'accessToken') {
                  accessToken = value;
                }
              }
            }
          }
        }
      } catch (err) {
        console.error('Session refresh failed', err);
      }
    }

    if (isPrivateRoute && !accessToken) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return response;
  }

  if (isPublicRoute) return NextResponse.redirect(new URL('/', request.url));

  return response;
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};