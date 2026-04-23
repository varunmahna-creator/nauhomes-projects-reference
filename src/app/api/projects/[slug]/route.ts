import { NextResponse } from "next/server";
import { getProjectBySlug, updateProject, deleteProject } from "@/lib/projects-db";
import type { Project } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const project = await getProjectBySlug(params.slug);
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    console.log("Updating project:", params.slug, body);
    
    const updatedProject = await updateProject(params.slug, body);
    
    if (!updatedProject) {
      return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
    
    console.log("Project updated successfully:", updatedProject);
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Project update error:", error);
    return NextResponse.json({ 
      error: "Failed to update project", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    console.log("Deleting project:", params.slug);
    
    const success = await deleteProject(params.slug);
    
    if (!success) {
      return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
    
    console.log("Project deleted successfully:", params.slug);
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Project deletion error:", error);
    return NextResponse.json({ 
      error: "Failed to delete project", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}