import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  dark?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  hover = true,
  dark = false,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        dark
          ? "bg-white/5 border border-white/10"
          : "bg-white border border-gray-100 shadow-sm",
        hover && "hover:shadow-lg hover:-translate-y-1",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
