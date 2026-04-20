import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "navy" | "green" | "muted" | "outline";
  className?: string;
}

const badgeVariants = {
  gold: "bg-gold/10 text-gold-dark border-gold/20",
  navy: "bg-navy/10 text-navy border-navy/20",
  green: "bg-green-50 text-green-700 border-green-200",
  muted: "bg-gray-100 text-muted border-gray-200",
  outline: "bg-transparent text-muted border-gray-300",
};

export default function Badge({
  children,
  variant = "gold",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
