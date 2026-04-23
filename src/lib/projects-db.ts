import { fallbackProjects } from '@/lib/fallback-data'
import type { Project, ProjectStatus, ProjectLocation } from '@/types'

// In-memory storage for the current session
let sessionProjects: Project[] = [...fallbackProjects];

export async function getProjects(): Promise<Project[]> {
  try {
    console.log('Getting projects, count:', sessionProjects.length);
    return sessionProjects;
  } catch (error) {
    console.error('Error in getProjects:', error);
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return sessionProjects.find(p => p.slug === slug) || null;
  } catch (error) {
    console.error('Error in getProjectBySlug:', error);
    return fallbackProjects.find(p => p.slug === slug) || null;
  }
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project | null> {
  try {
    const newProject: Project = {
      ...project,
      // Add a unique ID
      slug: project.slug
    };
    
    console.log('Adding project to session storage:', newProject.title);
    sessionProjects.push(newProject);
    
    return newProject;
  } catch (error) {
    console.error('Error in createProject:', error);
    return null;
  }
}

export async function updateProject(slug: string, updates: Partial<Project>): Promise<Project | null> {
  try {
    const index = sessionProjects.findIndex(p => p.slug === slug);
    if (index === -1) {
      return null;
    }
    
    sessionProjects[index] = { ...sessionProjects[index], ...updates };
    return sessionProjects[index];
  } catch (error) {
    console.error('Error in updateProject:', error);
    return null;
  }
}

export async function deleteProject(slug: string): Promise<boolean> {
  try {
    const index = sessionProjects.findIndex(p => p.slug === slug);
    if (index === -1) {
      return false;
    }
    
    sessionProjects.splice(index, 1);
    return true;
  } catch (error) {
    console.error('Error in deleteProject:', error);
    return false;
  }
}

export async function filterProjects(
  status: ProjectStatus | "all",
  location: ProjectLocation | "all"
): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => {
    const matchStatus = status === "all" || p.status === status;
    const matchLocation = location === "all" || p.location === location;
    return matchStatus && matchLocation;
  });
}

export async function getRelatedProjects(currentSlug: string, limit: number = 3): Promise<Project[]> {
  const projects = await getProjects();
  const current = projects.find((p) => p.slug === currentSlug);
  if (!current) return projects.slice(0, limit);
  
  const sameLocation = projects.filter((p) => 
    p.slug !== currentSlug && p.location === current.location
  );
  const others = projects.filter((p) => 
    p.slug !== currentSlug && p.location !== current.location
  );
  
  return [...sameLocation, ...others].slice(0, limit);
}