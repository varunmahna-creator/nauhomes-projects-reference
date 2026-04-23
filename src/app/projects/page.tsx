export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import ProjectsPageClient from "@/components/sections/projects/ProjectsPageClient";
import { getProjects } from "@/lib/projects-db";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore our portfolio of luxury residential projects across Delhi NCR and Bali, Indonesia.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsPageClient projects={projects} showFilters={true} />;
}