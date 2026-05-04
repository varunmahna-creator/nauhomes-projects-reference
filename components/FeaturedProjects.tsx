"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProjectImage from "@/components/ui/ProjectImage";
import { MapPin, ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import FilterTabs from "@/components/ui/FilterTabs";
import Badge from "@/components/ui/Badge";
import type { Project, ProjectStatus } from "@/types";

const STATUS_TABS = ["All", "Completed", "Ongoing"];

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeTab === "All") return projects.slice(0, 6);
    const status = activeTab.toLowerCase() as ProjectStatus;
    return projects.filter((p) => p.status === status).slice(0, 6);
  }, [activeTab, projects]);

  return (
    <SectionWrapper id="projects" className="bg-white">
      <AnimateOnScroll>
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold">Our Portfolio</span>
          <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
            Featured Projects
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
        </div>
      </AnimateOnScroll>

      <FilterTabs tabs={STATUS_TABS} activeTab={activeTab} onTabChange={setActiveTab} className="mb-10" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
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

                  {/* Status badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant={project.status === "completed" ? "gold" : "navy"}>
                      {project.status === "completed" ? "Completed" : "Ongoing"}
                    </Badge>
                  </div>

                  {/* Bottom overlay */}
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

      <div className="mt-12 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-lg bg-navy px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-light"
        >
          View All Projects <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
