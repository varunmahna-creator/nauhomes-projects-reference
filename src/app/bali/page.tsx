export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import ProjectsPageClient from "@/components/sections/projects/ProjectsPageClient";
import { filterProjects } from "@/lib/projects-db";

export const metadata: Metadata = {
  title: "Bali Projects — Sustainable Luxury Villas",
  description: "Sustainable luxury villas in Bali, Indonesia by Nirvana Group. Eco-friendly design, tropical architecture, and premium amenities in Berawa, Canggu, and beyond.",
  keywords: "Bali luxury villas, sustainable construction Bali, eco-friendly villas Indonesia, luxury real estate Bali, Berawa villas, Canggu villas, Nirvana Villas Bali",
  alternates: {
    canonical: "https://www.nauhomes.com/bali",
    languages: {
      "en-IN": "https://www.nauhomes.com/delhi",
      "en-ID": "https://www.nauhomes.com/bali",
    },
  },
  openGraph: {
    title: "Bali Luxury Villas | Nirvana Group",
    description: "Sustainable luxury villa projects in Bali — eco-friendly design with premium amenities in tropical settings.",
    url: "https://www.nauhomes.com/bali",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bali Luxury Villas | Nirvana Group",
    description: "Sustainable luxury villas in Bali by Nirvana Group.",
  },
};

export default async function BaliProjectsPage() {
  const baliProjects = await filterProjects("all", "bali");
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-900 to-teal-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bali Villa Projects
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Experience our sustainable luxury villa projects in the tropical paradise of Bali, Indonesia. 
            Eco-friendly design meets premium amenities in stunning natural settings.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <ProjectsPageClient 
        projects={baliProjects} 
        locationFilter="bali"
        title="Bali Projects"
        showFilters={false}
      />
      
      {/* Bali Market Info */}
      <section className="py-16 bg-slate-50" aria-labelledby="bali-market-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="bali-market-heading" className="sr-only">
            Why Choose Nirvana Group for Bali Luxury Villas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Sustainable Design</h2>
              <p className="text-slate-600">
                Eco-friendly architecture using local materials and sustainable building practices.
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Tropical Luxury</h2>
              <p className="text-slate-600">
                Premium villas designed to embrace Bali&apos;s natural beauty with modern luxury amenities.
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Prime Locations</h2>
              <p className="text-slate-600">
                Strategic locations in Bali&apos;s most desirable areas with ocean views and cultural proximity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}