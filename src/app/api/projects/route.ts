import { NextResponse } from "next/server";
import { getProjects, saveProjects } from "@/lib/projects";
import type { Project } from "@/types";

export async function GET() {
  const projects = getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const projects = getProjects();

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check for duplicate slug
    if (projects.find((p: Project) => p.slug === slug)) {
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

    projects.push(newProject);
    saveProjects(projects);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
