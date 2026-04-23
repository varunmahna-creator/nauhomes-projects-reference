export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import ProjectsPageClient from "@/components/sections/projects/ProjectsPageClient";
import { filterProjects } from "@/lib/projects-db";

export const metadata: Metadata = {
  title: "Bali Projects - Sustainable Luxury Villas | Nirvana Homes",
  description: "Explore our sustainable luxury villa projects in Bali, Indonesia. Eco-friendly design with premium amenities in tropical paradise locations.",
  keywords: "Bali luxury villas, sustainable construction Bali, eco-friendly villas Indonesia, luxury real estate Bali",
  openGraph: {
    title: "Bali Luxury Villas | Nirvana Homes",
    description: "Sustainable luxury villa projects in Bali - eco-friendly design with premium amenities in tropical settings.",
    url: "https://nauhomes.com/bali",
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
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Sustainable Design</h3>
              <p className="text-slate-600">
                Eco-friendly architecture using local materials and sustainable building practices.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibent text-slate-800 mb-4">Tropical Luxury</h3>
              <p className="text-slate-600">
                Premium villas designed to embrace Bali's natural beauty with modern luxury amenities.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Prime Locations</h3>
              <p className="text-slate-600">
                Strategic locations in Bali's most desirable areas with ocean views and cultural proximity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}