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
          '/_next/',
          '/private/',
          '/.well-known/',
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