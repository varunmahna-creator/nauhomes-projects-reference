# 🚀 Vercel Environment Variables Setup

## CRITICAL: Add These Environment Variables to Vercel

Go to [Vercel Dashboard](https://vercel.com) → Select `nauhomes` project → Settings → Environment Variables

Add these **exact** variables:

### Supabase Database
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://czyhctqfzgxpjbwjlulr.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY  
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6eWhjdHFmemd4cGpid2psdWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NjY4MDAsImV4cCI6MjA1MTI0MjgwMH0.TF-9QRQ5b4J6sB4FXwqONr1zHlcqEPdm8gR3QX5Nsr4

Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6eWhjdHFmemd4cGpid2psdWxyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTY2NjgwMCwiZXhwIjoyMDUxMjQyODAwfQ.wKl2pF1tUJKs8NrP4-5SZv2cLrN8Q1mGhJp9x3fT2Vo
```

### Cloudinary Storage  
```
Name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
Value: nirvanahomes

Name: CLOUDINARY_API_KEY
Value: 472845319624837

Name: CLOUDINARY_API_SECRET
Value: YbN3mK9Lc2Fp8QsV7jR6tE4nA1dG5hU9
```

## After Adding Variables

1. **Redeploy** the project (Vercel → Deployments → Redeploy)
2. **Run database setup** (see DATABASE_SETUP.md)
3. **Test admin panel** at https://nauhomes.vercel.app/admin

## Verification Checklist

- [ ] All 5 environment variables added to Vercel
- [ ] Project redeployed after adding variables
- [ ] Database schema executed in Supabase
- [ ] Admin panel loads without errors
- [ ] Image upload works in admin panel
- [ ] Projects save and persist after page refresh

## Next Steps

1. Set up the database tables (DATABASE_SETUP.md)
2. Test the admin functionality 
3. Add real content to the website
4. Connect custom domain nauhomes.com

## Support

If any issues:
1. Check Vercel function logs for errors
2. Verify environment variables are exactly as shown
3. Ensure Supabase project is active
4. Test Cloudinary credentials

**Ready for production! 🎉**