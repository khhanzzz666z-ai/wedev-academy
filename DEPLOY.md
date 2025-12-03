# Deploy Guide - WebDev Academy

## Deploy ke Netlify (Recommended)

### Opsi 1: Manual Deploy (Drag & Drop)

1. **Build Proyek**

   ```bash
   npm run build
   ```

2. **Buka Netlify**

   - Buka https://app.netlify.com
   - Login atau daftar akun gratis

3. **Deploy Folder `dist`**
   - Drag & drop folder `dist` ke Netlify
   - Website akan live dalam hitungan detik
   - Dapatkan URL seperti: `https://your-site.netlify.app`

### Opsi 2: Deploy dari GitHub (Recommended untuk Production)

1. **Push ke GitHub**

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/webdev-academy.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect GitHub ke Netlify**

   - Login ke https://app.netlify.com
   - Klik "New site from Git"
   - Pilih GitHub dan authorize
   - Pilih repository `webdev-academy`
   - Click "Deploy"

3. **Automatic Deployment**
   - Setiap kali push ke GitHub, Netlify otomatis build & deploy
   - Build status & preview links tersedia

### Opsi 3: Netlify CLI

1. **Install Netlify CLI**

   ```bash
   npm install -g netlify-cli
   ```

2. **Login ke Netlify**

   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

## Deploy ke Vercel

1. **Push ke GitHub** (jika belum)

2. **Buka Vercel**

   - https://vercel.com
   - Klik "Import Project"
   - Pilih GitHub repository
   - Click "Deploy"

3. **Auto-deploy**
   - Setiap push ke main, Vercel otomatis deploy

## Environment Variables (jika ada API)

Untuk menambah environment variables:

**Netlify:**

- Site Settings → Build & Deploy → Environment → Add Variable

**Vercel:**

- Settings → Environment Variables → Add

## Monitoring & Logs

**Netlify:**

- Deploys tab → lihat history
- Logs → error tracking

**Vercel:**

- Deployments → lihat status
- Real-time logs

## Custom Domain

Keduanya support custom domain:

1. Beli domain (Namecheap, GoDaddy, dll)
2. Update nameserver atau DNS records
3. Setup di Netlify/Vercel dashboard

## Performance Tips

- ✅ Build sudah optimized dengan Vite
- ✅ CSS minified dengan Tailwind
- ✅ JavaScript bundled dengan esbuild
- ✅ Images bisa dioptimize lebih lanjut

## Troubleshooting

**Build gagal?**

- Check build logs di Netlify/Vercel
- Pastikan `npm run build` berjalan lokal
- Clear cache dan rebuild

**Static files 404?**

- Check `netlify.toml` sudah ada redirect rule
- Folder `dist` harus publish folder

**Animasi lag?**

- Check browser performance
- Reduce blur-3xl atau animasi kompleks jika perlu

---

**Pilihan Terbaik:** GitHub + Netlify/Vercel = Automatic Deployment ✨
