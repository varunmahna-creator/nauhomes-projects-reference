# Nirvana Homes Website - Production Setup Guide

## Overview
This guide will help you set up the production environment with proper database and cloud storage to fix the image upload and project save issues.

## Prerequisites
- Supabase account (free tier is fine to start)
- Cloudinary account (free tier is fine to start)

## Step 1: Supabase Database Setup

1. **Create a new Supabase project:**
   - Go to https://supabase.com/dashboard
   - Click "New Project"
   - Choose organization: `varunmahna`
   - Name: `nirvana-homes`
   - Region: Choose closest to your users (e.g., Singapore for India)
   - Create the project

2. **Run the database schema:**
   - Go to your Supabase dashboard
   - Navigate to "SQL Editor"
   - Copy and paste the content from `database/schema.sql`
   - Click "Run" to create all tables and policies

3. **Get your Supabase credentials:**
   - Go to "Settings" → "API"
   - Copy the following:
     - Project URL
     - Anon public key
     - Service role key (keep this secret!)

## Step 2: Cloudinary Setup

1. **Create a Cloudinary account:**
   - Go to https://cloudinary.com/users/register/free
   - Sign up and verify your email

2. **Get your Cloudinary credentials:**
   - From your dashboard, copy:
     - Cloud name
     - API Key
     - API Secret (keep this secret!)

## Step 3: Environment Variables

Update the `.env.local` file with your actual credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Cloudinary Configuration  
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Step 4: Deploy to Vercel

1. **Add environment variables to Vercel:**
   - Go to your Vercel dashboard
   - Select the nauhomes project
   - Go to "Settings" → "Environment Variables"
   - Add all the variables from your `.env.local` file

2. **Deploy the updated code:**
   ```bash
   git add .
   git commit -m "Add database and cloud storage integration"
   git push
   ```

3. **Verify the deployment:**
   - Visit https://nauhomes.vercel.app/admin
   - Try creating a new project
   - Upload images and save the project
   - Check that data persists after refresh

## Step 5: Test the Features

### Test Project Management:
1. Go to `/admin`
2. Create a new project with title, description, etc.
3. Upload thumbnail and gallery images
4. Save the project
5. Refresh the page - data should persist
6. Visit `/projects` to see the project listed

### Test Image Upload:
1. In admin panel, upload various file types (JPEG, PNG, PDF)
2. Images should upload to Cloudinary and display properly
3. PDFs should show as document icons with view links

## Troubleshooting

### Common Issues:

1. **Supabase Connection Error:**
   - Verify your Project URL and keys
   - Check that RLS policies are set up correctly
   - Ensure service role key is used for admin operations

2. **Cloudinary Upload Error:**
   - Verify your cloud name, API key, and secret
   - Check that the upload folder permissions are correct
   - Ensure file types are supported

3. **Vercel Environment Variables:**
   - Make sure all environment variables are set in Vercel dashboard
   - Redeploy after adding new variables
   - Check that variable names match exactly

## Security Notes

- **Never commit `.env.local`** to version control
- **Keep service role keys secure** - they have admin access
- **RLS policies** protect your data from unauthorized access
- **Cloudinary API secrets** should never be exposed to client-side code

## Database Migration (Optional)

If you have existing data in localStorage, you can migrate it:

1. Export data from browser localStorage
2. Format it according to the database schema
3. Insert into Supabase using the admin panel or API calls

## Performance Optimizations

1. **Cloudinary**: Auto-optimization, WebP conversion, responsive images
2. **Supabase**: Indexed queries, connection pooling
3. **Next.js**: Static generation, image optimization, caching

## Monitoring

- **Supabase Dashboard**: Monitor database usage, performance
- **Cloudinary Dashboard**: Monitor storage usage, transformations
- **Vercel Analytics**: Monitor website performance

## Cost Expectations

### Free Tiers Include:
- **Supabase**: 2 projects, 500MB database, 1GB bandwidth
- **Cloudinary**: 25 credits/month (~1000 images)
- **Vercel**: 100GB bandwidth, unlimited static deployments

This should be sufficient for initial launch and growth.

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Check Vercel deployment logs
3. Check Supabase logs in dashboard
4. Verify all environment variables are set correctly

The website should now have full persistence and file upload capabilities!