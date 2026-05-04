import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { createHash } from "crypto";

export const runtime = "nodejs";

const COOKIE_NAME = "nau_admin";

// Mirrors src/middleware.ts expectedToken() so we can verify the admin cookie
// during token generation. This endpoint sits OUTSIDE the middleware matcher
// (so Vercel Blob's server-to-server callback can reach it) — so we do the
// auth check inline on the initial client handoff.
function expectedAdminToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHash("sha256").update(`nau::${pw}`).digest("hex");
}

function isAuthed(request: Request): boolean {
  const expected = expectedAdminToken();
  if (!expected) return false;
  const cookieHeader = request.headers.get("cookie") || "";
  const entry = cookieHeader
    .split(/;\s*/)
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!entry) return false;
  const val = entry.slice(COOKIE_NAME.length + 1);
  return val === expected;
}

const VALID_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  "application/pdf",
];

// 500MB cap — plenty for construction videos. Vercel Blob itself supports 5GB
// but we don't want to accept anything that large from a form.
const MAX_SIZE_BYTES = 500 * 1024 * 1024;

// Whitelist of pathname prefixes the client is allowed to write to.
// Format: "projects/<slug>/<subfolder>/<filename>" where slug is slug-safe
// and subfolder is one of our known categories.
const PATH_RE =
  /^projects\/[a-z0-9][a-z0-9-]{0,79}\/(thumbnail|gallery|floor-plans|timeline|virtual-tour)\/[a-zA-Z0-9._-]{1,120}$/;

export async function POST(request: Request): Promise<NextResponse> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Blob storage not configured" },
      { status: 500 },
    );
  }

  // Cache auth check — evaluated once per request and re-used inside
  // onBeforeGenerateToken (Vercel Blob's own callback from blob.com DOES NOT
  // carry our cookie and does NOT call onBeforeGenerateToken, so this only
  // affects the initial client handoff).
  const authed = isAuthed(request);

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!authed) {
          throw new Error("Unauthorized");
        }
        if (!PATH_RE.test(pathname)) {
          throw new Error("Invalid upload path");
        }
        return {
          allowedContentTypes: VALID_CONTENT_TYPES,
          maximumSizeInBytes: MAX_SIZE_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("[blob-upload] completed:", blob.url, blob.pathname);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload token error";
    const status =
      message === "Unauthorized" ? 401 :
      message === "Invalid upload path" ? 400 :
      500;
    return NextResponse.json({ error: message }, { status });
  }
}
