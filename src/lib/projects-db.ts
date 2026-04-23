import { supabase, supabaseAdmin } from '@/lib/supabase'
import type { Project, ProjectStatus, ProjectLocation } from '@/types'
import type { Database } from '@/types/database'

type ProjectRow = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']

// Convert database row to Project interface
function rowToProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle || '',
    location: row.location,
    locationLabel: row.location_label || '',
    status: row.status,
    type: row.type || '',
    area: row.area || '',
    year: row.year || '',
    thumbnail: row.thumbnail || '',
    gallery: row.gallery || [],
    floorPlans: row.floor_plans || [],
    tourEmbedUrl: row.tour_embed_url,
    description: row.description || '',
    highlights: row.highlights || [],
    amenities: row.amenities || [],
    specs: row.specs || {},
    timeline: row.timeline || [],
  }
}

// Convert Project interface to database insert
function projectToInsert(project: Omit<Project, 'id'>): ProjectInsert {
  return {
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle || null,
    location: project.location,
    location_label: project.locationLabel || null,
    status: project.status,
    type: project.type || null,
    area: project.area || null,
    year: project.year || null,
    thumbnail: project.thumbnail || null,
    gallery: project.gallery,
    floor_plans: project.floorPlans,
    tour_embed_url: project.tourEmbedUrl,
    description: project.description || null,
    highlights: project.highlights,
    amenities: project.amenities,
    specs: project.specs,
    timeline: project.timeline,
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }

    return data.map(rowToProject)
  } catch (error) {
    console.error('Error in getProjects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      return null
    }

    return rowToProject(data)
  } catch (error) {
    console.error('Error in getProjectBySlug:', error)
    return null
  }
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert(projectToInsert(project))
      .select()
      .single()

    if (error || !data) {
      console.error('Error creating project:', error)
      return null
    }

    return rowToProject(data)
  } catch (error) {
    console.error('Error in createProject:', error)
    return null
  }
}

export async function updateProject(slug: string, updates: Partial<Project>): Promise<Project | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .update({
        ...projectToInsert(updates as Project),
        updated_at: new Date().toISOString(),
      })
      .eq('slug', slug)
      .select()
      .single()

    if (error || !data) {
      console.error('Error updating project:', error)
      return null
    }

    return rowToProject(data)
  } catch (error) {
    console.error('Error in updateProject:', error)
    return null
  }
}

export async function deleteProject(slug: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('slug', slug)

    if (error) {
      console.error('Error deleting project:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in deleteProject:', error)
    return false
  }
}

export async function filterProjects(
  status: ProjectStatus | "all",
  location: ProjectLocation | "all"
): Promise<Project[]> {
  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (status !== "all") {
      query = query.eq('status', status)
    }

    if (location !== "all") {
      query = query.eq('location', location)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error filtering projects:', error)
      return []
    }

    return data.map(rowToProject)
  } catch (error) {
    console.error('Error in filterProjects:', error)
    return []
  }
}

export async function getRelatedProjects(currentSlug: string, limit: number = 3): Promise<Project[]> {
  try {
    const projects = await getProjects()
    const current = projects.find((p) => p.slug === currentSlug)
    if (!current) return projects.slice(0, limit)
    
    const sameLocation = projects.filter((p) => 
      p.slug !== currentSlug && p.location === current.location
    )
    const others = projects.filter((p) => 
      p.slug !== currentSlug && p.location !== current.location
    )
    
    return [...sameLocation, ...others].slice(0, limit)
  } catch (error) {
    console.error('Error in getRelatedProjects:', error)
    return []
  }
}