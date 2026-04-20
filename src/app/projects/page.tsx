export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import ProjectsPageClient from "@/components/sections/projects/ProjectsPageClient";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore our portfolio of luxury residential projects across Delhi NCR and Bali, Indonesia.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  return <ProjectsPageClient projects={projects} />;
}
