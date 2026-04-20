import type { Testimonial } from "@/types";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "testimonials.json");

export function getTestimonials(): Testimonial[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Testimonial[];
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(testimonials, null, 2), "utf-8");
}

export function getTestimonialById(id: string): Testimonial | undefined {
  return getTestimonials().find((t) => t.id === id);
}
