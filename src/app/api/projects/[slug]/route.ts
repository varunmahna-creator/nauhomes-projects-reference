import { NextResponse } from "next/server";
import {
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "@/lib/projects-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error("GET /api/projects/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const updated = await updateProject(slug, body);
    if (!updated) {
      return NextResponse.json(
        { error: "Project not found or update failed", slug },
        { status: 404 }
      );
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/projects/[slug] error:", error);
    return NextResponse.json(
      {
        error: "Failed to update project",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const success = await deleteProject(slug);
    if (!success) {
      return NextResponse.json(
        { error: "Project not found", slug },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Project deleted", slug });
  } catch (error) {
    console.error("DELETE /api/projects/[slug] error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete project",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
