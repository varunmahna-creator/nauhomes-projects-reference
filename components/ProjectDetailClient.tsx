"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Calendar, Maximize, ChevronRight, Image as ImageIcon, View, Layout, Info, ArrowRight, Clock } from "lucide-react";
import ProjectImage from "@/components/ui/ProjectImage";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import TabInterface from "@/components/ui/TabInterface";
import Lightbox from "@/components/ui/Lightbox";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import ContactForm from "@/components/ui/ContactForm";
import type { Project, TimelineEntry } from "@/types";

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
}

const PROJECT_TABS = [
  { id: "gallery", label: "Gallery", icon: <ImageIcon className="h-4 w-4" /> },
  { id: "virtual-tour", label: "Virtual Tour", icon: <View className="h-4 w-4" /> },
  { id: "floor-plans", label: "Floor Plans", icon: <Layout className="h-4 w-4" /> },
  { id: "timeline", label: "Timeline", icon: <Clock className="h-4 w-4" /> },
  { id: "details", label: "Details", icon: <Info className="h-4 w-4" /> },
];

export default function ProjectDetailClient({ project, relatedProjects }: ProjectDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState(project.gallery);

  function openLightbox(images: typeof project.gallery, index: number) {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 bg-gradient-to-br from-navy-dark via-navy to-navy-light">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/projects" className="hover:text-gold transition-colors">Projects</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gold">{project.title}</span>
          </nav>

          <div className="flex flex-wrap items-start gap-3 mb-4">
            <Badge variant={project.status === "completed" ? "gold" : "navy"}>
              {project.status === "completed" ? "Completed" : "Ongoing"}
            </Badge>
            <Badge variant="outline" className="text-white/70 border-white/20">{project.type}</Badge>
          </div>

          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-gold">{project.subtitle}</p>

          {/* Info bar */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" />
              {project.locationLabel}
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="h-4 w-4 text-gold" />
              {project.area}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gold" />
              {project.year}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <SectionWrapper className="bg-white">
        <TabInterface tabs={PROJECT_TABS} defaultTab="gallery">
          {(activeTab) => (
            <>
              {/* Gallery Tab */}
              {activeTab === "gallery" && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {project.gallery.map((img, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => openLightbox(project.gallery, index)}
                      className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-navy/5 cursor-pointer"
                    >
                      <ProjectImage src={img.src} alt={img.alt} />
                      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <Maximize className="h-6 w-6 text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Virtual Tour Tab */}
              {activeTab === "virtual-tour" && (() => {
                const tourVideos = project.virtualTourVideos ?? [];
                const hasEmbed = Boolean(project.tourEmbedUrl);
                const hasVideos = tourVideos.length > 0;
                if (!hasEmbed && !hasVideos) {
                  return (
                    <div className="flex flex-col items-center justify-center rounded-xl bg-cream border-2 border-dashed border-gray-200 py-20">
                      <View className="h-16 w-16 text-muted/30 mb-4" />
                      <h3 className="text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>Virtual Tour Coming Soon</h3>
                      <p className="mt-2 text-sm text-muted">The virtual tour for this project is being prepared.</p>
                    </div>
                  );
                }
                return (
                  <div className="space-y-6">
                    {hasEmbed && (
                      <div className="aspect-video w-full overflow-hidden rounded-xl bg-navy">
                        <iframe
                          src={project.tourEmbedUrl ?? undefined}
                          className="h-full w-full"
                          allow="xr-spatial-tracking; gyroscope; accelerometer"
                          allowFullScreen
                          loading="lazy"
                          title={`Virtual Tour of ${project.title}`}
                        />
                      </div>
                    )}
                    {hasVideos && (
                      <div>
                        {hasEmbed && (
                          <h3 className="mb-3 text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>Walkthrough Videos</h3>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                          {tourVideos.map((vid, i) => (
                            <div key={i} className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                              <video
                                src={vid.src}
                                className="h-full w-full"
                                controls
                                preload="metadata"
                                playsInline
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Floor Plans Tab */}
              {activeTab === "floor-plans" && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {project.floorPlans.length > 0 ? (
                    project.floorPlans.map((fp, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => openLightbox(project.floorPlans, index)}
                        className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-cream border border-gray-200 cursor-pointer"
                      >
                        <ProjectImage src={fp.src} alt={fp.alt} fallbackClassName="from-cream to-card" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-navy/10">
                          <Maximize className="h-6 w-6 text-navy" />
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <Badge variant="outline">{fp.alt}</Badge>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center rounded-xl bg-cream border-2 border-dashed border-gray-200 py-20">
                      <Layout className="h-16 w-16 text-muted/30 mb-4" />
                      <h3 className="text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>Floor Plans Coming Soon</h3>
                    </div>
                  )}
                </div>
              )}

              {/* Timeline Tab */}
              {activeTab === "timeline" && (
                <div>
                  {project.timeline && project.timeline.length > 0 ? (
                    <div className="relative pl-8">
                      {/* Vertical line */}
                      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gold/20" />

                      <div className="space-y-10">
                        {project.timeline.map((entry, index) => (
                          <div key={index} className="relative">
                            {/* Dot on the line */}
                            <div className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center">
                              <div className="h-3 w-3 rounded-full bg-gold ring-4 ring-gold/10" />
                            </div>

                            {/* Two-column: text left, photos right */}
                            <div className="grid gap-6 lg:grid-cols-5">
                              {/* Left: text content */}
                              <div className="lg:col-span-2">
                                <span className="inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-dark mb-2">
                                  {entry.date}
                                </span>
                                <h4 className="text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>
                                  {entry.title}
                                </h4>
                                {entry.description && (
                                  <p className="mt-2 text-sm text-muted leading-relaxed">{entry.description}</p>
                                )}
                              </div>

                              {/* Right: photos and videos grid */}
                              <div className="lg:col-span-3">
                                <div className="space-y-4">
                                  {/* Photos section */}
                                  {entry.images && entry.images.length > 0 && (
                                    <div>
                                      <h5 className="text-sm font-semibold text-navy mb-2">Photos</h5>
                                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {entry.images.map((img, imgIndex) => (
                                          <button
                                            key={imgIndex}
                                            type="button"
                                            onClick={() => openLightbox(entry.images, imgIndex)}
                                            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-navy/5 cursor-pointer"
                                          >
                                            <ProjectImage src={img.src} alt={img.alt} />
                                            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                                              <Maximize className="h-5 w-5 text-white" />
                                            </div>
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Videos section */}
                                  {entry.videos && entry.videos.length > 0 && (
                                    <div>
                                      <h5 className="text-sm font-semibold text-navy mb-2">Progress Videos</h5>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {entry.videos.map((vid, vidIndex) => (
                                          <div
                                            key={vidIndex}
                                            className="relative aspect-video overflow-hidden rounded-lg bg-navy/5 border border-gray-200"
                                          >
                                            <video 
                                              src={vid.src} 
                                              className="h-full w-full object-cover" 
                                              controls
                                              preload="metadata"
                                              poster=""
                                            >
                                              Your browser does not support the video tag.
                                            </video>
                                            <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-white">
                                              {vid.alt}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Empty state */}
                                  {(!entry.images || entry.images.length === 0) && (!entry.videos || entry.videos.length === 0) && (
                                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-cream/50 py-8">
                                      <p className="text-xs text-muted">No media yet</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Divider between entries */}
                            {index < (project.timeline?.length || 0) - 1 && (
                              <div className="mt-8 border-b border-gray-100" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-xl bg-cream border-2 border-dashed border-gray-200 py-20">
                      <Clock className="h-16 w-16 text-muted/30 mb-4" />
                      <h3 className="text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>Timeline Coming Soon</h3>
                      <p className="mt-2 text-sm text-muted">Construction progress updates will appear here.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Details Tab */}
              {activeTab === "details" && (
                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>About This Project</h3>
                      <p className="text-muted leading-relaxed">{project.description}</p>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h3 className="text-xl font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>Highlights</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {project.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-3 rounded-lg bg-cream p-3">
                            <div className="h-2 w-2 rounded-full bg-gold shrink-0" />
                            <span className="text-sm text-navy">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <h3 className="text-xl font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>Amenities</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {project.amenities.map((a) => (
                          <div key={a} className="flex items-center gap-3 rounded-lg bg-cream p-3">
                            <div className="h-2 w-2 rounded-full bg-gold shrink-0" />
                            <span className="text-sm text-navy">{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Specs sidebar */}
                  <div>
                    <div className="rounded-xl bg-navy p-6 sticky top-24">
                      <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>Specifications</h3>
                      <div className="space-y-3">
                        {Object.entries(project.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between border-b border-white/10 pb-3">
                            <span className="text-sm text-white/50">{key}</span>
                            <span className="text-sm font-semibold text-gold">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </TabInterface>
      </SectionWrapper>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <SectionWrapper>
          <h2 className="text-2xl font-bold text-navy mb-8" style={{ fontFamily: "var(--font-heading)" }}>
            Related Projects
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((rp) => (
              <AnimateOnScroll key={rp.slug}>
                <Link href={`/projects/${rp.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                      <ProjectImage src={rp.thumbnail} alt={rp.title} />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <div className="flex items-center gap-1.5 text-xs text-white/70">
                        <MapPin className="h-3.5 w-3.5" /> {rp.locationLabel}
                      </div>
                      <h3 className="mt-1 text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{rp.title}</h3>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Contact CTA */}
      <SectionWrapper dark>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Interested in This <span className="text-gold">Project?</span>
            </h2>
            <p className="mt-4 text-white/60">Get in touch with our team for more details, site visits, or to discuss a similar project.</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-6 sm:p-8">
            <ContactForm variant="dark" compact source={`project:${project.slug}`} />
          </div>
        </div>
      </SectionWrapper>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)}
      />
    </>
  );
}
