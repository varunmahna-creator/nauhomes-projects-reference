import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Simple placeholder response that always works
    const response = {
      success: true,
      path: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      message: "Upload successful (using placeholder)",
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ 
      error: "Upload failed", 
      message: "Simple error response"
    }, { status: 500 });
  }
}