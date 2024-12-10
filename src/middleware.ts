import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/verifyToken";
import { getAccessToken } from "./utils/loginService";

const authRoutes = ["/login"];

const roleBasedRoutes = {
  CUSTOMER: [/^\/customer-dashboard/],
  VENDOR: [/^\/vendor-dashboard/],
  ADMIN: [/^\/admin-dashboard/],
  SUPER_ADMIN: [/^\/admin-dashboard/],
};

type Role = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const token = await getAccessToken();
  let user: { role?: Role; [key: string]: any } | null = null;

  // console.log("token", token);

  if (token) {
    try {
      user = verifyToken(token);
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  // console.log("user", user);

  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      const redirectUrl =
        request.nextUrl.searchParams.get("redirect") || pathname;
      return NextResponse.redirect(
        new URL(`/login?redirect=${redirectUrl}${search}`, request.url)
      );
    }
  }

  if (
    pathname === "/productDetails" ||
    pathname === "/shop" ||
    pathname === "/recentView" ||
    pathname === "/checkout"
  ) {
    const redirectUrl = request.nextUrl.searchParams.get("redirect");
    if (redirectUrl) {
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.next();
  }

  if (user?.role && roleBasedRoutes[user.role]) {
    const allowedRoutes = roleBasedRoutes[user.role];
    if (allowedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/productDetails",
    "/recentView",
    "/shop",
    "/checkout",
    "/customer-dashboard",
    "/vendor-dashboard",
    "/admin-dashboard",
    "/customer-dashboard/:page*",
    "/vendor-dashboard/:page*",
    "/admin-dashboard/:page*",
  ],
};