
-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Public read access" ON public.projects;
DROP POLICY IF EXISTS "Service role full access" ON public.projects;

-- Create policies
CREATE POLICY "Public read access" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Service role full access" ON public.projects FOR ALL USING (auth.role() = 'service_role');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_location ON public.projects(location);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
