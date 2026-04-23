import { NextResponse } from "next/server";
import { getProjects, saveProjects } from "@/lib/projects";
import type { Project } from "@/types";

export async function GET() {
  const projects = getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    console.log("Creating new project...");
    const body = await request.json();
    console.log("Project data received:", body);
    
    // Validate required fields
    if (!body.title || !body.title.trim()) {
      console.log("Validation failed: Missing title");
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const projects = getProjects();
    console.log("Current projects count:", projects.length);

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    console.log("Generated slug:", slug);

    // Check for duplicate slug
    if (projects.find((p: Project) => p.slug === slug)) {
      console.log("Duplicate slug found:", slug);
      return NextResponse.json({ error: "A project with this name already exists" }, { status: 400 });
    }

    const newProject: Project = {
      slug,
      title: body.title || "",
      subtitle: body.subtitle || "",
      location: body.location || "delhi",
      locationLabel: body.locationLabel || "",
      status: body.status || "ongoing",
      type: body.type || "",
      area: body.area || "",
      year: body.year || "",
      thumbnail: body.thumbnail || "",
      gallery: body.gallery || [],
      floorPlans: body.floorPlans || [],
      tourEmbedUrl: body.tourEmbedUrl || null,
      description: body.description || "",
      highlights: body.highlights || [],
      amenities: body.amenities || [],
      specs: body.specs || {},
      timeline: body.timeline || [],
    };

    console.log("Saving project:", newProject);
    projects.push(newProject);
    saveProjects(projects);
    console.log("Project saved successfully");

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Project creation error:", error);
    return NextResponse.json({ 
      error: "Failed to create project", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
