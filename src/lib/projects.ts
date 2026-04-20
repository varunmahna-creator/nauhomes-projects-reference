import type { Project, ProjectStatus, ProjectLocation } from "@/types";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "projects.json");

export function getProjects(): Project[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Project[];
}

export function saveProjects(projects: Project[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2), "utf-8");
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function filterProjects(
  status: ProjectStatus | "all",
  location: ProjectLocation | "all"
): Project[] {
  return getProjects().filter((p) => {
    const matchStatus = status === "all" || p.status === status;
    const matchLocation = location === "all" || p.location === location;
    return matchStatus && matchLocation;
  });
}

export function getRelatedProjects(currentSlug: string, limit: number = 3): Project[] {
  const projects = getProjects();
  const current = projects.find((p) => p.slug === currentSlug);
  if (!current) return projects.slice(0, limit);
  const sameLocation = projects.filter((p) => p.slug !== currentSlug && p.location === current.location);
  const others = projects.filter((p) => p.slug !== currentSlug && p.location !== current.location);
  return [...sameLocation, ...others].slice(0, limit);
}
