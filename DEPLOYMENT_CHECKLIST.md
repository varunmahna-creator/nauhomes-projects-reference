# 🚀 Nirvana Homes Production Deployment Checklist

## Current Status
- ✅ Database integration implemented (Supabase)
- ✅ Cloud storage implemented (Cloudinary) 
- ✅ API routes updated for persistence
- ✅ Frontend updated for async data fetching
- ✅ Admin panel ready for real data
- 🔄 **Needs deployment with proper environment variables**

## 🎯 Quick Deploy (5 steps)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com/dashboard)
2. Create new project: "nirvana-homes"
3. Wait for project to initialize (~2 minutes)
4. Go to SQL Editor → Copy/paste content from `database/schema.sql` → Run
5. Go to Settings → API → Copy your credentials:
   - Project URL
   - Anon public key  
   - Service role key

### Step 2: Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com/users/register/free)
2. Sign up and verify email
3. From dashboard, copy:
   - Cloud name
   - API Key
   - API Secret

### Step 3: Update Environment Variables in Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the `nauhomes` project
3. Go to Settings → Environment Variables
4. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Step 4: Deploy the Code
```bash
cd nauhomes
git add .
git commit -m "Add production database and cloud storage"
git push
```

### Step 5: Test Production
1. Wait for Vercel deployment to complete
2. Visit https://nauhomes.vercel.app/admin
3. Create a test project with image uploads
4. Verify data persists after page refresh
5. Check projects appear on https://nauhomes.vercel.app/projects

## 🧪 Local Testing (Optional)

Before deploying, you can test locally:

```bash
# 1. Add credentials to .env.local
cp .env.local.example .env.local
# Edit .env.local with your credentials

# 2. Test database connection
npm run test:db

# 3. Start development server
npm run dev

# 4. Test admin panel at localhost:3000/admin
```

## 🔍 Verification Steps

After deployment, verify these features work:

### Admin Panel (`/admin`)
- [ ] Create new project saves to database
- [ ] Upload thumbnail image uploads to Cloudinary
- [ ] Upload gallery images work
- [ ] Upload PDF floor plans work
- [ ] Edit existing project persists changes
- [ ] Delete project removes from database

### Frontend Pages
- [ ] Homepage shows projects from database
- [ ] `/projects` page displays all projects
- [ ] `/delhi` page shows Delhi projects only
- [ ] `/bali` page shows Bali projects only
- [ ] Images load from Cloudinary CDN
- [ ] Page refresh doesn't lose data

## 🚨 Troubleshooting

### Database Connection Issues
- Verify Supabase URL and keys are correct
- Check RLS policies are set up (run schema.sql)
- Ensure service role key is used for admin operations

### Image Upload Issues  
- Verify Cloudinary credentials are correct
- Check file size limits (Cloudinary free: 10MB)
- Ensure CORS is configured in Cloudinary (auto-configured)

### Vercel Deployment Issues
- Check build logs for TypeScript errors
- Verify all environment variables are set
- Check function timeout limits (10s on hobby plan)

## 📊 Expected Results

### Before Fix
- ❌ EROFS: read-only file system errors
- ❌ Projects lost after page refresh
- ❌ Image uploads failing
- ❌ localStorage-only persistence

### After Fix  
- ✅ Projects saved to PostgreSQL database
- ✅ Images uploaded to Cloudinary CDN
- ✅ Data persists across sessions
- ✅ Admin panel fully functional
- ✅ Fast image loading with optimization
- ✅ Scalable production architecture

## 💰 Cost Expectations (Free Tiers)

- **Supabase:** 2 projects, 500MB DB, 1GB bandwidth/month
- **Cloudinary:** 25 credits/month (~1000 images)
- **Vercel:** 100GB bandwidth, unlimited static deployments

This covers initial launch and growth to ~1000 visitors/month.

## 🎉 Success Criteria

The deployment is successful when:

1. **Admin can add projects** and they persist
2. **Images upload and display** properly  
3. **Public pages load** project data from database
4. **No EROFS errors** in logs
5. **Performance is fast** (Cloudinary CDN + Supabase)

## 📞 Support

If issues arise:
1. Check browser console for errors
2. Check Vercel function logs
3. Check Supabase logs in dashboard  
4. Refer to `SETUP_GUIDE.md` for detailed help

**Ready to deploy! 🚀**