export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug, getRelatedProjects } from "@/lib/projects-db";
import ProjectDetailClient from "@/components/sections/project-detail/ProjectDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Nirvana Group`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const relatedProjects = await getRelatedProjects(slug, 3);

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} />;
}