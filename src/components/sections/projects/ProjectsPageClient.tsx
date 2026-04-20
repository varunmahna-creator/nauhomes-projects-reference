"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import ProjectImage from "@/components/ui/ProjectImage";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FilterTabs from "@/components/ui/FilterTabs";
import Badge from "@/components/ui/Badge";
import type { Project, ProjectStatus, ProjectLocation } from "@/types";

const STATUS_TABS = ["All", "Completed", "Ongoing"];
const LOCATION_TABS = ["All", "Delhi", "Bali"];

interface ProjectsPageClientProps {
  projects: Project[];
}

export default function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchStatus = statusFilter === "All" || p.status === statusFilter.toLowerCase();
      const matchLocation = locationFilter === "All" || p.location === locationFilter.toLowerCase();
      return matchStatus && matchLocation;
    });
  }, [statusFilter, locationFilter, projects]);

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-light pt-32 pb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
            Our <span className="text-gold">Projects</span>
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Explore our portfolio of luxury residences across Delhi NCR and Bali
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <SectionWrapper className="bg-white">
        <div className="space-y-4 mb-10">
          <FilterTabs tabs={STATUS_TABS} activeTab={statusFilter} onTabChange={setStatusFilter} />
          <FilterTabs tabs={LOCATION_TABS} activeTab={locationFilter} onTabChange={setLocationFilter} />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-lg">No projects found for the selected filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/projects/${project.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy">
                      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                        <ProjectImage src={project.thumbnail} alt={project.title} />
                      </div>
                      <div className="absolute top-4 right-4 z-10">
                        <Badge variant={project.status === "completed" ? "gold" : "navy"}>
                          {project.status === "completed" ? "Completed" : "Ongoing"}
                        </Badge>
                      </div>
                      <div className="absolute top-4 left-4 z-10">
                        <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                          {project.location === "delhi" ? "Delhi" : "Bali"}
                        </Badge>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                        <div className="flex items-center gap-1.5 text-xs text-white/70">
                          <MapPin className="h-3.5 w-3.5" />
                          {project.locationLabel}
                        </div>
                        <h3 className="mt-1 text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                          {project.title}
                        </h3>
                        <p className="text-sm text-white/60">{project.type} &bull; {project.area}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </SectionWrapper>
    </>
  );
}
