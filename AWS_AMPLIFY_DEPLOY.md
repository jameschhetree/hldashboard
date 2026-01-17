# AWS Amplify Deployment Guide

## Quick Deploy Steps

1. **Create deployment zip** using the provided script:
   ```bash
   ./create-deploy-zip.sh
   ```
   Or manually:
   ```bash
   zip -r deploy.zip . -x "node_modules/*" ".next/*" ".git/*" "*.log" "deploy.zip"
   ```

2. **Upload to AWS Amplify**:
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
   - Click "New app" → "Host web app"
   - Choose "Deploy without Git provider"
   - Upload the `deploy.zip` file

3. **Build Settings** (Amplify should auto-detect Next.js):
   - **Build command**: `npm run build` (auto-detected)
   - **Output directory**: `.next` (auto-detected)
   - **Node version**: 18.x or 20.x (set in Amplify Console → App settings → Build settings)

## Important Files Included

- ✅ `amplify.yml` - Build configuration
- ✅ `next.config.mjs` - Next.js config with image optimization disabled
- ✅ `package.json` - All dependencies
- ✅ `public/` folder - Images, videos, and static assets
- ✅ All source files in `app/`, `components/`, `lib/`

## Common Issues & Fixes

### Issue: "Build failed" or "Module not found"
**Fix**: Make sure `package.json` includes all dependencies. Check build logs in Amplify Console.

### Issue: "Page not found" or blank screen
**Fix**: 
- Verify Node.js version is 18+ in Amplify settings
- Check that `amplify.yml` is in the root directory
- Ensure `public/` folder is included in zip

### Issue: "Images not loading"
**Fix**: Images are set to `unoptimized: true` in `next.config.mjs` for Amplify compatibility.

### Issue: "Video not playing"
**Fix**: Video files in `public/videos/` should be included. Check file size limits (Amplify has limits).

## Verification Checklist

Before deploying, ensure:
- [ ] `amplify.yml` exists in root
- [ ] `next.config.mjs` has `images: { unoptimized: true }`
- [ ] `public/` folder contains all assets (images, videos, logo)
- [ ] `package.json` has all dependencies
- [ ] No TypeScript errors (run `npm run build` locally first)
- [ ] All `.tsx` and `.ts` files are included

## After Deployment

1. Check the build logs in Amplify Console
2. If build succeeds but site doesn't load, check:
   - Browser console for errors
   - Network tab for failed requests
   - Amplify app logs
3. Verify the deployed URL is accessible
