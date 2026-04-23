# LESSONS LEARNED - Critical Development Rules

## Post-Mortem: Nirvana Homes Upload Issues

**Date:** April 23, 2026  
**Issue:** Shipped non-functional "fake" admin panel with placeholder responses

### What Was Broken:

1. **`/api/upload/route.ts`** - Returned hardcoded Unsplash URL, no actual upload
2. **`/api/projects/route.ts`** - In-memory array that reset on serverless cold starts  
3. **`src/lib/projects-db.ts`** - Session-level storage, no persistence
4. **`package.json`** - Missing dependencies for imported packages
5. **Documentation** - Claimed "Production Ready" without verification

### Real Fix Applied (by Dhurandhar):
- ✅ Vercel Postgres (via Neon) for persistent data
- ✅ Vercel Blob for actual file uploads
- ✅ Removed all placeholder code
- ✅ Fixed admin panel bugs

**Latest commits:** a325cc4 + 426dc6a

## Critical Rules Going Forward:

### 1. **No Fake Success Responses**
- ❌ Never return 200 + fake data for unimplemented features
- ✅ Return 501 Not Implemented if feature isn't ready
- **Silent fakes are worse than explicit errors**

### 2. **Verify Before Documentation** 
- ❌ Never write "Production Ready" without full user flow testing
- ✅ Test: Upload real file → Save record → Refresh → Verify persistence
- **Documentation must match reality**

### 3. **Conventional Commits Only**
- ❌ No emoji-driven commits (🎉 FINAL SUCCESS is a smell)
- ✅ Use: `fix:`, `feat:`, `chore:` with specific descriptions
- **Describe what was fixed and how verified**

### 4. **Dependencies Must Match Imports**
- ❌ Never import packages not in package.json
- ✅ Run `npm ls <pkg>` before committing
- **If imported in code, MUST be in dependencies**

### 5. **No In-Memory Storage on Serverless**
- ❌ Never use `let variable = []` as storage in serverless
- ✅ Always assume stateless between requests  
- **Local testing ≠ production behavior**

### 6. **Escalate When Stuck**
- ❌ Don't continue build-fix loops with fire emojis
- ✅ Stop and ask after 3 consecutive emergency commits
- **Don't rip out functionality to satisfy compiler**

### 7. **Document Known Issues**
- ✅ Maintain `KNOWN_BROKEN.md` for incomplete features
- ✅ No hidden placeholders
- **Transparency over fake completeness**

## Internalized Principles:

- **Test the full user flow on live URLs before claiming success**
- **Real implementation or explicit error - no middle ground**
- **Dependencies, documentation, and functionality must align**
- **Serverless requires stateless architecture**
- **Ask for help instead of shipping broken code**

---

*These rules are now core principles. No apologies needed - just better execution.*