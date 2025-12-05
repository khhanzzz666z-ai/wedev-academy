# 🎯 WebDev Academy - Halaman-Halaman Website

## 📊 Struktur Halaman dan Fitur

```
┌─────────────────────────────────────────────────────────────┐
│                    WEBDEV ACADEMY                           │
│  [Logo] [Home] [Kursus] [Modul] [Fitur] [👤] [🌙] [Login]  │
└─────────────────────────────────────────────────────────────┘

1. HOME PAGE (Landing Page)
   ├─ Hero Section
   │  ├─ Heading: "WebDev Academy — Belajar Coding dengan cepat"
   │  ├─ Subheading: "Kursus interaktif, modul efisien, proyek nyata"
   │  └─ CTA Buttons: [Mulai Belajar] [Lihat Fitur]
   ├─ Animated Floating Illustration
   └─ Dark/Light Mode Toggle

2. COURSES PAGE
   ├─ Title: "Daftar Kursus"
   ├─ Subtitle: "Pilih kursus untuk mulai belajar..."
   └─ Course Grid (4 cards):
      ├─ Frontend Mastery (48h) ⭐4.8
      ├─ Backend & API (40h) ⭐4.8
      ├─ Fullstack Project (60h) ⭐4.8
      └─ DevOps Essentials (18h) ⭐4.8

      Setiap Card:
      ├─ Title, Level, Duration
      ├─ Description
      ├─ Rating & Student Count
      ├─ Status Badge (Terdaftar/Belum)
      └─ Button: [Buka] atau [Lanjutkan]

3. COURSE DETAIL PAGE
   ├─ [← Kembali] link
   ├─ Main Content (2/3 width)
   │  ├─ Title + Badges (Level, Hours, Rating)
   │  ├─ Full Description
   │  └─ "Yang akan Anda Pelajari"
   │     ├─ ✓ Konsep fundamental
   │     ├─ ✓ Best practices industri
   │     ├─ ✓ Project-based learning
   │     ├─ ✓ Code review dari mentor
   │     ├─ ✓ Debugging techniques
   │     └─ ✓ Sertifikat
   │
   └─ Sidebar (1/3 width) - STICKY
      ├─ Price: "Rp 499.000" atau "Terdaftar"
      ├─ Tagline: "Atau coba 7 hari gratis"
      ├─ [Mulai Belajar Sekarang] button
      ├─ [Kembali] button
      └─ Features:
         ├─ ✓ Akses seumur hidup
         ├─ ✓ Download materi & sertifikat
         ├─ ✓ Akses komunitas
         └─ ✓ 30 hari garansi uang kembali

4. COURSE LEARNING PAGE
   ├─ Sidebar (Left)
   │  └─ Lessons List:
   │     ├─ Lesson 1: Introduction HTML ▶ [50min]
   │     ├─ Lesson 2: CSS Styling ▶ [60min]
   │     ├─ Lesson 3: JavaScript ▶ [90min]
   │     └─ Lesson 4: React Intro ▶ [75min]
   │
   ├─ Main Content (Right)
   │  ├─ Video Player
   │  ├─ Lesson Title
   │  ├─ Lesson Content/Description
   │  ├─ Code Examples
   │  └─ [Mark as Complete] button
   │
   └─ Progress Bar (Top)
      └─ 2 of 4 lessons completed (50%)

5. USER DASHBOARD (NEW!)
   ├─ Header: "Dashboard Pembelajaran"
   │  └─ "Selamat datang kembali, [Nama User]!"
   │
   ├─ Trial Status (if active)
   │  ├─ "Trial Gratis Aktif"
   │  ├─ "[X] hari tersisa sebelum membership berakhir"
   │  └─ [Upgrade Sekarang] button
   │
   ├─ Stats Grid (4 cards)
   │  ├─ 📚 Total Kursus: [X]
   │  ├─ ✓ Lessons Diselesaikan: [X]
   │  ├─ ⏱️ Jam Belajar: [X]
   │  └─ 🔥 Streak: [X]d
   │
   ├─ Enrolled Courses Section
   │  └─ Course Cards with:
   │     ├─ Title
   │     ├─ Progress: [50%]
   │     ├─ "[X]/[Y] lesson selesai"
   │     └─ Animated Progress Bar
   │
   ├─ Achievements Section
   │  ├─ 🌱 Pemula (Unlocked)
   │  ├─ 🔥 7 Hari Konsisten (Unlocked)
   │  ├─ ⭐ Intermediate Dev (Locked)
   │  └─ 👑 Master Dev (Locked)
   │
   └─ [Logout] button

6. AUTHENTICATION PAGE
   ├─ Toggle: Login | Register
   ├─ Form Fields:
   │  ├─ Email (validated)
   │  ├─ Password (min 6 chars)
   │  ├─ Confirm Password (register only)
   │  └─ Full Name (register only)
   │
   ├─ OAuth Options:
   │  ├─ [Sign in with Google]
   │  └─ [Sign in with GitHub]
   │
   ├─ Email Verification (after register)
   │  └─ Verification code input
   │
   └─ Trial Auto-enrollment
      └─ 7 hari gratis akses penuh

7. MODULES PAGE
   ├─ Title: "Modul Pembelajaran Efisien"
   └─ Grid (6 cards):
      ├─ HTML & CSS Dasar
      ├─ JavaScript Modern
      ├─ Frontend Framework (React)
      ├─ Backend & API
      ├─ Database
      └─ Deployment

8. FEATURES PAGE
   ├─ Title: "Kenapa Pilih WebDev Academy?"
   └─ Features (3 cards):
      ├─ 👨‍🏫 Mentor Berpengalaman
      │  └─ Sesi live, code review, feedback langsung
      ├─ 🚀 Proyek Nyata
      │  └─ Bangun produk riil untuk portfolio
      └─ 👥 Komunitas
         └─ Discord, pairing, job board

9. FLOATING CHATBOT BUBBLE
   ├─ Fixed Position (Bottom Right)
   ├─ WhatsApp Button (w/ close)
   ├─ Chat Button
   └─ Chat Dialog:
      ├─ Header: "WebDev Assistant"
      ├─ Quick Replies:
      │  ├─ "Bagaimana memulai React?"
      │  ├─ "Rekomendasi kursus frontend"
      │  └─ "Cara deploy ke Vercel"
      ├─ Messages Area
      │  ├─ User messages (right, blue)
      │  └─ Bot messages (left, gray)
      └─ Input: [Tanyakan sesuatu...] [Kirim]

10. ADMIN PANEL
    ├─ Login Form (protected)
    ├─ Admin Dashboard
    └─ Management Features
```

---

## 🎨 Visual Design Elements

**Color Scheme:**

- Primary Purple: `#4f46e5` (Indigo)
- Secondary Pink: `#ec4899` (Fuchsia)
- Dark Background: `#0f172a` (Slate 900)
- Light Text: `#e2e8f0` (Slate 100)

**Typography:**

- Headings: Bold, 24-64px
- Body: Regular, 14-16px
- Meta: Small, 12px, Gray

**Components:**

- Cards: Glass-morphism with blur
- Buttons: Gradient or outlined
- Inputs: Transparent with border
- Animations: Smooth Framer Motion

---

## 🔐 Protected Routes

Routes yang memerlukan login:

- ✅ `/dashboard` - User harus login
- ✅ `/course-learn` - User harus enrolled

---

## 📱 Responsive Breakpoints

- **Mobile** (<768px): 1 column, stack vertically
- **Tablet** (768px-1024px): 2 columns
- **Desktop** (>1024px): Full layout

---

## ⚡ Key Features

✅ **Enrollment Status Tracking**

- Visual indicator untuk kursus yang sudah diambil

✅ **Progress Visualization**

- Animated progress bars
- Lesson completion tracking

✅ **Trial System**

- Auto 7 hari gratis untuk new users
- Countdown warning
- Upgrade prompts

✅ **Achievements**

- Badges untuk milestone
- Locked/Unlocked system

✅ **ChatBot Assistant**

- Local Q&A
- Quick replies
- Professional chat UI

✅ **Dark/Light Mode**

- Toggle di navbar
- Persisted preference

✅ **OAuth Integration**

- Google Sign-in
- GitHub Sign-in
- Email verification modal

---

## 📈 User Journey

```
New Visitor
    ↓
Home → Courses → Course Detail → [Login if needed]
    ↓
Auth Component → Email Verification → Trial Active
    ↓
Dashboard → Enroll Course → Course Learning
    ↓
Complete Lessons → Achievements → Continue Learning
```

---

## 🚀 Next Steps

1. **Integrate Backend API**

   - Replace localStorage dengan API calls
   - Connect to `/api/auth`, `/api/courses`, `/api/enrollments`

2. **Add Payment Integration**

   - Stripe/PayPal untuk premium courses
   - Invoice generation

3. **Video Hosting**

   - Integrate dengan YouTube/Vimeo
   - Video CDN setup

4. **Database Sync**

   - Use backend API instead of localStorage
   - Real-time progress sync

5. **Mobile App**
   - React Native version
   - Offline mode support

---

Generated: December 4, 2025
Last Updated: App.jsx, UserDashboard.jsx, PAGES_DOCUMENTATION.md
