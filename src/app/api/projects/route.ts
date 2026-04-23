import { NextResponse } from "next/server";

interface ProjectData {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  locationLabel: string;
  status: string;
  type: string;
  area: string;
  year: string;
  thumbnail: string;
  gallery: Array<{ src: string; alt: string }>;
  floorPlans: Array<{ src: string; alt: string }>;
  tourEmbedUrl: string | null;
  description: string;
  highlights: string[];
  amenities: string[];
  specs: Record<string, string>;
  timeline: any[];
}

// Simple in-memory storage that works in serverless
let projects: ProjectData[] = [
  {
    slug: 'luxury-villa-delhi',
    title: 'Luxury Villa Delhi',
    subtitle: 'Premium Residential Development', 
    location: 'delhi',
    locationLabel: 'Greater Kailash, Delhi',
    status: 'ongoing',
    type: 'Luxury Villa',
    area: '5000 sq ft',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', alt: 'Living Area' }
    ],
    floorPlans: [
      { src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80', alt: 'Floor Plan' }
    ],
    tourEmbedUrl: null,
    description: 'An exquisite luxury villa featuring contemporary architecture and premium finishes.',
    highlights: ['Prime Location', 'Modern Architecture', 'Premium Finishes'],
    amenities: ['Swimming Pool', 'Home Theater', 'Gym', 'Garden'],
    specs: { 'Bedrooms': '4', 'Bathrooms': '5', 'Parking': '3 Cars' },
    timeline: []
  },
  {
    slug: 'eco-villa-bali',
    title: 'Eco Villa Bali', 
    subtitle: 'Sustainable Luxury Living',
    location: 'bali',
    locationLabel: 'Ubud, Bali',
    status: 'completed',
    type: 'Eco Villa',
    area: '3500 sq ft',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&q=80', alt: 'Villa Exterior' }
    ],
    floorPlans: [],
    tourEmbedUrl: null,
    description: 'A sustainable luxury villa designed with eco-friendly materials.',
    highlights: ['Sustainable Design', 'Tropical Architecture', 'Natural Materials'],
    amenities: ['Infinity Pool', 'Yoga Deck', 'Organic Garden'],
    specs: { 'Bedrooms': '3', 'Bathrooms': '3', 'Pool': 'Infinity' },
    timeline: []
  }
];

export async function GET() {
  try {
    console.log('📊 GET /api/projects - returning projects:', projects.length);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error in GET /api/projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('📝 POST /api/projects - creating:', body.title);
    
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (projects.find(p => p.slug === slug)) {
      return NextResponse.json({ error: "Project already exists" }, { status: 400 });
    }

    const newProject: ProjectData = {
      slug,
      title: body.title,
      subtitle: body.subtitle || "",
      location: body.location || "delhi",
      locationLabel: body.locationLabel || "",
      status: body.status || "ongoing",
      type: body.type || "",
      area: body.area || "",
      year: body.year || "",
      thumbnail: body.thumbnail || "",
      gallery: body.gallery || [],
      floorPlans: body.floorPlans || [],
      tourEmbedUrl: body.tourEmbedUrl || null,
      description: body.description || "",
      highlights: body.highlights || [],
      amenities: body.amenities || [],
      specs: body.specs || {},
      timeline: body.timeline || []
    };

    projects.push(newProject);
    console.log('✅ Project created:', slug, 'Total projects:', projects.length);
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('❌ Project creation error:', error);
    return NextResponse.json({ 
      error: "Failed to create project",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}