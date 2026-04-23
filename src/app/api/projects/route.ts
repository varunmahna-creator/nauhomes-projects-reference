import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/projects-db";
import type { Project } from "@/types";

export async function GET() {
  try {
    console.log("Fetching projects...");
    const projects = await getProjects();
    console.log("Projects fetched:", projects.length);
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    // Return empty array as fallback
    return NextResponse.json([]);
  }
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

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    console.log("Generated slug:", slug);

    // Check for duplicate slug
    const existingProjects = await getProjects();
    if (existingProjects.find((p: Project) => p.slug === slug)) {
      console.log("Duplicate slug found:", slug);
      return NextResponse.json({ error: "A project with this name already exists" }, { status: 400 });
    }

    const newProject: Omit<Project, 'id'> = {
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

    console.log("Creating project:", newProject);
    const createdProject = await createProject(newProject);

    if (!createdProject) {
      console.error("Failed to create project");
      return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }

    console.log("Project created successfully:", createdProject.slug);
    return NextResponse.json(createdProject, { status: 201 });
    
  } catch (error) {
    console.error("Project creation error:", error);
    return NextResponse.json({ 
      error: "Failed to create project", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}