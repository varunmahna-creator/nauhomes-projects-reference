import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nirvana Group | Luxury Construction in Delhi & Bali',
    short_name: 'Nirvana Group',
    description: 'Crafting luxury living spaces in Delhi NCR and Bali. Over 20 years of excellence in residential construction.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F9FAF7',
    theme_color: '#0A1F44',
    categories: ['business', 'lifestyle', 'real-estate'],
    lang: 'en',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}