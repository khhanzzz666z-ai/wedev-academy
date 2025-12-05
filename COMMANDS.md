# ⚡ Quick Command Reference

## 🚀 Perintah Paling Penting

### Start Development Server

```bash
npm run dev
```

**Output yang diharapkan:**

```
VITE v5.4.21 ready in 2672 ms
Local: http://localhost:5173/
```

### Buka Browser

```
http://localhost:5173
```

---

## 🔧 Development Commands

### Install Dependencies

```bash
npm install
```

### Run Dev Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Linter

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

---

## 🆘 Troubleshooting Commands

### Hard Refresh Browser

```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Clear Browser Cache

```
Ctrl + Shift + Delete (Windows/Linux)
Cmd + Shift + Delete (Mac)
```

### Stop Server

```
Ctrl + C (dalam terminal)
```

### Clear Node Modules (Nuclear Option)

```bash
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Clear LocalStorage (Browser)

```javascript
// Di console (F12):
localStorage.clear();
```

---

## 📂 File Navigation

### Edit Main Component

```bash
# Open file:
code src/EnhancedVideoPlayer.jsx
```

### Edit Lesson Database

```bash
# Open file:
code src/database.js
```

### Edit Styling

```bash
# Open file:
code src/index.css
```

### View Documentation

```bash
# Open file:
code START_HERE.md
```

---

## 🔍 Search Commands

### Find Text in Files

```bash
# Search for "lesson-1-1":
grep -r "lesson-1-1" src/

# Windows:
findstr /R "lesson-1-1" src\*.jsx
```

### List Project Files

```bash
# List all JavaScript files:
ls -R src/*.jsx

# Windows:
Get-ChildItem -Path src -Filter "*.jsx" -Recurse
```

---

## 📊 Project Info

### Check Node Version

```bash
node --version
```

### Check NPM Version

```bash
npm --version
```

### List Installed Packages

```bash
npm list
```

### Check Outdated Packages

```bash
npm outdated
```

---

## 🚀 Deployment Commands

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

---

## 📝 Common Workflows

### Daily Development

```bash
# 1. Start server
npm run dev

# 2. Open browser
# http://localhost:5173

# 3. Make changes (auto-reload)

# 4. When done, Ctrl+C to stop
```

### Before Pushing to Git

```bash
# 1. Run linter
npm run lint

# 2. Format code
npm run format

# 3. Test build
npm run build

# 4. Preview
npm run preview

# 5. Commit changes
git add .
git commit -m "your message"
```

### Deploying to Production

```bash
# 1. Build optimized version
npm run build

# 2. Test production build
npm run preview

# 3. If OK, deploy to hosting
# (Netlify, Vercel, etc.)
```

---

## 🎯 Most Used Commands (Cheatsheet)

| Aksi          | Command                 |
| ------------- | ----------------------- |
| Start dev     | `npm run dev`           |
| Build         | `npm run build`         |
| Preview       | `npm run preview`       |
| Install       | `npm install`           |
| Update        | `npm update`            |
| Lint          | `npm run lint`          |
| Format        | `npm run format`        |
| Stop          | `Ctrl + C`              |
| Hard refresh  | `Ctrl + Shift + R`      |
| Clear cache   | `Ctrl + Shift + Delete` |
| Open DevTools | `F12`                   |
| Console       | `F12` then Console tab  |

---

## 🔗 Useful URLs

### Development

- Local: `http://localhost:5173`
- DevTools: `F12`
- Console: `F12` > Console

### Online Resources

- React Docs: `https://react.dev`
- Vite Docs: `https://vitejs.dev`
- Tailwind Docs: `https://tailwindcss.com`
- Framer Motion: `https://framer.com/motion`

---

## 💡 Pro Tips

### Auto-format on Save

In VS Code `settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### Hot Module Replacement (HMR)

Vite automatically reloads:

- Component changes
- Styling changes
- State preserved during reload

### Browser DevTools Shortcuts

```
F12 - Open/Close DevTools
Ctrl+Shift+J - Console
Ctrl+Shift+K - DevTools search
Ctrl+Shift+C - Inspect element
```

### Git Commands

```bash
# Initialize (one time)
git init

# Stage changes
git add .

# Commit
git commit -m "message"

# Push
git push origin main

# Pull
git pull
```

---

## 🆘 Emergency Commands

### Reset Everything

```bash
# Remove and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Kill Port (if already in use)

```bash
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5173
kill -9 <PID>
```

### Clear All Caches

```bash
# npm cache
npm cache clean --force

# Vite cache
rm -rf .vite

# Browser storage
# Use: localStorage.clear() in console
```

---

## 📞 Help Commands

### Get npm Help

```bash
npm help
```

### Get Vite Help

```bash
npx vite --help
```

### Check npm Package Info

```bash
npm info react
```

### View package.json

```bash
cat package.json
```

---

## ✅ Checklist: First Time Setup

```
[ ] Node.js installed (check: node --version)
[ ] npm installed (check: npm --version)
[ ] Project folder created
[ ] npm install executed
[ ] npm run dev started successfully
[ ] Browser opened to localhost:5173
[ ] Content visible in browser
[ ] No console errors (F12)
[ ] Can navigate through lessons
[ ] Progress bar works
[ ] AI button functional
```

---

## 🎯 Workflow Command Combinations

### Complete Dev Session

```bash
# Start
npm run dev

# ... make changes ...

# When done
# Ctrl + C
npm run build
npm run preview
```

### Pre-Deployment

```bash
npm run lint
npm run build
npm run preview
# If OK:
npm run deploy
```

### Clean State

```bash
npm run lint --fix
npm run format
npm run build
```

---

**Most important: `npm run dev` then `http://localhost:5173` ✨**
