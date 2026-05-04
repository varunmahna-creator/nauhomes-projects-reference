"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import VideoModal from "@/components/ui/VideoModal";
import type { Testimonial } from "@/types";
import { Star, ChevronLeft, ChevronRight, Quote, Play } from "lucide-react";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSlides = testimonials.length;

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLDivElement>("[data-card]");
    if (cards[index]) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = cards[index].getBoundingClientRect();
      const scrollLeft = container.scrollLeft + cardRect.left - containerRect.left - (containerRect.width - cardRect.width) / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, []);

  const goTo = useCallback((index: number) => {
    const newIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  }, [totalSlides, scrollToIndex]);

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useEffect(() => {
    autoPlayRef.current = setInterval(goNext, 5000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [goNext]);

  function pauseAutoPlay() { if (autoPlayRef.current) clearInterval(autoPlayRef.current); }
  function resumeAutoPlay() { autoPlayRef.current = setInterval(goNext, 5000); }

  return (
    <SectionWrapper id="testimonials">
      <div className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-gold">Client Stories</span>
        <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>What Our Clients Say</h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
      </div>

      <div className="relative" onMouseEnter={pauseAutoPlay} onMouseLeave={resumeAutoPlay}>
        <div ref={scrollRef} className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4">
          {testimonials.map((t, index) => (
            <div key={index} data-card className="w-full shrink-0 snap-center sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <div className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                <Quote className="mb-3 h-8 w-8 text-gold/30" />
                {t.videoUrl && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setVideoUrl(t.videoUrl!); }}
                    className="mb-3 flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold-dark hover:bg-gold/20 transition-colors cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5 fill-gold-dark" />
                    Watch Video
                  </button>
                )}
                <p className="mb-5 flex-1 text-sm italic leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("h-4 w-4", i < t.rating ? "fill-gold text-gold" : "fill-gray-200 text-gray-200")} />
                  ))}
                </div>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="h-11 w-11 shrink-0 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-sm font-bold text-white">
                      {getInitials(t.name)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-navy">{t.name}</p>
                    <p className="text-xs text-muted">{t.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="button" onClick={goPrev} className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2.5 shadow-md transition-colors hover:bg-gray-50 sm:block cursor-pointer" aria-label="Previous">
          <ChevronLeft className="h-5 w-5 text-navy" />
        </button>
        <button type="button" onClick={goNext} className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2.5 shadow-md transition-colors hover:bg-gray-50 sm:block cursor-pointer" aria-label="Next">
          <ChevronRight className="h-5 w-5 text-navy" />
        </button>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button key={index} type="button" onClick={() => goTo(index)} className={cn("h-2.5 rounded-full transition-all cursor-pointer", currentIndex === index ? "w-8 bg-gold" : "w-2.5 bg-gray-300 hover:bg-gray-400")} aria-label={`Go to ${index + 1}`} />
          ))}
        </div>
      </div>

      <VideoModal
        videoUrl={videoUrl || ""}
        isOpen={!!videoUrl}
        onClose={() => setVideoUrl(null)}
      />
    </SectionWrapper>
  );
}
