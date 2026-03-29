import { NextResponse } from "next/server";

const SESSION_COOKIE = "gl_admin_session";
const SESSION_SECRET = "gl-session-secret-2024";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get(SESSION_COOKIE)?.value;
    if (session !== SESSION_SECRET) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login") {
    const session = request.cookies.get(SESSION_COOKIE)?.value;
    if (session !== SESSION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
