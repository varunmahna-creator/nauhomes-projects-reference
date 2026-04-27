export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import ProjectsPageClient from "@/components/sections/projects/ProjectsPageClient";
import { filterProjects } from "@/lib/projects-db";

export const metadata: Metadata = {
  title: "Delhi Projects — Luxury Homes & Builder Floors",
  description: "Premium residential projects in Delhi NCR by Nirvana Group: luxury builder floors, kothis, and redevelopment in South Delhi, Saket, South Ex, Safdarjung, and more.",
  keywords: "Delhi luxury homes, South Delhi builder floors, premium construction Delhi, luxury residential Delhi NCR, kothis South Delhi, Saket builder floor",
  alternates: {
    canonical: "https://www.nauhomes.com/delhi",
    languages: {
      "en-IN": "https://www.nauhomes.com/delhi",
      "en-ID": "https://www.nauhomes.com/bali",
    },
  },
  openGraph: {
    title: "Delhi Luxury Projects | Nirvana Group",
    description: "Premium residential projects in Delhi NCR — luxury builder floors, kothis, and redevelopment projects in South Delhi.",
    url: "https://www.nauhomes.com/delhi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delhi Luxury Projects | Nirvana Group",
    description: "Premium residential projects across Delhi NCR by Nirvana Group.",
  },
};

export default async function DelhiProjectsPage() {
  const delhiProjects = await filterProjects("all", "delhi");
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Delhi NCR Projects
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Discover our portfolio of luxury residential projects in Delhi NCR. 
            From premium builder floors in South Delhi to luxury kothis and redevelopment projects.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <ProjectsPageClient 
        projects={delhiProjects} 
        locationFilter="delhi"
        title="Delhi Projects"
        showFilters={false}
      />
      
      {/* Delhi Market Info */}
      <section className="py-16 bg-slate-50" aria-labelledby="delhi-market-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="delhi-market-heading" className="sr-only">
            Why Choose Nirvana Group for Delhi NCR Luxury Construction
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Premium Locations</h2>
              <p className="text-slate-600">
                Prime locations in South Delhi, Central Delhi, and Greater Noida with excellent connectivity.
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Luxury Design</h2>
              <p className="text-slate-600">
                Contemporary architecture with premium finishes and modern amenities for discerning clients.
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Quality Construction</h2>
              <p className="text-slate-600">
                Superior construction quality with attention to detail and timely project completion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}