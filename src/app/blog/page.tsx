import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Badge from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, guides, and news about luxury construction, real estate investment, and design trends.",
  alternates: { canonical: "https://www.nauhomes.com/blog" },
  openGraph: {
    title: "Blog | Nirvana Group — Luxury Construction Insights",
    description: "Expert guides on luxury construction, real-estate investment in Delhi NCR & Bali, and design trends.",
    url: "https://www.nauhomes.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-light pt-32 pb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
            Our <span className="text-gold">Blog</span>
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Insights and guides on luxury construction, design, and real estate investment
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <SectionWrapper className="bg-white">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, index) => (
            <AnimateOnScroll key={post.slug} delay={index * 0.1}>
              <article className="group overflow-hidden rounded-xl bg-cream border border-gray-100 transition-shadow hover:shadow-md">
                <div className="aspect-[16/10] bg-gradient-to-br from-navy/10 to-gold/10" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-navy group-hover:text-gold-dark transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted line-clamp-3">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Coming soon note */}
        <div className="mt-16 text-center rounded-xl bg-cream border-2 border-dashed border-gray-200 py-12">
          <h3 className="text-xl font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>More Articles Coming Soon</h3>
          <p className="mt-2 text-sm text-muted">We&apos;re working on more insightful content. Stay tuned!</p>
        </div>
      </SectionWrapper>
    </>
  );
}
