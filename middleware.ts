import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "nau_admin";

// Build an HMAC-like token from the password at runtime (Edge runtime safe).
async function expectedToken(): Promise<string | null> {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  const data = new TextEncoder().encode(`nau::${pw}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function isMutation(method: string): boolean {
  return method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE";
}

// Public READ endpoints — anyone can GET. Used by the public site to render
// projects, settings, etc. Anything NOT listed here that's under /api/ and
// matched by the middleware needs admin auth.
function isPublicRead(pathname: string, method: string): boolean {
  if (method !== "GET" && method !== "HEAD") return false;
  if (pathname.startsWith("/api/projects")) return true;
  if (pathname.startsWith("/api/testimonials")) return true;
  if (pathname.startsWith("/api/media")) return true;
  if (pathname.startsWith("/api/settings")) return true;
  // /api/leads GET is admin-only (contains PII)
  return false;
}

// Public WRITE endpoints — anonymous users can POST.
function isPublicMutation(pathname: string, method: string): boolean {
  if (method !== "POST") return false;
  // Public contact-form lead submission.
  if (pathname === "/api/leads" || pathname === "/api/leads/") return true;
  return false;
}

// Routes under the matcher that fall through to auth check.
function requiresAuth(pathname: string): boolean {
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return false;
    return true;
  }
  // All matched /api/* paths that weren't whitelisted above.
  return pathname.startsWith("/api/");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method.toUpperCase();

  // 1. Public reads bypass auth entirely.
  if (isPublicRead(pathname, method)) {
    return NextResponse.next();
  }

  // 2. Public mutations (contact form lead) bypass auth.
  if (isPublicMutation(pathname, method)) {
    return NextResponse.next();
  }

  // 3. Anything else under the matcher requires admin cookie.
  if (!requiresAuth(pathname)) {
    return NextResponse.next();
  }

  const expected = await expectedToken();
  const isApi = pathname.startsWith("/api/");

  if (!expected) {
    if (isApi) {
      return NextResponse.json(
        {
          error: "Admin not configured",
          details: "Set ADMIN_PASSWORD in Vercel environment variables.",
        },
        { status: 503 }
      );
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("error", "not_configured");
    return NextResponse.redirect(url);
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie && cookie === expected) {
    return NextResponse.next();
  }

  if (isApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/projects/:path*",
    "/api/upload/:path*",
    "/api/testimonials/:path*",
    "/api/media/:path*",
    "/api/settings/:path*",
    "/api/leads/:path*",
  ],
};
