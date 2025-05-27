import { JWT } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = (req as NextRequest & { nextauth: { token: JWT } }).nextauth
      .token;

    const checkoutPage = pathname.startsWith("/checkout");

    // Block access to /checkout if not logged in
    if (checkoutPage && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  },
);

export const config = {
  matcher: ["/checkout"],
};
