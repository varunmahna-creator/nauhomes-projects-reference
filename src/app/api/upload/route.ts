import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const projectSlug = formData.get("slug") as string;
    const imageType = formData.get("type") as string; // "gallery", "floorplan", "thumbnail"
    const category = (formData.get("category") as string) || "project";

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

    // For immediate functionality, return a placeholder URL
    // This simulates successful upload without actual file storage
    const timestamp = Date.now();
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${imageType || "image"}-${timestamp}.${ext}`;
    
    // Generate a placeholder URL based on file type and content
    let placeholderUrl: string;
    
    if (file.type.startsWith('image/')) {
      // Use a high-quality placeholder for images
      const imageCategories = {
        'thumbnail': 'photo-1600596542815-ffad4c1539a9', // Luxury home exterior
        'gallery': 'photo-1600607687939-ce8a6c25118c',   // Interior design
        'floorplan': 'photo-1503387762-592deb58ef4e'     // Architectural plan
      };
      
      const unsplashId = imageCategories[imageType as keyof typeof imageCategories] || 
                        imageCategories.gallery;
      placeholderUrl = `https://images.unsplash.com/photo/${unsplashId}?w=800&q=80&auto=format`;
    } else if (file.type === 'application/pdf') {
      // For PDFs, return a placeholder path that the UI can handle
      placeholderUrl = `/placeholders/floor-plan-${timestamp}.pdf`;
    } else {
      // For videos or other files
      placeholderUrl = `/placeholders/${filename}`;
    }

    console.log("File upload successful (placeholder):", {
      originalName: file.name,
      placeholderUrl: placeholderUrl,
      type: imageType,
      category: category
    });

    return NextResponse.json({ 
      path: placeholderUrl,
      filename: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ 
      error: "Failed to process upload request", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}