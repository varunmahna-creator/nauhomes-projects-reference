"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { HomepageImages } from "@/types";

interface HeroSectionProps {
  vertical: "all" | "delhi" | "bali";
  onVerticalChange: (v: "all" | "delhi" | "bali") => void;
  images: HomepageImages;
}

export default function HeroSection({ vertical, onVerticalChange, images }: HeroSectionProps) {
  // Get the appropriate image and alt text based on vertical
  const getImageData = () => {
    switch (vertical) {
      case "delhi":
        return {
          src: images.heroDelhi,
          alt: "Luxury residential construction projects in South Delhi NCR - Premium builder floors and kothis"
        };
      case "bali":
        return {
          src: images.heroBali,
          alt: "Sustainable luxury villas in Bali Indonesia - Premium eco-friendly residential construction"
        };
      default:
        return {
          src: images.heroAll,
          alt: "Nirvana Group luxury construction projects in Delhi and Bali - Premium residential development"
        };
    }
  };

  const imageData = getImageData();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image - optimized with Next.js Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={imageData.src}
          alt={imageData.alt}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover transition-opacity duration-700"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-navy/70" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            {vertical === "delhi" ? "South Delhi & NCR" : vertical === "bali" ? "Bali, Indonesia" : "Delhi & Bali"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {vertical === "delhi" ? (
            <>
              Luxury <span className="text-gold">Residences</span>
              <br />
              <span className="text-white/90">in South Delhi</span>
            </>
          ) : vertical === "bali" ? (
            <>
              Sustainable <span className="text-gold">Luxury Villas</span>
              <br />
              <span className="text-white/90">in Bali</span>
            </>
          ) : (
            <>
              Crafting Luxury{" "}
              <span className="text-gold">Living</span>
              <br />
              <span className="text-white/90">Styled to Perfection</span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl"
        >
          {vertical === "delhi"
            ? "Specialists in luxury apartments, kothis, and builder floors across South Delhi's most elite colonies. From redevelopment to turnkey construction, we deliver premium living spaces with unmatched quality and craftsmanship."
            : vertical === "bali"
            ? "Award-winning eco-friendly villas blending contemporary design with traditional Balinese craftsmanship. Invest in sustainable luxury properties with exceptional rental returns in Bali's most sought-after locations."
            : "Over 20 years of excellence in crafting bespoke luxury residences across Delhi NCR and Bali, Indonesia. From premium builder floors to sustainable villas, we deliver exceptional living spaces that exceed expectations."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-base font-semibold text-navy transition-all hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/20 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
            aria-label="View our luxury construction projects in Delhi and Bali"
          >
            View Our Projects
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition-all hover:border-gold hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
            aria-label="Schedule a consultation for your luxury construction project"
          >
            Schedule Consultation
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Select location to explore"
        >
          <span className="mr-2 text-sm text-white/40">Explore:</span>
          {([
            { value: "all" as const, label: "All Locations", ariaLabel: "View all projects in Delhi and Bali" },
            { value: "delhi" as const, label: "Delhi NCR", ariaLabel: "View Delhi NCR luxury construction projects" },
            { value: "bali" as const, label: "Bali, Indonesia", ariaLabel: "View Bali luxury villa projects" },
          ]).map((option) => (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={vertical === option.value}
              aria-label={option.ariaLabel}
              onClick={() => onVerticalChange(option.value)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy",
                vertical === option.value
                  ? "bg-gold text-navy shadow-lg shadow-gold/20"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              )}
            >
              {option.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-white/40" />
        </motion.div>
      </motion.div>

      {/* Hidden schema markup for hero content */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPageElement",
            "name": "Hero Section",
            "description": vertical === "delhi" 
              ? "Luxury residential construction in South Delhi NCR" 
              : vertical === "bali" 
              ? "Sustainable luxury villas in Bali Indonesia"
              : "Luxury construction projects in Delhi and Bali",
            "mainEntity": {
              "@type": "Organization",
              "name": "Nirvana Group",
              "serviceArea": vertical === "delhi" 
                ? ["Delhi", "NCR", "Gurgaon", "Noida"]
                : vertical === "bali"
                ? ["Bali", "Indonesia"]
                : ["Delhi", "NCR", "Bali", "Indonesia"]
            }
          })
        }}
      />
    </section>
  );
}