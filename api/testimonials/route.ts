import { NextResponse } from "next/server";
import { getTestimonials, saveTestimonials } from "@/lib/testimonials";
import type { Testimonial } from "@/types";

export async function GET() {
  const testimonials = getTestimonials();
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const testimonials = getTestimonials();

    const id = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + "-" + Date.now();

    const newTestimonial: Testimonial = {
      id,
      name: body.name || "",
      location: body.location || "",
      quote: body.quote || "",
      rating: body.rating || 5,
      profession: body.profession || "",
      image: body.image || undefined,
    };

    testimonials.push(newTestimonial);
    saveTestimonials(testimonials);

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
