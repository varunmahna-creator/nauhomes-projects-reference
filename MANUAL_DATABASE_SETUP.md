# 🗄️ Manual Database Setup (2 minutes)

## ⚡ Quick Setup Steps

### 1. Open Supabase SQL Editor
**Go to:** https://eqrgmyrnrdnnqphncsde.supabase.co/project/default/sql

### 2. Copy & Paste This SQL Script

```sql
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

-- Create policies for public read access
CREATE POLICY "Public read access" ON public.projects 
FOR SELECT USING (true);

-- Create policy for service role full access  
CREATE POLICY "Service role full access" ON public.projects 
FOR ALL USING (auth.role() = 'service_role');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_location ON public.projects(location);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
```

### 3. Click "Run" Button

The SQL will create:
- ✅ Projects table with all required fields
- ✅ Security policies for public read + admin write
- ✅ Performance indexes
- ✅ Data validation constraints

### 4. Verify Creation

Run this query to verify:
```sql
SELECT COUNT(*) FROM public.projects;
```

Should return `0` (empty table, ready for data).

---

## 🎯 After Database Setup

Once the database is created, the admin panel will work perfectly:

1. **Visit:** https://nauhomes.vercel.app/admin
2. **Create project:** Add title, description, images
3. **Upload files:** Thumbnails, gallery, PDFs
4. **Save project:** Data persists permanently
5. **View projects:** Visit /projects page to see saved data

---

## ✅ Expected Results

- ✅ **Admin panel saves projects** to database
- ✅ **Images upload to Cloudinary** CDN  
- ✅ **Data persists** after page refresh
- ✅ **No more EROFS errors**
- ✅ **Production-ready** real estate website

---

**Total setup time: 2 minutes**  
**Result: Fully functional project management system**

*This is a one-time setup. Once done, the website will work permanently.*