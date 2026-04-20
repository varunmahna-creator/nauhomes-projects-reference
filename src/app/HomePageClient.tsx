"use client";

import React, { useState } from "react";
import HeroSection from "@/components/sections/home/HeroSection";
import StatsBar from "@/components/sections/home/StatsBar";
import AboutPreview from "@/components/sections/home/AboutPreview";
import ServicesGrid from "@/components/sections/home/ServicesGrid";
import FeaturedProjects from "@/components/sections/home/FeaturedProjects";
import ProcessTimeline from "@/components/sections/home/ProcessTimeline";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import Testimonials from "@/components/sections/home/Testimonials";
import BlogPreview from "@/components/sections/home/BlogPreview";
import FAQSection from "@/components/sections/home/FAQSection";
import CTASection from "@/components/sections/home/CTASection";
import MediaCoverage from "@/components/sections/home/MediaCoverage";
import type { Project, Testimonial, MediaItem, SectionVisibility, HomepageImages } from "@/types";

type Vertical = "all" | "delhi" | "bali";

interface HomePageClientProps {
  projects: Project[];
  testimonials: Testimonial[];
  media: MediaItem[];
  sectionVisibility: SectionVisibility;
  homepageImages: HomepageImages;
}

export default function HomePageClient({ projects, testimonials, media, sectionVisibility, homepageImages }: HomePageClientProps) {
  const [vertical, setVertical] = useState<Vertical>("all");

  const filteredProjects = vertical === "all"
    ? projects
    : projects.filter((p) => p.location === vertical);

  const filteredTestimonials = vertical === "all"
    ? testimonials
    : testimonials.filter((t) => {
        const loc = t.location.toLowerCase();
        return vertical === "delhi" ? loc.includes("delhi") : loc.includes("bali");
      });

  return (
    <>
      <HeroSection vertical={vertical} onVerticalChange={setVertical} images={homepageImages} />
      {sectionVisibility.stats && <StatsBar vertical={vertical} />}
      {sectionVisibility.about && <AboutPreview vertical={vertical} images={homepageImages} />}
      {sectionVisibility.services && <ServicesGrid vertical={vertical} />}
      {sectionVisibility.projects && <FeaturedProjects projects={filteredProjects} />}
      {sectionVisibility.process && <ProcessTimeline />}
      {sectionVisibility.whyUs && <WhyChooseUs vertical={vertical} />}
      {sectionVisibility.testimonials && <Testimonials testimonials={filteredTestimonials} />}
      {sectionVisibility.mediaCoverage && media.length > 0 && <MediaCoverage media={media} />}
      {sectionVisibility.blog && <BlogPreview />}
      {sectionVisibility.faq && <FAQSection />}
      {sectionVisibility.cta && <CTASection backgroundImage={homepageImages.ctaBackground} />}
    </>
  );
}
