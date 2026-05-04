import type { Testimonial } from "@/types";

// Default testimonials data
const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Greater Kailash, Delhi",
    quote: "Nirvana Group transformed our vision into reality. The attention to detail and quality of construction exceeded our expectations.",
    rating: 5,
    profession: "Business Owner",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b167?w=150&q=80"
  },
  {
    id: "2", 
    name: "Rajesh Kumar",
    location: "Noida",
    quote: "Professional service from start to finish. The team was responsive and delivered exactly what was promised.",
    rating: 5,
    profession: "Software Engineer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
  }
];

// In-memory storage
let testimonialStorage: Testimonial[] = [...defaultTestimonials];

export function getTestimonials(): Testimonial[] {
  return testimonialStorage;
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  testimonialStorage = [...testimonials];
}

export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonialStorage.find((t) => t.id === id);
}