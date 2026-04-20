"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

/**
 * Image component that shows the actual image if it exists,
 * or falls back to a styled gradient placeholder.
 * Uses a plain <img> tag for dynamic local uploads (avoids next/image config issues).
 */
export default function ProjectImage({
  src,
  alt,
  className,
  fallbackClassName,
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);

  // If src is a placeholder path (doesn't start with /images/projects/), show fallback
  const isPlaceholder = !src || src.includes("/placeholders/");

  if (isPlaceholder || hasError) {
    return (
      <div
        className={cn(
          "h-full w-full bg-gradient-to-br from-navy/80 to-gold/20",
          fallbackClassName,
          className
        )}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={cn("h-full w-full object-cover", className)}
      loading="lazy"
    />
  );
}
