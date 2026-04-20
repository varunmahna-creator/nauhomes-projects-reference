import React from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { MediaItem } from "@/types";

interface MediaCoverageProps {
  media: MediaItem[];
}

export default function MediaCoverage({ media }: MediaCoverageProps) {
  if (media.length === 0) return null;

  return (
    <SectionWrapper id="media" className="bg-white">
      <AnimateOnScroll>
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold">As Seen In</span>
          <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
            Media Coverage
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
        </div>
      </AnimateOnScroll>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {media.map((item) => (
          <AnimateOnScroll key={item.id}>
            <a
              href={item.articleUrl || "#"}
              target={item.articleUrl ? "_blank" : undefined}
              rel={item.articleUrl ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-cream p-4 transition-all hover:border-gold/30 hover:shadow-md"
            >
              <div className="flex h-16 w-full items-center justify-center">
                {item.logoUrl ? (
                  <img
                    src={item.logoUrl}
                    alt={item.name}
                    className="max-h-12 max-w-full object-contain grayscale transition-all group-hover:grayscale-0"
                  />
                ) : (
                  <span className="text-sm font-bold text-muted">{item.name}</span>
                )}
              </div>
              <span className="text-xs font-medium text-muted group-hover:text-gold-dark transition-colors">{item.name}</span>
            </a>
          </AnimateOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
