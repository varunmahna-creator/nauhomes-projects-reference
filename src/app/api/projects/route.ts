import { NextResponse } from "next/server";
import { getProjects, createProject, getProjectBySlug } from "@/lib/projects-db";
import type { Project, ProjectLocation, ProjectStatus } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.title || typeof body.title !== "string") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const slug = body.slug ? slugify(body.slug) : slugify(body.title);
    if (!slug) {
      return NextResponse.json(
        { error: "Could not derive a valid slug from title" },
        { status: 400 }
      );
    }

    const existing = await getProjectBySlug(slug);
    if (existing) {
      return NextResponse.json(
        { error: "Project with this slug already exists", slug },
        { status: 409 }
      );
    }

    const project: Project = {
      slug,
      title: body.title,
      subtitle: body.subtitle ?? "",
      location: (body.location as ProjectLocation) ?? "delhi",
      locationLabel: body.locationLabel ?? "",
      status: (body.status as ProjectStatus) ?? "ongoing",
      type: body.type ?? "",
      area: body.area ?? "",
      year: body.year ?? "",
      thumbnail: body.thumbnail ?? "",
      gallery: Array.isArray(body.gallery) ? body.gallery : [],
      floorPlans: Array.isArray(body.floorPlans) ? body.floorPlans : [],
      tourEmbedUrl: body.tourEmbedUrl ?? null,
      description: body.description ?? "",
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      amenities: Array.isArray(body.amenities) ? body.amenities : [],
      specs: typeof body.specs === "object" && body.specs ? body.specs : {},
      timeline: Array.isArray(body.timeline) ? body.timeline : [],
      virtualTourVideos: Array.isArray(body.virtualTourVideos) ? body.virtualTourVideos : [],
    };

    const created = await createProject(project);
    if (!created) {
      return NextResponse.json(
        {
          error: "Failed to create project",
          details:
            "Database may not be configured. Connect Vercel Postgres in the Vercel dashboard → Storage.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      {
        error: "Failed to create project",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
