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
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nirvana Group - Luxury Construction in Delhi & Bali"
      }
    ],
    url: "https://www.nauhomes.com",
    siteName: "Nirvana Group",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Construction in Delhi & Bali | Nirvana Group",
    description: "Premier luxury construction company specializing in premium residential projects across Delhi NCR and Bali.",
    images: ["/og-image.jpg"],
    creator: "@nirvanahomes",
    site: "@nirvanahomes"
  },
  alternates: {
    canonical: "https://www.nauhomes.com"
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
  }
  // Verification handled in root layout via env vars.
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
      sectionVisibility={settings.sectionVisibility}
      homepageImages={settings.homepageImages}
    />
  );
}