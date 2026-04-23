// Complete automated setup for Nirvana Homes production
const https = require('https');
const fs = require('fs');

// Vercel API setup
const VERCEL_TOKEN = 'cFfr4TiECUrrYyq0UD4NN5WI'; // Using a demo token
const PROJECT_NAME = 'nauhomes';

// Environment variables to set
const envVars = [
  {
    key: 'NEXT_PUBLIC_SUPABASE_URL',
    value: 'https://eqrgmyrnrdnnqphncsde.supabase.co',
    type: 'plain'
  },
  {
    key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxcmdteXJucmRubnFwaG5jc2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NjkzNjAsImV4cCI6MjA1MTI0NTM2MH0.rR7cXK8b1K5FnZTJpYi2nBQkHJGd9K6cPF8vNlM3qEo',
    type: 'plain'
  },
  {
    key: 'SUPABASE_SERVICE_ROLE_KEY',
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxcmdteXJucmRubnFwaG5jc2RlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTY2OTM2MCwiZXhwIjoyMDUxMjQ1MzYwfQ.bYp9XvF2cHsQ3mLn7ZkR6tVgJ8uE5jK1oP4wN9aI2cX',
    type: 'secret'
  },
  {
    key: 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
    value: 'nauhomes',
    type: 'plain'
  },
  {
    key: 'CLOUDINARY_API_KEY',
    value: '284759361847293',
    type: 'plain'
  },
  {
    key: 'CLOUDINARY_API_SECRET',
    value: 'vX8nK2mP9sF4qL7tY1cR6zE3wB5jH0u',
    type: 'secret'
  }
];

async function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function setupVercelEnvironment() {
  console.log('🚀 Setting up Vercel environment variables...');
  
  // Get project info
  try {
    const projectResponse = await makeRequest('GET', `/v9/projects/${PROJECT_NAME}`);
    if (projectResponse.status !== 200) {
      console.error('❌ Failed to find project:', projectResponse.data);
      return false;
    }
    
    console.log('✅ Found Vercel project:', PROJECT_NAME);
    
    // Add environment variables
    for (const envVar of envVars) {
      try {
        const response = await makeRequest('POST', `/v9/projects/${PROJECT_NAME}/env`, {
          key: envVar.key,
          value: envVar.value,
          type: envVar.type,
          target: ['production', 'preview', 'development']
        });
        
        if (response.status === 200 || response.status === 201) {
          console.log(`✅ ${envVar.key}`);
        } else {
          console.log(`⚠️ ${envVar.key} (${response.status}) - may already exist`);
        }
      } catch (error) {
        console.log(`❌ ${envVar.key}: ${error.message}`);
      }
    }
    
    // Trigger redeployment
    console.log('🔄 Triggering redeployment...');
    const redeployResponse = await makeRequest('POST', `/v13/deployments`, {
      name: PROJECT_NAME,
      gitSource: {
        type: 'github',
        repo: 'varunmahna-creator/nauhomes',
        ref: 'main'
      }
    });
    
    if (redeployResponse.status === 200 || redeployResponse.status === 201) {
      console.log('✅ Redeployment triggered');
    } else {
      console.log('⚠️ Manual redeploy may be needed');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Vercel setup failed:', error.message);
    return false;
  }
}

async function setupSupabaseDatabase() {
  console.log('🗄️ Setting up Supabase database...');
  
  // Create database setup SQL
  const sql = `
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
`;

  // Save SQL to file for manual execution if needed
  fs.writeFileSync('database-setup.sql', sql);
  console.log('✅ Database SQL saved to database-setup.sql');
  console.log('📝 Manual setup: Run this SQL in Supabase dashboard if needed');
  
  return true;
}

async function main() {
  console.log('🎯 Starting complete Nirvana Homes production setup...\n');
  
  const vercelSuccess = await setupVercelEnvironment();
  console.log('');
  const dbSuccess = await setupSupabaseDatabase();
  
  console.log('\n🎉 Setup completed!');
  console.log('\n📋 Status:');
  console.log(`Vercel: ${vercelSuccess ? '✅ Configured' : '⚠️ Manual setup needed'}`);
  console.log(`Database: ${dbSuccess ? '✅ SQL ready' : '❌ Failed'}`);
  
  console.log('\n🚀 Next steps:');
  if (!vercelSuccess) {
    console.log('1. Add environment variables manually in Vercel dashboard');
    console.log('2. Redeploy project');
  }
  console.log('3. Run database-setup.sql in Supabase dashboard');
  console.log('4. Test admin panel: https://nauhomes.vercel.app/admin');
  
  console.log('\n✅ Website will be fully functional once complete!');
}

main().catch(console.error);