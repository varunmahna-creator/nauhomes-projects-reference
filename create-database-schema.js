// Script to create database schema in Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://eqrgmyrnrdnnqphncsde.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxcmdteXJucmRubnFwaG5jc2RlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTY2OTM2MCwiZXhwIjoyMDUxMjQ1MzYwfQ.bYp9XvF2cHsQ3mLn7ZkR6tVgJ8uE5jK1oP4wN9aI2cX';

const supabase = createClient(supabaseUrl, serviceKey);

async function createTables() {
  console.log('🔧 Creating database tables...');
  
  try {
    // Create projects table
    const { error: projectsError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (projectsError && !projectsError.message.includes('already exists')) {
      console.error('Projects table error:', projectsError);
    } else {
      console.log('✅ Projects table ready');
    }

    // Enable RLS and create policies
    await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Public read access" ON public.projects;
        CREATE POLICY "Public read access" ON public.projects FOR SELECT USING (true);
        
        DROP POLICY IF EXISTS "Service role full access" ON public.projects;
        CREATE POLICY "Service role full access" ON public.projects FOR ALL USING (auth.role() = 'service_role');
      `
    });

    console.log('✅ Database setup complete');
    
    // Test insertion
    const testProject = {
      slug: 'test-database-connection',
      title: 'Database Connection Test',
      location: 'delhi',
      status: 'ongoing'
    };

    const { data, error } = await supabase
      .from('projects')
      .insert(testProject)
      .select();

    if (error) {
      console.error('Insert test failed:', error);
    } else {
      console.log('✅ Database insert test successful:', data);
      
      // Clean up test
      await supabase
        .from('projects')
        .delete()
        .eq('slug', 'test-database-connection');
      console.log('🧹 Test data cleaned up');
    }

  } catch (error) {
    console.error('❌ Database setup failed:', error);
  }
}

createTables();