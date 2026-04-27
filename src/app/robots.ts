import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          // Note: /_next/ is fine for crawlers to fetch (it serves images, fonts,
          // and CSS that Googlebot needs to render the page). We keep API and admin out.
          // /.well-known/ deliberately allowed — used for verification, security.txt, etc.
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/projects',
          '/about',
          '/services',
          '/contact',
          '/blog',
        ],
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
    ],
    sitemap: 'https://www.nauhomes.com/sitemap.xml',
    host: 'https://www.nauhomes.com',
  }
}