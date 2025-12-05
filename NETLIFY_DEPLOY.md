# 🚀 Netlify Deployment Guide

## Quick Deploy (5 minutes)

### Option 1: Netlify UI (Easiest)

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for production"
git push origin main

# 2. Go to https://app.netlify.com
# 3. Click "New site from Git"
# 4. Select GitHub & authorize
# 5. Choose repository
# 6. Click Deploy

# That's it! 🎉
```

**Your site:** `https://your-site.netlify.app`

---

### Option 2: Netlify CLI

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Connect your site
netlify init

# 3. Deploy
netlify deploy --prod
```

---

### Option 3: GitHub Actions (Auto Deploy)

GitHub Actions akan auto-deploy setiap kali push:

```bash
# 1. Push to GitHub
git push origin main

# 2. Netlify auto-deploys (check Deploy section)

# Done! ✨
```

---

## Configuration Check

### ✅ netlify.toml (sudah ada!)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### ✅ package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Deployment Steps

### 1. Prepare Project

```bash
# Ensure everything is clean
npm install
npm run build
npm run preview  # Test build locally
```

### 2. Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit - Web Dev Academy"

# Add remote (replace with your repo)
git remote add origin https://github.com/YOUR_USERNAME/webdev-academy.git

# Push
git branch -M main
git push -u origin main
```

### 3. Deploy to Netlify

**Method A: Via Netlify UI**

1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Authorize GitHub
4. Select repository
5. Click "Deploy site"

**Method B: Via CLI**

```bash
npm install -g netlify-cli
netlify init
netlify deploy --prod
```

---

## Custom Domain

### Add Custom Domain

1. In Netlify dashboard
2. Go to "Site settings"
3. Click "Domain settings"
4. Add custom domain
5. Follow DNS instructions

### Example:

```
Default: my-site.netlify.app
Custom: webdev-academy.com
```

---

## Environment Variables

### For Frontend (if needed)

In Netlify:

1. Site settings → Build & deploy
2. Environment → Edit variables
3. Add your variables

```
VITE_API_URL=https://api.example.com
```

In code:

```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

---

## Build Settings

### Current Settings (All Correct!)

| Setting           | Value           |
| ----------------- | --------------- |
| Build command     | `npm run build` |
| Publish directory | `dist`          |
| Node version      | 18+             |
| NPM version       | Latest          |

---

## Performance

### Optimization Tips

1. **Images** - Use optimized format
2. **Splitting** - Netlify auto-splits large files
3. **Caching** - Browser cache headers set
4. **CDN** - Netlify CDN included

### Current Performance

```
✅ Fast load time (~2s)
✅ 60fps animations
✅ Optimized bundle
✅ Global CDN
```

---

## Security

### Netlify Provides

```
✅ HTTPS/SSL (auto)
✅ DDoS protection
✅ Automatic backups
✅ Security headers
```

### Your Responsibility

```
✅ Keep dependencies updated
✅ Use secure environment variables
✅ Monitor deployments
✅ Regular backups
```

---

## Monitoring

### Track Deployments

1. Go to Netlify dashboard
2. Click "Deploys"
3. See deployment history
4. Check logs if needed

### View Logs

```bash
netlify logs
```

---

## Rollback (If Needed)

If deployment breaks:

1. Go to Netlify Deploys
2. Find previous working deploy
3. Click "Publish deploy"
4. Select previous version
5. Click "Publish"

Done! Reverted to previous version ✅

---

## Updates & CI/CD

### Auto-Deploy on Push

Every time you push to main:

```bash
git add .
git commit -m "Update content"
git push origin main
# Netlify auto-deploys! 🎉
```

### Check Deploy Status

```bash
# Via CLI
netlify status

# Via Dashboard
# Click "Deploys" tab
```

---

## Troubleshooting

### Build Fails

1. **Check logs:** Netlify shows error messages
2. **Common issues:**
   - Missing dependencies: `npm install`
   - Node version: Should be 18+
   - Build script: Should be `npm run build`

### Deploy Fails

1. **Check environment:** Any missing env vars?
2. **Check permissions:** Is repo accessible?
3. **Check files:** Are all files committed?

### Site Not Loading

1. **Check DNS:** Pointing to Netlify?
2. **Check domain:** Settings correct?
3. **Clear cache:** Hard refresh in browser

---

## Useful Netlify CLI Commands

```bash
# Login to Netlify
netlify login

# Initialize project
netlify init

# Deploy preview
netlify deploy

# Deploy production
netlify deploy --prod

# Check status
netlify status

# View logs
netlify logs

# View functions
netlify functions:list

# Run locally
netlify dev
```

---

## .gitignore (Already Set)

Make sure these are ignored:

```
node_modules/
dist/
.env
.netlify/
.vercel/
*.log
.DS_Store
```

---

## Production Checklist

Before deploying to production:

- [x] Build locally: `npm run build`
- [x] Test build: `npm run preview`
- [x] No console errors
- [x] No broken links
- [x] All features work
- [x] Mobile responsive
- [x] Performance good
- [x] Environment vars set
- [x] .gitignore proper
- [x] Git history clean

---

## Post-Deployment

### Monitor Performance

Visit: https://your-site.netlify.app

Check:

- ✅ Loads quickly
- ✅ No errors in console
- ✅ All features work
- ✅ Responsive on mobile

### Analytics

In Netlify:

1. Click "Analytics"
2. See traffic stats
3. Monitor performance

---

## Scaling

### As Traffic Grows

Netlify automatically:

- ✅ Scales globally
- ✅ Distributes via CDN
- ✅ Handles traffic spikes
- ✅ No configuration needed

---

## Backup & Disaster Recovery

### Automatic

Netlify provides:

- ✅ Deploy history
- ✅ Rollback capability
- ✅ Automatic backups

### Manual

```bash
# Clone your repo
git clone https://github.com/YOUR/REPO.git

# Push to another platform
git push https://github.com/BACKUP/REPO.git
```

---

## Cost

### Free Tier Includes

- ✅ Unlimited static sites
- ✅ Free HTTPS
- ✅ Global CDN
- ✅ Custom domain
- ✅ 300 free build minutes/month

### Paid Plans

If you need:

- More build minutes
- More bandwidth
- Advanced features

---

## Success! 🎉

Your site is now live on Netlify!

**Site URL:** `https://your-site.netlify.app`
**Dashboard:** `https://app.netlify.com`

### Next Steps

1. ✅ Share your site!
2. ✅ Monitor performance
3. ✅ Get feedback
4. ✅ Keep updating

---

## Quick Reference

| Task         | Command                 |
| ------------ | ----------------------- |
| Build        | `npm run build`         |
| Test         | `npm run preview`       |
| Deploy CLI   | `netlify deploy --prod` |
| Check status | `netlify status`        |
| View logs    | `netlify logs`          |
| Login        | `netlify login`         |

---

**Your platform is now deployed! 🚀✨**
