# 🚀 WebDev Academy - Quick Start Deployment

## 📋 Prasyarat

- GitHub account (free)
- Netlify account (free)

## 🔗 Step 1: Push ke GitHub

### 1a. Buat Repository di GitHub

1. Buka https://github.com/new
2. Nama: `webdev-academy`
3. Klik "Create repository"
4. Copy HTTPS URL (akan digunakan di step selanjutnya)

### 1b. Push Project ke GitHub

```powershell
cd "c:\Users\admin\Documents\webdev academy"
git remote add origin https://github.com/YOUR_USERNAME/webdev-academy.git
git branch -M main
git push -u origin main
```

Ganti `YOUR_USERNAME` dengan username GitHub Anda!

## 🌐 Step 2: Deploy ke Netlify

### Opsi A: Drag & Drop (Paling Mudah)

```powershell
# Build dulu
npm run build

# Folder dist sudah siap
# Buka https://app.netlify.com (login/daftar gratis)
# Drag & drop folder dist ke halaman Netlify
# Selesai! 🎉
```

### Opsi B: Auto Deploy dari GitHub (Recommended)

1. Buka https://app.netlify.com
2. Klik "New site from Git"
3. Pilih GitHub → Authorize
4. Pilih repository `webdev-academy`
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Klik "Deploy site"

Site Anda akan live dalam 1-2 menit!

**URL akan seperti:** `https://your-random-name.netlify.app`

### Opsi C: Netlify CLI (Advanced)

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

## ✨ Hasil Akhir

✅ Animasi floating di login page  
✅ Dark/Light mode toggle  
✅ Chatbot interaktif  
✅ Authentication system  
✅ Live di internet! 🌍

## 📊 Dashboard Links

- **GitHub:** https://github.com/YOUR_USERNAME/webdev-academy
- **Netlify:** https://app.netlify.com/sites/
- **Live Site:** https://your-domain.netlify.app

## 🔄 Continuous Deployment

Setelah setup GitHub + Netlify:

1. Buat perubahan di code lokal
2. `git add .` dan `git commit -m "message"`
3. `git push`
4. Netlify otomatis build & deploy! 🚀

## 💡 Tips

- **Gratis selamanya** (Netlify free tier generous)
- **Custom domain:** Tambahkan di Netlify settings
- **SSL certificate:** Otomatis include
- **Analytics:** Tersedia di Netlify dashboard

---

**Selamat! Website Anda sudah live di internet! 🎉**

Untuk bantuan lebih lanjut:

- Netlify Docs: https://docs.netlify.com
- GitHub Help: https://docs.github.com
