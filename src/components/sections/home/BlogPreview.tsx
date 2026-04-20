import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Badge from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/lib/constants";

export default function BlogPreview() {
  return (
    <SectionWrapper id="blog" className="bg-white">
      <div className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-gold">Insights</span>
        <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>Latest from Our Blog</h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post, index) => (
          <AnimateOnScroll key={post.slug} delay={index * 0.1}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="overflow-hidden rounded-xl bg-cream border border-gray-100 transition-shadow hover:shadow-md">
                <div className="aspect-[16/10] bg-gradient-to-br from-navy/10 to-gold/10" />
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-navy group-hover:text-gold-dark transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark transition-colors">
          Read More Articles <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
