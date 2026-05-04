import { NextResponse } from "next/server";

export const runtime = "nodejs";

async function expectedToken(pw: string): Promise<string> {
  const data = new TextEncoder().encode(`nau::${pw}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const password = typeof body?.password === "string" ? body.password : "";
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected) {
      return NextResponse.json(
        {
          error: "Not configured",
          details: "ADMIN_PASSWORD is not set in environment variables.",
        },
        { status: 503 }
      );
    }

    if (!password || password !== expected) {
      // Constant-time-ish sleep to slow brute force.
      await new Promise((r) => setTimeout(r, 500));
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = await expectedToken(password);
    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: "nau_admin",
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      // 30-day session.
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
