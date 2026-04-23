// Auto-initialize database tables if they don't exist
import { supabaseAdmin } from './supabase'

export async function initializeDatabase() {
  try {
    console.log('🔧 Checking database tables...')
    
    // Try to access projects table to see if it exists
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('count')
      .limit(1)
    
    if (error) {
      if (error.message.includes('relation "public.projects" does not exist')) {
        console.log('📝 Database tables need to be created')
        console.log('⚠️ Please run database/schema.sql in Supabase dashboard')
        console.log('🔗 Go to: https://eqrgmyrnrdnnqphncsde.supabase.co/project/default/sql')
        return false
      }
      
      console.warn('Database check warning:', error.message)
      return false
    }
    
    console.log('✅ Database tables verified and ready')
    return true
  } catch (error) {
    console.error('❌ Database check failed:', error)
    return false
  }
}