import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { getProjects } from "@/lib/projects";
import { getTestimonials } from "@/lib/testimonials";
import { getMedia } from "@/lib/media";
import { getSettings } from "@/lib/settings";

// Remove force-dynamic for better SEO - only use when necessary
// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Luxury Construction in Delhi & Bali | Premium Residential Projects",
  description: "Nirvana Group - Premier luxury construction company in Delhi NCR and Bali. Specializing in premium builder floors, kothis, luxury apartments, and sustainable villas. 20+ years of excellence in residential construction and redevelopment projects.",
  keywords: [
    "luxury construction Delhi",
    "premium builder floors South Delhi",
    "luxury villas Bali Indonesia", 
    "residential construction Delhi NCR",
    "redevelopment projects South Delhi",
    "premium apartments Delhi",
    "sustainable luxury villas Bali",
    "high-end residential construction",
    "luxury real estate development",
    "premium construction company India"
  ],
  openGraph: {
    title: "Luxury Construction in Delhi & Bali | Nirvana Group",
    description: "Premier luxury construction company specializing in premium residential projects across Delhi NCR and Bali. 20+ years of excellence in crafting luxury living spaces.",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Nirvana Group luxury construction projects in Delhi and Bali",
      },
    ],
  },
  alternates: {
    canonical: "https://www.nauhomes.com",
  },
};

// Enhanced JSON-LD for Homepage
const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Luxury Construction in Delhi & Bali | Nirvana Group",
  "description": "Premier luxury construction company specializing in premium residential projects across Delhi NCR and Bali.",
  "url": "https://www.nauhomes.com",
  "mainEntity": {
    "@type": "Organization",
    "name": "Nirvana Group",
    "description": "Luxury construction company with 20+ years of experience in Delhi NCR and Bali",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Construction Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Luxury Builder Floors",
            "description": "Premium builder floors in South Delhi's elite colonies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Luxury Villas Bali",
            "description": "Sustainable luxury villas in Bali, Indonesia"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Redevelopment Projects",
            "description": "Complete redevelopment solutions in Delhi NCR"
          }
        }
      ]
    }
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.nauhomes.com"
      }
    ]
  }
};

export default function HomePage() {
  const projects = getProjects();
  const testimonials = getTestimonials();
  const media = getMedia();
  const settings = getSettings();

  return (
    <>
      {/* Homepage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema),
        }}
      />
      
      <HomePageClient
        projects={projects}
        testimonials={testimonials}
        media={media}
        sectionVisibility={settings.sectionVisibility}
        homepageImages={settings.homepageImages}
      />
    </>
  );
}console.log('FORCE DEPLOY: Thu Apr 23 07:48:49 UTC 2026');
