# Quick Start Guide

## Step 1: Install Node.js (If Not Already Installed)

1. **Download the installer:**
   - Go to https://nodejs.org/
   - Click the green "macOS Installer (.pkg)" button
   - This downloads a `.pkg` file

2. **Install Node.js:**
   - Double-click the downloaded `.pkg` file
   - Follow the installer (click "Continue" → "Install" → enter your password)
   - Wait for installation to complete

3. **Verify installation:**
   - Open Terminal (Applications → Utilities → Terminal, or press `Cmd + Space` and type "Terminal")
   - Type: `node --version`
   - You should see something like: `v24.13.0`
   - Type: `npm --version`
   - You should see something like: `11.6.2`

## Step 2: Install Project Dependencies

Once Node.js is installed, run these commands in Terminal:

```bash
# Navigate to the project folder
cd "/Users/jameschhetree/Desktop/HL Dashboard"

# Install all dependencies
npm install
```

This will take a few minutes - it's downloading all the packages we need (Next.js, React, etc.)

## Step 3: Start the Development Server

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000
```

## Step 4: View Your Dashboard

Open your browser and go to: **http://localhost:3000**

You should see the dashboard starting to take shape!

---

## Troubleshooting

**"command not found" errors?**
- Make sure Node.js installed successfully
- Try closing and reopening Terminal
- Verify with `node --version`

**Permission errors?**
- Make sure you're in the correct directory
- Check that you have write permissions to the folder

**Port 3000 already in use?**
- Next.js will automatically use port 3001, 3002, etc.
- Or stop whatever is using port 3000

---

**Need help?** Let me know what error messages you see!
