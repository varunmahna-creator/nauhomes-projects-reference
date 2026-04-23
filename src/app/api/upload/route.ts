import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

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
    const validTypes = [
      "image/jpeg", 
      "image/png", 
      "image/webp", 
      "image/avif", 
      "video/mp4", 
      "video/quicktime", 
      "video/webm", 
      "application/pdf"
    ];
    
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: "Invalid file type. Allowed: JPEG, PNG, WebP, AVIF, MP4, MOV, WebM, PDF" 
      }, { status: 400 });
    }

    // Determine Cloudinary folder structure
    let folder = "nauhomes";
    
    if (category === "media") {
      folder = "nauhomes/media";
    } else if (category === "testimonial") {
      folder = `nauhomes/testimonials/${testimonialId || "unknown"}`;
    } else if (category === "timeline") {
      folder = `nauhomes/projects/${projectSlug}/timeline`;
    } else {
      folder = `nauhomes/projects/${projectSlug}/${imageType || "gallery"}`;
    }

    // Upload to Cloudinary
    try {
      const result = await uploadToCloudinary(file, folder);
      
      console.log("File uploaded successfully to Cloudinary:", {
        url: result.url,
        public_id: result.public_id
      });

      return NextResponse.json({ 
        path: result.url,
        public_id: result.public_id,
        filename: file.name 
      });
      
    } catch (cloudinaryError) {
      console.error("Cloudinary upload error:", cloudinaryError);
      return NextResponse.json({ 
        error: "Failed to upload file to cloud storage",
        details: cloudinaryError instanceof Error ? cloudinaryError.message : "Unknown upload error"
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ 
      error: "Failed to process upload request", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}