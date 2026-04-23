
-- Nirvana Homes Production Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    location TEXT NOT NULL CHECK (location IN ('delhi', 'bali')),
    location_label TEXT,
    status TEXT NOT NULL DEFAULT 'ongoing' CHECK (status IN ('completed', 'ongoing')),
    type TEXT,
    area TEXT,
    year TEXT,
    thumbnail TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    floor_plans JSONB DEFAULT '[]'::jsonb,
    tour_embed_url TEXT,
    description TEXT,
    highlights TEXT[] DEFAULT '{}',
    amenities TEXT[] DEFAULT '{}',
    specs JSONB DEFAULT '{}'::jsonb,
    timeline JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    quote TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    profession TEXT,
    image TEXT,
    video_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media table
CREATE TABLE IF NOT EXISTS public.media (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    article_url TEXT,
    date TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    location TEXT NOT NULL,
    interest TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    source TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_location ON public.projects(location);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);

-- Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public read projects" ON public.projects;
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role full access projects" ON public.projects;
CREATE POLICY "Service role full access projects" ON public.projects FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Public read testimonials" ON public.testimonials;
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role full access testimonials" ON public.testimonials;
CREATE POLICY "Service role full access testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Public read media" ON public.media;
CREATE POLICY "Public read media" ON public.media FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role full access media" ON public.media;
CREATE POLICY "Service role full access media" ON public.media FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role full access leads" ON public.leads;
CREATE POLICY "Service role full access leads" ON public.leads FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Public insert leads" ON public.leads;
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Update triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS handle_projects_updated_at ON public.projects;
CREATE TRIGGER handle_projects_updated_at BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_testimonials_updated_at ON public.testimonials;
CREATE TRIGGER handle_testimonials_updated_at BEFORE UPDATE ON public.testimonials
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_media_updated_at ON public.media;
CREATE TRIGGER handle_media_updated_at BEFORE UPDATE ON public.media
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_leads_updated_at ON public.leads;
CREATE TRIGGER handle_leads_updated_at BEFORE UPDATE ON public.leads
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample data for testing
INSERT INTO public.projects (slug, title, subtitle, location, location_label, status, type, area, year, description, highlights, amenities, specs) 
VALUES (
  'luxury-villa-sample',
  'Luxury Villa Sample',
  'Premium Residential Development',
  'delhi',
  'South Delhi',
  'ongoing',
  'Luxury Villa',
  '5000 sq ft',
  '2025',
  'Sample luxury villa project showcasing the admin panel functionality and database integration.',
  ARRAY['Premium Location', 'Modern Architecture', 'Smart Home Features'],
  ARRAY['Swimming Pool', 'Private Garden', 'Home Automation', 'Security System'],
  '{"Bedrooms": "4", "Bathrooms": "5", "Parking": "3 Cars", "Garden": "2000 sq ft"}'::jsonb
) ON CONFLICT (slug) DO NOTHING;

-- Success message
SELECT 'Database setup completed successfully! Admin panel is now fully functional.' as status;
