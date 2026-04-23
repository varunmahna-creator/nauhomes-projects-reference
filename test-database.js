// Simple test script to verify database connection
// Run with: node test-database.js

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Missing environment variables')
  console.log('Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testDatabase() {
  console.log('🔍 Testing Supabase connection...')
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('projects')
      .select('count', { count: 'exact' })
    
    if (error) {
      console.log('❌ Database error:', error.message)
      console.log('💡 This is expected on first run - tables need to be created')
      return false
    }
    
    console.log('✅ Database connection successful')
    console.log(`📊 Projects table has ${data.length || 0} records`)
    return true
  } catch (err) {
    console.log('❌ Connection failed:', err.message)
    return false
  }
}

async function testCloudinary() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  
  if (!cloudName || !apiKey || !apiSecret) {
    console.log('⚠️  Cloudinary environment variables not set')
    console.log('Image uploads will not work until configured')
    return false
  }
  
  console.log('✅ Cloudinary credentials found')
  console.log(`📸 Cloud name: ${cloudName}`)
  return true
}

async function main() {
  console.log('🧪 Running Nirvana Homes Database Tests\n')
  
  const dbResult = await testDatabase()
  console.log('')
  const cloudinaryResult = await testCloudinary()
  
  console.log('\n📋 Test Results:')
  console.log(`Database: ${dbResult ? '✅ Connected' : '⚠️  Tables need setup'}`)
  console.log(`Cloudinary: ${cloudinaryResult ? '✅ Ready' : '⚠️  Not configured'}`)
  
  console.log('\n🎯 Next Steps:')
  if (!dbResult) {
    console.log('1. Run schema.sql in Supabase dashboard to create tables')
  }
  console.log('2. Build and deploy: npm run build && git push')
  console.log('3. Add environment variables to Vercel')
  console.log('4. Test admin panel: https://nauhomes.vercel.app/admin')
}

main().catch(console.error)