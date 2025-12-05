# 🆘 Troubleshooting Guide

## 🔴 Masalah: Video/Pembelajaran tidak tampil

### Solusi Cepat:

```
1. Tekan Ctrl + Shift + R (Hard Refresh)
2. Buka DevTools (F12) > Application > Clear Storage
3. Tutup tab dan buka localhost:5173 lagi
```

### Jika masih tidak jalan:

```
1. Buka terminal di folder project
2. Jalankan: npm run dev
3. Tunggu sampai terlihat "VITE ready"
4. Buka browser ke http://localhost:5173
```

---

## 🔴 Masalah: Animasi terlihat lambat/lag

### Penyebab:

- Terlalu banyak tab browser terbuka
- Browser outdated
- GPU acceleration disabled

### Solusi:

```
1. Close tab yang tidak digunakan
2. Update browser ke versi terbaru
3. Restart server (Ctrl+C, lalu npm run dev)
4. Clear cache browser
```

### Check GPU acceleration:

```
Chrome: chrome://gpu
Firefox: about:support
```

---

## 🔴 Masalah: AI tidak responsif

### Cek 1: Internet Connection

```
ping google.com
```

### Cek 2: API Keys

Pastikan file `src/api_node.js` sudah punya API key yang valid

### Solusi:

```
1. Refresh halaman
2. Coba pertanyaan lain
3. Restart server
4. Check console (F12 > Console) untuk error messages
```

---

## 🔴 Masalah: Progress bar tidak muncul

### Solusi:

```
1. Ensure fullscreen mode OFF (F11 atau ESC)
2. Resize browser window
3. Clear localStorage: localStorage.clear()
4. Refresh halaman
```

---

## 🔴 Masalah: Kode tidak ditampilkan saat klik "Lihat Kode"

### Solusi:

```
1. Pastikan lesson yang dipilih punya code property
2. Refresh halaman
3. Coba lesson lain untuk verifikasi
4. Check console untuk error
```

---

## 🔴 Masalah: Theme toggle tidak bekerja

### Solusi:

```
1. Clear localStorage
2. Refresh halaman
3. Click theme button lagi
4. Should toggle dark/light mode
```

---

## 🔴 Masalah: "Expected corresponding JSX closing tag"

### Ini adalah error build, bukan error di browser!

Solusi:

```
1. Close browser tab
2. Di terminal: Ctrl+C (stop server)
3. Run: npm run dev lagi
4. Buka browser fresh
5. Jika masih error, restart VS Code
```

---

## ✅ Verifikasi Platform Berjalan

Mari cek apakah semuanya berjalan:

### Check 1: Server Running

```
Lihat di terminal:
✓ VITE v5.4.21 ready in XXXms
✓ Local: http://localhost:5173/
```

### Check 2: Browser Open

```
Navigate ke: http://localhost:5173
Should see: EnhancedVideoPlayer component
```

### Check 3: Lesson Load

```
- Klik salah satu lesson
- Should see: Title, Subtitle, Content, Key Points
- Should NOT see: "Poin 1, Poin 2, Poin 3"
```

### Check 4: Controls

```
- Play button: Should pause (if clicking again)
- Next button: Should go to next step
- Back button: Should go to previous step
- Progress bar: Should be visible
```

### Check 5: AI Modal

```
- Klik 🤖 AI button
- Select "Ringkas"
- Should see: AI response loading, then result
```

---

## 📊 Debug Checklist

- [ ] Terminal showing "VITE ready"
- [ ] Browser can access http://localhost:5173
- [ ] No errors in browser console (F12)
- [ ] Lesson content visible (no "Poin X" placeholders)
- [ ] Progress bar animates smoothly
- [ ] Play/Pause buttons work
- [ ] Next/Back navigation works
- [ ] Code display toggle works
- [ ] AI button opens modal
- [ ] Animations are smooth

---

## 🆘 Masalah Tidak Terdaftar?

### Step-by-step Debug:

1. **Open DevTools** (F12)
2. **Check Console tab** for red error messages
3. **Copy the error** message
4. **Check Network tab**:
   - Are API calls working?
   - Any 404 errors?
5. **Check Application tab**:
   - Is localStorage populated?
   - Is cache cleared?

### Common Error Messages:

**"Cannot read properties of undefined"**

- Lesson data not loaded
- Solution: Refresh page, clear cache

**"API Error: Invalid request"**

- AI API issue
- Solution: Check internet, restart server

**"Module not found"**

- Missing file import
- Solution: Restart server with npm run dev

---

## 🔄 Emergency Reset

Jika semua cara tidak berhasil:

```bash
# 1. Stop server (Ctrl+C)

# 2. Clear cache
rm -r node_modules package-lock.json

# 3. Reinstall
npm install

# 4. Start fresh
npm run dev

# 5. Open browser
http://localhost:5173
```

---

## 📞 Support Information

File dokumentasi yang bisa membantu:

- `START_HERE.md` - Panduan mulai
- `USER_GUIDE.md` - Panduan lengkap
- `FINAL_VERIFICATION.md` - Status verifikasi
- `TECHNICAL_VERIFICATION.md` - Detail teknis

---

**Saat yang tepat untuk membuka console (F12):**

- Saat ada error di layar
- Ketika fitur tidak bekerja
- Untuk check network requests
- Untuk inspect elements

**Shortcut Penting:**

- F12 = Open DevTools
- Ctrl+Shift+R = Hard Refresh
- Ctrl+C = Stop server
- npm run dev = Start server
