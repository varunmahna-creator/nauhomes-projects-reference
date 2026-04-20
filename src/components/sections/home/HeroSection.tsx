"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HomepageImages } from "@/types";

interface HeroSectionProps {
  vertical: "all" | "delhi" | "bali";
  onVerticalChange: (v: "all" | "delhi" | "bali") => void;
  images: HomepageImages;
}

export default function HeroSection({ vertical, onVerticalChange, images }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={vertical === "delhi" ? images.heroDelhi : vertical === "bali" ? images.heroBali : images.heroAll}
          alt=""
          className="h-full w-full object-cover transition-opacity duration-700"
          key={vertical}
        />
        <div className="absolute inset-0 bg-navy/70" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

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
          className="mx-auto mt-6 max-w-2xl text-lg text-white/60 sm:text-xl"
        >
          {vertical === "delhi"
            ? "Specialists in luxury apartments, kothis, and builder floors across South Delhi\u2019s most elite colonies. From redevelopment to turnkey construction, we deliver premium living spaces."
            : vertical === "bali"
            ? "Award-winning eco-friendly villas blending contemporary design with Balinese craftsmanship. Invest in sustainable luxury with strong rental returns in Bali\u2019s most sought-after locations."
            : "Over 20 years of excellence in crafting bespoke residences and luxury villas across Delhi NCR and Bali, Indonesia."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-base font-semibold text-navy transition-all hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/20"
          >
            View Our Projects
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition-all hover:border-gold hover:text-gold"
          >
            Schedule Consultation
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex items-center justify-center gap-2"
        >
          <span className="mr-2 text-sm text-white/40">Explore:</span>
          {([
            { value: "all" as const, label: "All" },
            { value: "delhi" as const, label: "Delhi NCR" },
            { value: "bali" as const, label: "Bali, Indonesia" },
          ]).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onVerticalChange(option.value)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer",
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
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
