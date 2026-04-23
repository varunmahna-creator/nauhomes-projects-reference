import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    status: "success",
    message: "Build is working",
    timestamp: new Date().toISOString(),
    projects: [
      {
        slug: "test-villa",
        title: "Test Villa Project",
        location: "delhi",
        status: "ongoing"
      }
    ]
  });
}