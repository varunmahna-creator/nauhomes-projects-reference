import { NextResponse } from "next/server";
import { getTestimonials, saveTestimonials } from "@/lib/testimonials";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;
  const testimonials = getTestimonials();
  const testimonial = testimonials.find((t) => t.id === id);
  if (!testimonial) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }
  return NextResponse.json(testimonial);
}

export async function PUT(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const body = await request.json();
    const testimonials = getTestimonials();
    const index = testimonials.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    testimonials[index] = { ...testimonials[index], ...body, id };
    saveTestimonials(testimonials);

    return NextResponse.json(testimonials[index]);
  } catch {
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const testimonials = getTestimonials();
    const index = testimonials.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    testimonials.splice(index, 1);
    saveTestimonials(testimonials);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
