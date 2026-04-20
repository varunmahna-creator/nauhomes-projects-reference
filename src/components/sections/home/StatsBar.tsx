"use client";

import React from "react";
import Counter from "@/components/ui/Counter";

const STATS_ALL = [
  { value: 20, suffix: "+", label: "Years of Excellence" },
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: " Lac+ Sq Ft", label: "Construction Experience" },
  { value: 2, suffix: "", label: "Countries" },
];

const STATS_DELHI = [
  { value: 20, suffix: "+", label: "Years in South Delhi" },
  { value: 75, suffix: "+", label: "Residences Built" },
  { value: 2, suffix: " Lac+ Sq Ft", label: "Built-up Area" },
  { value: 15, suffix: "+", label: "Premium Colonies" },
];

const STATS_BALI = [
  { value: 8, suffix: "+", label: "Years in Bali" },
  { value: 25, suffix: "+", label: "Villas Delivered" },
  { value: 15, suffix: "%", label: "Avg. ROI" },
  { value: 5, suffix: "+", label: "Prime Locations" },
];

interface StatsBarProps {
  vertical?: "all" | "delhi" | "bali";
}

export default function StatsBar({ vertical = "all" }: StatsBarProps) {
  const stats = vertical === "delhi" ? STATS_DELHI : vertical === "bali" ? STATS_BALI : STATS_ALL;

  return (
    <section className="relative -mt-1 bg-gold py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 sm:justify-around sm:px-6 lg:px-8">
        {stats.map((stat, index) => (
          <div key={`${vertical}-${index}`} className="flex flex-col items-center text-center">
            <span className="text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="mt-1 text-sm font-medium text-navy/70">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
