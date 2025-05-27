// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow access if token exists (user is authenticated)
        return !!token;
      },
    },
    pages: {
      signIn: "/login", // Redirect to this page if not authenticated
      error: "/auth/error", // Error page for auth failures
    },
  },
);

export const config = {
  matcher: ["/login", "/checkout/:path*"], // Protect all checkout routes
};
