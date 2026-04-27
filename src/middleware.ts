import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "nau_admin";

// Build an HMAC-like token from the password at runtime (Edge runtime safe).
// We store a SHA-256 hash of the password as the cookie value. On each request
// we compare against the hash of the current ADMIN_PASSWORD.
async function expectedToken(): Promise<string | null> {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  const data = new TextEncoder().encode(`nau::${pw}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Routes that require auth (admin UI + all mutation endpoints).
function isProtected(pathname: string): boolean {
  if (pathname.startsWith("/admin")) {
    // Allow the login page itself.
    if (pathname === "/admin/login") return false;
    return true;
  }
  // Protect mutation endpoints.
  if (
    pathname.startsWith("/api/projects") ||
    pathname.startsWith("/api/upload") ||
    pathname.startsWith("/api/testimonials") ||
    pathname.startsWith("/api/media") ||
    pathname.startsWith("/api/settings") ||
    pathname.startsWith("/api/leads")
  ) {
    return true;
  }
  return false;
}

// For API routes, we only protect mutation verbs. GET stays public so the
// homepage, /delhi, /bali etc. can keep reading the DB without auth.
function isMutation(method: string): boolean {
  return method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE";
}

// Public mutation endpoints (form submissions from the public site).
// These are POST-only and must remain reachable without admin auth.
function isPublicMutation(pathname: string, method: string): boolean {
  if (method !== "POST") return false;
  // New lead from the public contact form.
  if (pathname === "/api/leads" || pathname === "/api/leads/") return true;
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method.toUpperCase();

  // API routes: only protect mutations. GET is public.
  const isApi = pathname.startsWith("/api/");
  if (isApi && !isMutation(method)) {
    return NextResponse.next();
  }

  // Public mutation endpoints (e.g. contact-form lead submission) bypass auth.
  if (isApi && isPublicMutation(pathname, method)) {
    return NextResponse.next();
  }

  if (!isProtected(pathname)) {
    return NextResponse.next();
  }

  const expected = await expectedToken();
  if (!expected) {
    // Password not configured → treat everything as locked down.
    if (isApi) {
      return NextResponse.json(
        {
          error: "Admin not configured",
          details: "Set ADMIN_PASSWORD in Vercel environment variables.",
        },
        { status: 503 }
      );
    }
    // For UI, redirect to login which will show the same message.
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("error", "not_configured");
    return NextResponse.redirect(url);
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie && cookie === expected) {
    return NextResponse.next();
  }

  // Auth failed.
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
