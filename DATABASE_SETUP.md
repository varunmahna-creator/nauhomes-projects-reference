# 🗄️ Database Setup Instructions

## Step 1: Create Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Organization: Choose your organization
4. Name: `nirvana-homes`
5. Database Password: Choose a strong password
6. Region: Asia Southeast (Singapore) - closest to India
7. Click "Create new project"
8. Wait 2-3 minutes for project initialization

## Step 2: Get Project Credentials

1. In your Supabase dashboard, go to Settings → API
2. Copy the following:
   - **Project URL** (starts with https://xyz.supabase.co)  
   - **Anon public key** (long string starting with eyJ...)
   - **Service role key** (secret key, also starts with eyJ...)

## Step 3: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Copy the entire content from `database/schema.sql` file
3. Paste it into the SQL Editor
4. Click **Run** to execute

This will create:
- ✅ `projects` table with all fields
- ✅ `testimonials` table  
- ✅ `media` table
- ✅ `leads` table
- ✅ RLS policies for security
- ✅ Automatic timestamps
- ✅ Indexes for performance

## Step 4: Verify Setup

Run this SQL query to verify tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

You should see:
- projects
- testimonials  
- media
- leads

## Step 5: Test Connection

After setting environment variables in Vercel:

1. Visit https://nauhomes.vercel.app/admin
2. Try creating a test project
3. Upload an image
4. Save the project
5. Refresh the page - data should persist

## Database Schema Overview

### Projects Table
- Stores all real estate projects
- JSON fields for gallery, floor plans, specifications
- Location filtering (Delhi/Bali)
- Status tracking (ongoing/completed)

### Testimonials Table  
- Customer reviews and ratings
- Optional video testimonials
- Image uploads supported

### Media Table
- Press coverage and media mentions
- Logo uploads for media outlets
- Article links

### Leads Table
- Contact form submissions
- Lead tracking and status management
- Source attribution

## Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Public read access** for website display
- **Service role access** for admin operations
- **Lead insertion** allowed for contact forms

## Troubleshooting

### Connection Issues
- Verify project URL is correct (no trailing slash)
- Check that keys are copied completely
- Ensure project status is "Active" in Supabase

### Permission Issues  
- RLS policies are automatically created
- Service role bypasses RLS for admin operations
- Public users can read data and submit leads

### Performance
- Indexes are created on commonly queried fields
- JSON fields support efficient queries
- Connection pooling enabled

## Ready to Use!

Once the schema is executed:
- ✅ Database ready for production
- ✅ All tables created with proper security
- ✅ Admin panel can manage content
- ✅ Website can display data
- ✅ Contact forms work

The database supports the full Nirvana Homes website functionality!