import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const projectSlug = formData.get("slug") as string;
    const imageType = formData.get("type") as string; // "gallery", "floorplan", "thumbnail"
    const category = (formData.get("category") as string) || "project";
    const testimonialId = formData.get("testimonialId") as string;

    if (!file) {
      console.log("Upload failed: No file provided");
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    console.log("File upload attempt:", {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "video/mp4", "video/quicktime", "video/webm", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Allowed: JPEG, PNG, WebP, AVIF, PDF" }, { status: 400 });
    }

    // Create directory based on category
    let uploadDir: string;
    let publicPath: string;

    if (category === "media") {
      uploadDir = path.join(process.cwd(), "public", "images", "media");
    } else if (category === "testimonial") {
      uploadDir = path.join(process.cwd(), "public", "images", "testimonials", testimonialId || "unknown");
    } else if (category === "timeline") {
      uploadDir = path.join(process.cwd(), "public", "images", "projects", projectSlug, "timeline");
    } else {
      uploadDir = path.join(process.cwd(), "public", "images", "projects", projectSlug);
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate filename
    const ext = file.name.split(".").pop() || "jpg";
    const timestamp = Date.now();
    const filename = `${imageType || "image"}-${timestamp}.${ext}`;
    const filePath = path.join(uploadDir, filename);

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("Writing file to:", filePath);
    fs.writeFileSync(filePath, buffer);
    console.log("File written successfully");

    // Return the public URL path based on category
    if (category === "media") {
      publicPath = `/images/media/${filename}`;
    } else if (category === "testimonial") {
      publicPath = `/images/testimonials/${testimonialId || "unknown"}/${filename}`;
    } else if (category === "timeline") {
      publicPath = `/images/projects/${projectSlug}/timeline/${filename}`;
    } else {
      publicPath = `/images/projects/${projectSlug}/${filename}`;
    }

    return NextResponse.json({ path: publicPath, filename });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ 
      error: "Failed to upload file", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
