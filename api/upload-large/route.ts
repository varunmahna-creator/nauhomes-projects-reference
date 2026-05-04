import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

const VALID_VIDEO_TYPES = new Set([
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/avi",
  "video/mov",
]);

const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

function sanitize(part: string | null | undefined, fallback: string): string {
  if (!part) return fallback;
  return part
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || fallback;
}

export async function POST(request: Request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Blob storage not configured" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const projectSlug = sanitize(formData.get("slug") as string | null, "general");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!VALID_VIDEO_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type", details: `Only video files allowed. Got: ${file.type}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { 
          error: "File too large", 
          details: `Maximum size is 50MB. Your file: ${(file.size / 1024 / 1024).toFixed(1)}MB`,
        },
        { status: 413 }
      );
    }

    const ext = (file.name.split(".").pop() || "mp4").toLowerCase();
    const timestamp = Date.now();
    const filename = `timeline-video-${timestamp}.${ext}`;
    const pathname = `projects/${projectSlug}/timeline/${filename}`;

    const blob = await put(pathname, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: true,
    });

    return NextResponse.json({
      success: true,
      path: blob.url,
      url: blob.url,
      pathname: blob.pathname,
      size: file.size,
      type: file.type,
      filename,
    });
  } catch (error) {
    console.error("Large video upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}