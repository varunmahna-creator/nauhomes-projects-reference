import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { getProjects } from "@/lib/projects-db";
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
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        width: 1920,
        height: 1080,
        alt: "Luxury residential construction"
      }
    ],
    url: "https://nauhomes.com",
    siteName: "Nirvana Group",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Construction in Delhi & Bali | Nirvana Group", 
    description: "Premier luxury construction company specializing in premium residential projects across Delhi NCR and Bali.",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"]
  },
  alternates: {
    canonical: "https://nauhomes.com"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code"
  }
};

export default async function Page() {
  const projects = await getProjects();
  const testimonials = getTestimonials();
  const media = getMedia();
  const settings = getSettings();

  return (
    <HomePageClient 
      projects={projects}
      testimonials={testimonials}
      media={media}
      settings={settings}
    />
  );
}