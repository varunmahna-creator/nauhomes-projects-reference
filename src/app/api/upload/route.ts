import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const projectSlug = formData.get("slug") as string;
    const imageType = formData.get("type") as string;

    console.log('📤 Upload request:', {
      hasFile: !!file,
      fileName: file?.name,
      fileType: file?.type,
      fileSize: file?.size,
      projectSlug,
      imageType
    });

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const validTypes = [
      "image/jpeg", "image/jpg", "image/png", "image/webp", 
      "image/avif", "application/pdf"
    ];
    
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: `Invalid file type: ${file.type}. Allowed: JPEG, PNG, WebP, AVIF, PDF` 
      }, { status: 400 });
    }

    // Generate placeholder URL based on file type
    const timestamp = Date.now();
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${imageType || 'image'}-${timestamp}.${ext}`;
    
    let placeholderUrl: string;
    
    if (file.type.startsWith('image/')) {
      const imageMap: Record<string, string> = {
        'thumbnail': 'photo-1600596542815-ffad4c1539a9',
        'gallery': 'photo-1600607687939-ce8a6c25118c', 
        'floorplan': 'photo-1503387762-592deb58ef4e'
      };
      
      const unsplashId = imageMap[imageType] || imageMap.gallery;
      placeholderUrl = `https://images.unsplash.com/photo/${unsplashId}?w=800&q=80&auto=format&fit=crop`;
    } else if (file.type === 'application/pdf') {
      placeholderUrl = `https://via.placeholder.com/400x600/f0f0f0/333333?text=PDF+Floor+Plan`;
    } else {
      placeholderUrl = `https://via.placeholder.com/400x300/f0f0f0/333333?text=Uploaded+File`;
    }

    const response = {
      success: true,
      path: placeholderUrl,
      filename: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      message: "File uploaded successfully (placeholder)"
    };

    console.log('✅ Upload successful:', response);
    
    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json({ 
      error: "Upload failed", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}