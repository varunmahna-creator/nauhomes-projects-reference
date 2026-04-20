import React from "react";
import { Lightbulb, FileCheck, Palette, HardHat, Sofa, Home } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { PROCESS_STEPS } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb className="h-6 w-6" />,
  FileCheck: <FileCheck className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  HardHat: <HardHat className="h-6 w-6" />,
  Sofa: <Sofa className="h-6 w-6" />,
  Home: <Home className="h-6 w-6" />,
};

export default function ProcessTimeline() {
  return (
    <SectionWrapper id="process" dark>
      <div className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-gold">Our Approach</span>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
          How We Build Your Dream Home
        </h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
      </div>

      {/* Desktop: 3x2 grid */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-3">
        {PROCESS_STEPS.map((step, index) => (
          <AnimateOnScroll key={step.title} delay={index * 0.1}>
            <div className="relative rounded-xl bg-white/5 p-6 text-center transition-colors hover:bg-white/10">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-gold">
                <span className="text-lg font-bold">{step.step}</span>
              </div>
              <div className="mb-3 flex justify-center text-gold">
                {iconMap[step.icon]}
              </div>
              <h3 className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{step.title}</h3>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">{step.description}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>

      {/* Mobile: vertical timeline */}
      <div className="space-y-6 lg:hidden">
        {PROCESS_STEPS.map((step, index) => (
          <AnimateOnScroll key={step.title} delay={index * 0.08}>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy text-sm font-bold">
                  {step.step}
                </div>
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="mt-2 h-full w-px bg-gold/20" />
                )}
              </div>
              <div className="pb-6">
                <h3 className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{step.title}</h3>
                <p className="mt-1 text-sm text-white/50">{step.description}</p>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
