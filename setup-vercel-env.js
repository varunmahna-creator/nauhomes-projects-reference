// Script to setup Vercel environment variables
// Run with: node setup-vercel-env.js

const fetch = require('node-fetch');

const VERCEL_TOKEN = process.env.VERCEL_TOKEN; // Set this in your environment
const PROJECT_ID = 'nauhomes'; // Your Vercel project name

const envVars = [
  {
    key: 'NEXT_PUBLIC_SUPABASE_URL',
    value: 'https://czyhctqfzgxpjbwjlulr.supabase.co',
    type: 'plain',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6eWhjdHFmemd4cGpid2psdWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NjY4MDAsImV4cCI6MjA1MTI0MjgwMH0.TF-9QRQ5b4J6sB4FXwqONr1zHlcqEPdm8gR3QX5Nsr4',
    type: 'plain',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'SUPABASE_SERVICE_ROLE_KEY',
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6eWhjdHFmemd4cGpid2psdWxyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTY2NjgwMCwiZXhwIjoyMDUxMjQyODAwfQ.wKl2pF1tUJKs8NrP4-5SZv2cLrN8Q1mGhJp9x3fT2Vo',
    type: 'secret',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
    value: 'nirvanahomes',
    type: 'plain', 
    target: ['production', 'preview', 'development']
  },
  {
    key: 'CLOUDINARY_API_KEY',
    value: '472845319624837',
    type: 'plain',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'CLOUDINARY_API_SECRET',
    value: 'YbN3mK9Lc2Fp8QsV7jR6tE4nA1dG5hU9',
    type: 'secret',
    target: ['production', 'preview', 'development']
  }
];

async function setupEnvVars() {
  if (!VERCEL_TOKEN) {
    console.log('❌ VERCEL_TOKEN not set');
    console.log('Get token from: https://vercel.com/account/tokens');
    console.log('Then run: VERCEL_TOKEN=your_token node setup-vercel-env.js');
    return;
  }

  console.log('🚀 Setting up Vercel environment variables...');

  for (const envVar of envVars) {
    try {
      const response = await fetch(`https://api.vercel.com/v9/projects/${PROJECT_ID}/env`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(envVar)
      });

      if (response.ok) {
        console.log(`✅ ${envVar.key}`);
      } else {
        const error = await response.json();
        console.log(`❌ ${envVar.key}: ${error.error?.message || response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${envVar.key}: ${error.message}`);
    }
  }

  console.log('\n🎉 Environment variables setup complete!');
  console.log('📋 Next steps:');
  console.log('1. Redeploy project in Vercel dashboard');
  console.log('2. Setup database using DATABASE_SETUP.md');  
  console.log('3. Test admin panel at https://nauhomes.vercel.app/admin');
}

setupEnvVars();