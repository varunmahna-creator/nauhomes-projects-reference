import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { HomepageImages } from "@/types";

interface AboutPreviewProps {
  vertical?: "all" | "delhi" | "bali";
  images?: HomepageImages;
}

const CONTENT = {
  all: {
    heading: <>Building Dreams Across <span className="text-gold">Two Nations</span></>,
    p1: "Nirvana Group is a premium construction and development company with over two decades of experience in crafting luxury residences. Based in New Delhi with operations in Bali, we specialize in creating living spaces that embody quality, style, and comfort.",
    p2: "Every home we build is unique \u2014 designed around the owner\u2019s lifestyle, delivered with uncompromising attention to detail, and backed by our commitment to timely completion.",
  },
  delhi: {
    heading: <>South Delhi&apos;s Most Trusted <span className="text-gold">Luxury Builder</span></>,
    p1: "Since 1996, Nirvana Group has been crafting luxury apartments, kothis, and builder floors in South Delhi\u2019s most prestigious colonies. With a strong infrastructure, experienced professional team, and a widely distributed broker network, we are one of the most trusted residential real estate teams in the NCR.",
    p2: "We specialize in redevelopment of existing properties, collaboration with plot owners for joint ventures, and outright construction of premium residences. Our portfolio spans Greater Kailash, Defence Colony, Vasant Vihar, Saket, and other elite neighborhoods.",
  },
  bali: {
    heading: <>Sustainable Luxury <span className="text-gold">Living in Bali</span></>,
    p1: "Nirvana Group brings contemporary luxury to Bali\u2019s most sought-after destinations. Our eco-friendly villas blend sustainable design with modern comfort, offering an unmatched living and investment experience in Seminyak, Canggu, Ubud, and Uluwatu.",
    p2: "With transparent pricing, strong return potential of 12-15% ROI, and a clear development timeline, our Bali properties are designed for both lifestyle buyers and savvy investors. We handle everything from design and construction to rental management.",
  },
};

export default function AboutPreview({ vertical = "all", images }: AboutPreviewProps) {
  const c = CONTENT[vertical];

  return (
    <SectionWrapper id="about">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <AnimateOnScroll direction="left">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold">Who We Are</span>
          <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
            {c.heading}
          </h2>
          <p className="mt-6 text-muted leading-relaxed">{c.p1}</p>
          <p className="mt-4 text-muted leading-relaxed">{c.p2}</p>
          <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark transition-colors">
            Learn More About Us <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimateOnScroll>

        <AnimateOnScroll direction="right">
          <div className="grid grid-cols-2 gap-4">
            {vertical !== "bali" && (
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                <img src={images?.aboutDelhi || ""} alt="Delhi Luxury" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <MapPin className="h-6 w-6 text-gold mb-2" />
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>New Delhi</h3>
                  <p className="text-xs text-white/60 mt-1">{vertical === "delhi" ? "Luxury Kothis & Builder Floors" : "South Delhi Luxury Residences"}</p>
                </div>
              </div>
            )}
            {vertical !== "delhi" && (
              <div className={`aspect-[3/4] rounded-2xl overflow-hidden relative ${vertical === "all" ? "mt-8" : ""}`}>
                <img src={images?.aboutBali || ""} alt="Bali Luxury" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <MapPin className="h-6 w-6 text-gold mb-2" />
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Bali</h3>
                  <p className="text-xs text-white/60 mt-1">{vertical === "bali" ? "Eco-Friendly Luxury Villas" : "Tropical Villa Collection"}</p>
                </div>
              </div>
            )}
            {vertical === "delhi" && (
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-gold/20 to-cream p-6 flex flex-col justify-end border border-gold/20 mt-8">
                <h3 className="text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>15+</h3>
                <p className="text-xs text-navy/60 mt-1">Premium Colonies Covered</p>
              </div>
            )}
            {vertical === "bali" && (
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-navy/10 to-cream p-6 flex flex-col justify-end border border-navy/10">
                <h3 className="text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>12-15%</h3>
                <p className="text-xs text-navy/60 mt-1">Estimated Annual ROI</p>
              </div>
            )}
          </div>
        </AnimateOnScroll>
      </div>
    </SectionWrapper>
  );
}
