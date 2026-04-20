"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FilterTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export default function FilterTabs({ tabs, activeTab, onTabChange, className }: FilterTabsProps) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-3", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={cn(
            "rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer",
            activeTab === tab
              ? "bg-gold text-navy shadow-md"
              : "bg-white text-muted hover:bg-gold/10 hover:text-navy border border-gray-200"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
