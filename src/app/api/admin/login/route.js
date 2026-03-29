import { NextResponse } from "next/server";
import { ADMIN_USER, ADMIN_PASS, SESSION_COOKIE, SESSION_SECRET } from "@/lib/auth";

export async function POST(req) {
  const { username, password } = await req.json();

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, SESSION_SECRET, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });
  return res;
}
