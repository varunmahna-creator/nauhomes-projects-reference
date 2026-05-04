import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

const VALID_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "application/pdf",
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
        {
          error: "Blob storage not configured",
          details:
            "BLOB_READ_WRITE_TOKEN is not set. Connect Vercel Blob in the Vercel dashboard → Storage tab.",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const projectSlug = sanitize(formData.get("slug") as string | null, "general");
    const imageType = sanitize(formData.get("type") as string | null, "image");
    const category = sanitize(formData.get("category") as string | null, "project");
    const testimonialId = sanitize(
      formData.get("testimonialId") as string | null,
      "unknown"
    );

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!VALID_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type",
          details: `Allowed: images (JPEG/PNG/WebP/AVIF/GIF), videos (MP4/WebM/MOV), PDF. Got: ${file.type}`,
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File too large", details: "Max 50MB" },
        { status: 400 }
      );
    }

    const ext = (file.name.split(".").pop() || "bin").toLowerCase();
    const timestamp = Date.now();
    const filename = `${imageType}-${timestamp}.${ext}`;

    let pathname: string;
    if (category === "media") {
      pathname = `media/${filename}`;
    } else if (category === "testimonial") {
      pathname = `testimonials/${testimonialId}/${filename}`;
    } else if (category === "timeline") {
      pathname = `projects/${projectSlug}/timeline/${filename}`;
    } else {
      pathname = `projects/${projectSlug}/${filename}`;
    }

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
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
