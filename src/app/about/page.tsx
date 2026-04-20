import type { Metadata } from "next";
import { Award, Users, Globe, Shield } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Counter from "@/components/ui/Counter";
import { STATS, CONTACT_INFO } from "@/lib/constants";
import { getMedia } from "@/lib/media";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Nirvana Group - over 20 years of excellence in luxury construction across Delhi and Bali.",
};

const VALUES = [
  { icon: <Award className="h-7 w-7" />, title: "Excellence", description: "We pursue perfection in every detail, from materials to craftsmanship." },
  { icon: <Shield className="h-7 w-7" />, title: "Integrity", description: "Transparent pricing, honest timelines, and genuine relationships with clients." },
  { icon: <Users className="h-7 w-7" />, title: "Client-Centric", description: "Your vision drives our design. Every home is as unique as its owner." },
  { icon: <Globe className="h-7 w-7" />, title: "Innovation", description: "Blending traditional craftsmanship with modern technology and sustainable practices." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-light pt-32 pb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
            About <span className="text-gold">Nirvana Group</span>
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Two decades of turning architectural dreams into luxurious reality
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gold py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 sm:justify-around sm:px-6 lg:px-8">
          {STATS.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <span className="text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-1 text-sm font-medium text-navy/70">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <SectionWrapper>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimateOnScroll direction="left">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">Our Story</span>
            <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              A Legacy of <span className="text-gold">Luxury</span> Construction
            </h2>
            <p className="mt-6 text-muted leading-relaxed">
              Founded over two decades ago in the heart of New Delhi, Nirvana Group began with a simple
              vision: to create living spaces that are as unique as the families who call them home. What
              started as a boutique construction firm in South Delhi has grown into a trusted name in luxury
              residential development across two countries.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              Our expansion to Bali, Indonesia was a natural evolution — bringing our commitment to quality
              and design excellence to one of the world&apos;s most beautiful destinations. Today, our portfolio
              spans contemporary urban villas in Delhi&apos;s most prestigious neighborhoods to tropical pool
              villas overlooking Bali&apos;s stunning landscapes.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              Every Nirvana home is a testament to our belief that luxury is not just about materials and
              finishes — it&apos;s about creating spaces that enhance the way you live.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll direction="right">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                <span className="text-6xl font-bold text-gold/20" style={{ fontFamily: "var(--font-heading)" }}>20+</span>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mt-8">
                <span className="text-5xl font-bold text-navy/20" style={{ fontFamily: "var(--font-heading)" }}>100+</span>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center -mt-4">
                <span className="text-4xl font-bold text-navy/20" style={{ fontFamily: "var(--font-heading)" }}>3L+</span>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-navy-light to-navy flex items-center justify-center mt-4">
                <span className="text-5xl font-bold text-gold/20" style={{ fontFamily: "var(--font-heading)" }}>2</span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper className="bg-white">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold">Our Values</span>
          <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>What Drives Us</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <AnimateOnScroll key={v.title} delay={i * 0.1}>
              <div className="rounded-xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-gold/30 hover:shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>{v.title}</h3>
                <p className="mt-2 text-sm text-muted">{v.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </SectionWrapper>

      {/* Media Coverage */}
      {(() => {
        const media = getMedia();
        if (media.length === 0) return null;
        return (
          <SectionWrapper className="bg-white">
            <div className="mb-12 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-gold">In The Press</span>
              <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Media Coverage</h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
            </div>
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
                        <img src={item.logoUrl} alt={item.name} className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all" />
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
      })()}

      {/* Offices */}
      <SectionWrapper dark>
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold">Our Offices</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Where to Find Us</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {CONTACT_INFO.offices.map((office) => (
            <AnimateOnScroll key={office.city}>
              <div className="rounded-xl bg-white/5 p-8 border border-white/10">
                <h3 className="text-xl font-bold text-gold" style={{ fontFamily: "var(--font-heading)" }}>{office.city}</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{office.address}</p>
                <div className="mt-6 aspect-video rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-xs text-white/30">Map Embed Placeholder</span>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
