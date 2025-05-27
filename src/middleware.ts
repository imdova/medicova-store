// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // If no token (not authenticated), redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // This is where you can add additional authorization logic
        return !!token; // Just check if token exists for basic auth
      },
    },
    pages: {
      signIn: "/login",
      error: "/auth/error",
    },
  },
);

export const config = {
  matcher: ["/login", "/login/:path*"],
};
