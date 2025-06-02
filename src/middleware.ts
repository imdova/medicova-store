// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // If no token (not authenticated) and trying to access checkout
    if (!token && pathname.startsWith("/checkout")) {
      // Redirect to login with a callback URL to return after login
      const callbackUrl = encodeURIComponent(req.nextUrl.href);
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, req.url),
      );
    }
    // If no token (not authenticated) and trying to access account
    if (!token && pathname.startsWith("/account")) {
      // Redirect to login with a callback URL to return after login
      const callbackUrl = encodeURIComponent(req.nextUrl.href);
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, req.url),
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
    pages: {
      error: "/auth/error",
    },
  },
);

export const config = {
  matcher: ["/checkout", "/checkout/:path*", "/account/:path*"],
};
