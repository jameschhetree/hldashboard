# Deployment Guide - Host Your Dashboard Live

## Option 1: Vercel (Recommended - Easiest & Free)

Vercel is the official hosting platform for Next.js and provides instant deployment with a live URL.

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
This will open a browser window for you to login with GitHub, GitLab, or email.

### Step 3: Deploy
From your project directory, run:
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (first time)
- **Project name?** → Press Enter (uses folder name) or type a custom name
- **Directory?** → Press Enter (uses current directory)
- **Override settings?** → No

### Step 4: Get Your Live URL
After deployment, Vercel will give you a URL like:
- `https://hl-dashboard.vercel.app` (production)
- `https://hl-dashboard-xyz.vercel.app` (preview)

**That's it!** Share this URL with your friend.

---

## Option 2: Deploy via GitHub + Vercel (Better for Updates)

### Step 1: Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (name it "hl-dashboard" or similar)
3. **Don't** initialize with README
4. Copy the repository URL

### Step 3: Push to GitHub
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

### Step 4: Deploy on Vercel
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"
6. Wait ~2 minutes
7. Get your live URL!

**Bonus:** Every time you push to GitHub, Vercel automatically deploys updates!

---

## Option 3: Netlify (Alternative)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login
```bash
netlify login
```

### Step 3: Deploy
```bash
netlify deploy --prod
```

Follow the prompts and get your live URL!

---

## Quick Notes:
- **Vercel** is recommended because it's made by the Next.js team
- All options are **free** for personal projects
- Your URL will be something like: `your-project-name.vercel.app`
- You can customize the domain later if you want

---

## Troubleshooting:

**If build fails:**
- Make sure all dependencies are in `package.json`
- Run `npm run build` locally first to test
- Check the build logs in Vercel dashboard

**If images/videos don't load:**
- Make sure files are in the `public` folder (they should be)
- Check file paths in your code

**Need help?** The Vercel dashboard has great documentation and support!
