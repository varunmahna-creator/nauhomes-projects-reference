import { MetadataRoute } from 'next'
import { getProjects } from '@/lib/projects-db'

// Always rebuild on request so new projects are picked up immediately.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.nauhomes.com'
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/delhi`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/bali`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
  ]

  // Dynamic project pages — gracefully degrade if DB is unreachable.
  let projectPages: MetadataRoute.Sitemap = []
  try {
    const projects = await getProjects()
    projectPages = projects
      .filter((p) => !!p.slug)
      .map((p) => {
        // Project type may carry an updated_at; fall back to "now".
        const maybeUpdated = (p as unknown as { updated_at?: string | Date }).updated_at
        const lastModified = maybeUpdated ? new Date(maybeUpdated) : now
        return {
          url: `${baseUrl}/projects/${p.slug}`,
          lastModified: isNaN(lastModified.getTime()) ? now : lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }
      })
  } catch (err) {
    // Don't fail the sitemap on DB error — log and continue with static URLs.
    // eslint-disable-next-line no-console
    console.error('[sitemap] Failed to load projects:', err)
  }

  return [...staticPages, ...projectPages]
}