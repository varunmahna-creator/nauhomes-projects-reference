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
  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  const url = `https://www.nauhomes.com/projects/${project.slug}`;
  // Use a meaningful description fallback if the project record doesn't have one.
  const description =
    project.description?.trim() ||
    `${project.title} — a luxury ${project.type || 'residential'} project by Nirvana Group${
      project.locationLabel ? ` in ${project.locationLabel}` : ''
    }.`;
  const image = project.thumbnail || 'https://www.nauhomes.com/og-image.jpg';

  return {
    title: project.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} | Nirvana Group`,
      description,
      url,
      type: 'article',
      images: [{ url: image, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Nirvana Group`,
      description,
      images: [image],
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