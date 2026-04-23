import { NextResponse } from "next/server";

export async function GET() {
  const status = {
    timestamp: new Date().toISOString(),
    version: "2025-12-30-final-fix",
    deployment: "latest",
    message: "API is working - if you see this, deployment is active",
    test: true
  };
  
  console.log("Status endpoint called:", status);
  
  return NextResponse.json(status);
}