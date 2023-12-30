import { NextRequest, NextResponse } from "next/server";
import { getSession } from './lib/session';

const publicPathPrefixes = ['/login', '/register'];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl
  if (process.env.ENFORCE_AUTHZ !== "no") {
    try {
      const session = await getSession();
      if (session !== undefined) {
        if (publicPathPrefixes.some((prefix) => pathname.startsWith(prefix))) {
          return NextResponse.redirect(new URL('/profile', request.url));
        }
        return NextResponse.next();
      } else {
        if (publicPathPrefixes.some((prefix) => pathname.startsWith(prefix))) {
          return NextResponse.next();
        }
        const dest = new URL('/login', request.url);
        dest.searchParams.append('then', request.url);
        return NextResponse.redirect(dest);
      }
    }
    catch (err) {
      console.error(err);
      if (!pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo|banner|.well-known).*)"]
}
