import { NextResponse } from "next/server";

// Hard-coded test data to ensure API works
const testProjects = [
  {
    slug: 'test-villa-api',
    title: 'API Test Villa',
    subtitle: 'Testing API Response',
    location: 'delhi',
    locationLabel: 'Test Location',
    status: 'ongoing',
    type: 'Test Villa',
    area: '4000 sq ft',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: [],
    floorPlans: [],
    tourEmbedUrl: null,
    description: 'This is a hardcoded test project to verify API functionality.',
    highlights: ['API Test', 'Direct Response'],
    amenities: ['Test Feature'],
    specs: { 'Status': 'API Test' },
    timeline: []
  },
  {
    slug: 'luxury-villa-gk1',
    title: 'Luxury Villa GK-1',
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
    floorPlans: [],
    tourEmbedUrl: null,
    description: 'An exquisite luxury villa in the heart of Greater Kailash.',
    highlights: ['Prime Location', 'Modern Architecture'],
    amenities: ['Swimming Pool', 'Home Theater'],
    specs: { 'Bedrooms': '4', 'Bathrooms': '5' },
    timeline: []
  }
];

// In-memory storage for new projects
let sessionProjects = [...testProjects];

export async function GET() {
  try {
    console.log("Direct API test - returning hardcoded projects");
    console.log("Projects count:", sessionProjects.length);
    return NextResponse.json(sessionProjects);
  } catch (error) {
    console.error("Error in GET /api/projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log("Creating new project...");
    const body = await request.json();
    console.log("Project data received:", body);
    
    // Validate required fields
    if (!body.title || !body.title.trim()) {
      console.log("Validation failed: Missing title");
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    console.log("Generated slug:", slug);

    // Check for duplicate slug
    if (sessionProjects.find((p) => p.slug === slug)) {
      console.log("Duplicate slug found:", slug);
      return NextResponse.json({ error: "A project with this name already exists" }, { status: 400 });
    }

    const newProject = {
      slug,
      title: body.title || "",
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
      timeline: body.timeline || [],
    };

    console.log("Adding project to session storage:", newProject.title);
    sessionProjects.push(newProject);
    
    console.log("Project created successfully. Total projects:", sessionProjects.length);
    return NextResponse.json(newProject, { status: 201 });
    
  } catch (error) {
    console.error("Project creation error:", error);
    return NextResponse.json({ 
      error: "Failed to create project", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}