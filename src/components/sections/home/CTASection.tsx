import React from "react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import ContactForm from "@/components/ui/ContactForm";

export default function CTASection({ backgroundImage }: { backgroundImage?: string }) {
  return (
    <section id="cta" className="relative py-16 px-4 sm:px-6 lg:px-8 md:py-24 overflow-hidden">
      {/* Background image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img src={backgroundImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-navy/85" />
        </div>
      )}
      {!backgroundImage && <div className="absolute inset-0 bg-navy" />}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimateOnScroll direction="left">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">Get Started</span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Ready to Build Your{" "}
              <span className="text-gold">Dream Home?</span>
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              Whether you&apos;re looking to build a new home in Delhi or a tropical villa in Bali,
              our team is ready to bring your vision to life. Get a free consultation today.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-gold" />
                <span className="text-sm text-white/70">Free design consultation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-gold" />
                <span className="text-sm text-white/70">Transparent pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-gold" />
                <span className="text-sm text-white/70">No obligations</span>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right">
            <div className="rounded-2xl bg-white/5 p-6 sm:p-8">
              <ContactForm variant="dark" source="homepage" />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
