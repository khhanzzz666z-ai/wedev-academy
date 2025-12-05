# 📚 WebDev Academy - Website Pages Documentation

## Halaman-Halaman Website

### 1. **Homepage (App.jsx - route: "home")**

**Apa yang ditampilkan:**

- Header dengan logo, navigation, theme toggle, login button
- Hero section dengan tagline "WebDev Academy — Belajar Coding dengan cepat"
- Call-to-action buttons "Mulai Belajar" dan "Lihat Fitur"
- Animated floating illustration

**Fitur:**

- ✅ Dark/Light mode
- ✅ Navigation bar responsif
- ✅ User profile display (jika sudah login)
- ✅ Animated elements dengan Framer Motion

---

### 2. **Courses Page (route: "courses")**

**Apa yang ditampilkan:**

- Grid 4 kursus tersedia:
  1. Frontend Mastery (48 jam)
  2. Backend & API (40 jam)
  3. Fullstack Project (60 jam)
  4. DevOps Essentials (18 jam)

**Fitur:**

- ✅ Course cards dengan rating, durasi, deskripsi
- ✅ Badge "✓ Terdaftar" untuk kursus yang sudah diambil
- ✅ Status tampilan berbeda untuk enrolled vs not enrolled
- ✅ Tombol "Buka" atau "Lanjutkan" tergantung enrollment status
- ✅ Responsive grid (1 kolom mobile, 2 tablet, 4 desktop)

---

### 3. **Course Detail Page (route: "course")**

**Apa yang ditampilkan:**

- Judul kursus dan badge level, jam, rating
- Deskripsi lengkap dan "Yang akan Anda Pelajari"
- Sidebar sticky dengan harga, fitur-fitur, dan tombol enroll
- Info: akses seumur hidup, download materi, komunitas, garansi uang kembali

**Fitur:**

- ✅ Layout responsive 2/3 konten + 1/3 sidebar
- ✅ Animated floating sidebar
- ✅ Tombol "Mulai Belajar Sekarang" atau "Mulai Gratis"
- ✅ Back button untuk kembali ke courses

---

### 4. **Course Learning Page (CourseLearningPage.jsx - route: "course-learn")**

**Apa yang ditampilkan:**

- Sidebar kiri: daftar lessons dengan progress
- Main area: video player, lesson content, progress bar
- Tombol "Mark as Complete" untuk setiap lesson

**Fitur:**

- ✅ Lesson progress tracking
- ✅ Mark lesson as completed
- ✅ Video player placeholder
- ✅ Lesson navigation

---

### 5. **User Dashboard (UserDashboard.jsx - route: "dashboard")**

**Apa yang ditampilkan:**

- Greeting message dengan nama user
- Trial status (jika masih aktif)
- Stats: Total Kursus, Lessons Diselesaikan, Jam Belajar, Streak
- Daftar kursus yang diikuti dengan progress bar
- Section Pencapaian (Achievements)
- Tombol Logout

**Fitur:**

- ✅ Real-time stats calculation
- ✅ Trial countdown dengan warning jika sisa < 2 hari
- ✅ Progress visualization dengan animated progress bars
- ✅ Achievement badges (locked/unlocked)
- ✅ Click course untuk lanjutkan belajar

---

### 6. **Authentication Page (AuthComponent.jsx - route: "auth")**

**Apa yang ditampilkan:**

- Login form (email, password)
- Register form (nama, email, password, confirm password)
- OAuth options: Google & GitHub login
- Email verification step
- Trial auto-enrollment (7 hari gratis)

**Fitur:**

- ✅ Toggle antara Login/Register mode
- ✅ Email validation
- ✅ Password strength check (min 6 karakter)
- ✅ OAuth flow dengan email input modal
- ✅ Verification code validation
- ✅ Floating animated background elements

---

### 7. **Modules Page (route: "modules")**

**Apa yang ditampilkan:**

- Grid 6 modul pembelajaran:
  - HTML & CSS Dasar
  - JavaScript Modern
  - Frontend Framework (React)
  - Backend & API
  - Database
  - Deployment

**Fitur:**

- ✅ Card design dengan animasi scroll
- ✅ Short descriptions
- ✅ Responsive grid (1 mobile, 3 desktop)

---

### 8. **Features Page (route: "features")**

**Apa yang ditampilkan:**

- 3 main features:
  1. Mentor Berpengalaman (sesi live, code review, feedback)
  2. Proyek Nyata (real-world projects untuk portfolio)
  3. Komunitas (Discord, pairing, job board)

**Fitur:**

- ✅ Feature cards dengan descriptions
- ✅ Value propositions

---

### 9. **Admin Panel (AdminLoginPage.jsx - route: "admin")**

**Apa yang ditampilkan:**

- Admin login form
- Admin-only features (untuk management)

**Fitur:**

- ✅ Admin authentication
- ✅ Protected route

---

### 10. **ChatBot Bubble (ChatBotBubble Component)**

**Apa yang ditampilkan:**

- Floating chat button (fixed position bottom-right)
- WhatsApp link button
- Chat dialog dengan pesan-pesan

**Fitur:**

- ✅ Local Q&A responses (React, CSS, Backend, Deployment)
- ✅ Floating animations
- ✅ Message history
- ✅ Quick reply buttons
- ✅ Close buttons
- ✅ Loading indicator

---

## 🔄 Navigation Routes

```
home
├── courses (tampilkan semua kursus)
├── modules (modul pembelajaran)
├── features (fitur-fitur)
├── auth (login/register)
├── dashboard (user profile & progress - protected)
├── course (detail kursus)
└── course-learn (halaman belajar - protected)

admin (admin login)
```

---

## 📱 Responsive Design

Semua halaman mendukung:

- ✅ Mobile (1 kolom, touch-friendly)
- ✅ Tablet (2-3 kolom)
- ✅ Desktop (full layout)

---

## 🎨 Design System

**Colors:**

- Primary: Indigo (`#4f46e5`)
- Secondary: Fuchsia (`#ec4899`)
- Dark: Slate 900 (`#0f172a`)

**Typography:**

- Heading: Bold, Large
- Body: Regular, Medium
- Meta: Small, Gray

**Components:**

- Motion animations dari Framer Motion
- Glass-morphism with backdrop blur
- Gradient overlays

---

## 🚀 Fitur-Fitur Utama

✅ Dark/Light Mode Toggle
✅ User Authentication (Email + OAuth)
✅ Course Enrollment & Progress Tracking
✅ Trial System (7 hari gratis)
✅ ChatBot Assistant
✅ Responsive Design
✅ Animated UI Elements
✅ Real-time Stats Dashboard
✅ Lesson Management
✅ Achievement System

---

## 📝 Update Terbaru

1. **Course Page Enhancement**

   - Tambah rating & jumlah siswa
   - Better enrollment status visual
   - Improved card hover states

2. **Course Detail Page**

   - Layout 2-column (content + sidebar)
   - "Yang akan Anda Pelajari" section
   - Feature list (akses seumur hidup, download, dll)
   - Sticky sidebar untuk better UX

3. **New User Dashboard**

   - Stats cards (total courses, lessons, hours, streak)
   - Enrolled courses dengan progress
   - Achievement badges
   - Trial status warning

4. **Better Navigation**
   - Dashboard link di header
   - Improved mobile menu
   - User profile click untuk dashboard

---

## 🔗 API Integration Ready

Semua halaman siap untuk diintegrasikan dengan backend API:

- `/api/auth` - Authentication
- `/api/courses` - Course management
- `/api/enrollments` - Enrollment tracking
- `/api/health` - Server status

Saat ini menggunakan localStorage untuk development. Tinggal ganti dengan API calls ke backend server.
