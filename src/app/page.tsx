export const dynamic = "force-dynamic";

import HomePageClient from "./HomePageClient";
import { getProjects } from "@/lib/projects";
import { getTestimonials } from "@/lib/testimonials";
import { getMedia } from "@/lib/media";
import { getSettings } from "@/lib/settings";

export default function HomePage() {
  const projects = getProjects();
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
