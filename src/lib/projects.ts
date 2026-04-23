import type { Project, ProjectStatus, ProjectLocation } from "@/types";

// For Vercel deployment, we'll use a different approach
const INITIAL_PROJECTS: Project[] = [];

// In development, use file system; in production, use in-memory storage
let projectsCache: Project[] | null = null;

export function getProjects(): Project[] {
  // In serverless environment, return cached data or initial empty array
  if (typeof window === 'undefined') {
    // Server-side: return initial projects or cached data
    return projectsCache || INITIAL_PROJECTS;
  }
  
  // Client-side: use localStorage
  try {
    const stored = localStorage.getItem('nirvana_projects');
    return stored ? JSON.parse(stored) : INITIAL_PROJECTS;
  } catch {
    return INITIAL_PROJECTS;
  }
}

export function saveProjects(projects: Project[]): void {
  // Cache for server-side rendering
  projectsCache = projects;
  
  // Save to localStorage on client-side
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('nirvana_projects', JSON.stringify(projects));
    } catch (error) {
      console.error('Failed to save projects to localStorage:', error);
    }
  }
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
