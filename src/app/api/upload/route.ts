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

    // For Vercel serverless, files need to be uploaded to third-party storage
    // For now, we'll return a placeholder path
    let publicPath: string;
    
    // In a real deployment, you'd upload to:
    // - AWS S3
    // - Cloudinary  
    // - Vercel Blob Storage
    // - etc.
    
    // For demo purposes, return a placeholder path
    const timestamp = Date.now();
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${imageType || "image"}-${timestamp}.${ext}`;
    
    if (category === "media") {
      publicPath = `/images/media/${filename}`;
    } else if (category === "testimonial") {
      publicPath = `/images/testimonials/${testimonialId || "unknown"}/${filename}`;
    } else if (category === "timeline") {
      publicPath = `/images/projects/${projectSlug}/timeline/${filename}`;
    } else {
      publicPath = `/images/projects/${projectSlug}/${filename}`;
    }

    // Generate filename
    const ext = file.name.split(".").pop() || "jpg";
    const timestamp = Date.now();
    const filename = `${imageType || "image"}-${timestamp}.${ext}`;
    

    // TODO: Upload to third-party storage (S3, Cloudinary, etc.)
    // For demo purposes, we're just returning a path
    console.log("File upload simulated for:", filename);

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
