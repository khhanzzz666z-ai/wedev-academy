# 🎬 AI Multi-Mode Feature - Preview Guide

## What's Running Now

✅ **Frontend**: http://localhost:5173  
Status: **LIVE** 🟢

### Without Backend (Mock Mode)

Since Docker isn't installed, the app runs in **preview mode** without the backend API. Here's what you can see:

---

## 📱 Visual Tour

### 1. **Home Page / Dashboard**

- Welcome screen with learning platform branding
- Lesson list (HTML Dasar, CSS, JavaScript)
- Click on "HTML Dasar - Struktur HTML" to start

### 2. **Video Player Page**

What you'll see:

```
┌─────────────────────────────────────────┐
│   📺 Video Learning Area                │
│                                         │
│  [Gradient Background - Lesson Title]  │
│                                         │
│  Step: 1/5 - HTML Tags                 │
│  Progress: ▓▓▓░░░░░░░░ (30%)          │
├─────────────────────────────────────────┤
│ [View Code] [🤖 AI] [Fullscreen]       │
└─────────────────────────────────────────┘
```

### 3. **🤖 AI Button**

When you click the "🤖 AI" button:

```
╔══════════════════════════════════════════╗
║         🤖 Asisten AI                    ║  [X Tutup]
╠══════════════════════════════════════════╣
║                                          ║
║  📋 Ringkas | 💡 Jelaskan | ❓ Kuis    ║
║  ✏️ Latihan | 🗣️ Tanya                ║
║                                          ║
║  [Mode buttons - click to switch]        ║
║                                          ║
║  ┌──────────────────────────────────┐   ║
║  │ Loading: Memproses…              │   ║
║  │                                  │   ║
║  │ [Memuat respons AI]              │   ║
║  └──────────────────────────────────┘   ║
║                                          ║
║           [Mode Lain] (after response)   ║
║                                          ║
╚══════════════════════════════════════════╝
```

---

## 🎯 What to Test in Preview Mode

### UI Components ✅

#### 1. **AI Modal Opens**

- **Action**: Click "🤖 AI" button
- **Expected**: Modal appears with 5 mode buttons
- **Status**: ✅ Works in frontend

#### 2. **Mode Selection**

- **Action**: Click each of the 5 mode buttons:
  - 📋 Ringkas (Summarize)
  - 💡 Jelaskan (Explain)
  - ❓ Kuis (Quiz)
  - ✏️ Latihan (Practice)
  - 🗣️ Tanya (Ask)
- **Expected**: Button highlights in indigo/blue
- **Status**: ✅ Works in frontend

#### 3. **"Tanya" Mode Input**

- **Action**: Click "🗣️ Tanya" button
- **Expected**: Text input field appears with placeholder "Tanyakan sesuatu tentang pelajaran ini…"
- **Status**: ✅ Works in frontend
- **Note**: Input field won't submit (no backend), but you can see UI

#### 4. **Modal Close**

- **Action**: Click "Tutup" button
- **Expected**: Modal closes, states clear
- **Status**: ✅ Works in frontend

#### 5. **Responsive Design**

- **Action**: Resize browser window (F12 Dev Tools)
- **Expected**: Modal adapts to mobile, tablet, desktop
- **Status**: ✅ Works in frontend

#### 6. **Dark/Light Mode Toggle**

- **Action**: Look for theme toggle (if visible)
- **Expected**: Modal colors adapt
- **Status**: ✅ Works in frontend

---

## 🔧 Next Steps to Full Testing

To test **with backend AI responses**, you need:

### Option A: Install Docker Desktop

```bash
# Download from: https://www.docker.com/products/docker-desktop
# Install and restart

# Then run:
docker-compose up -d

# Frontend already running at http://localhost:5173
```

### Option B: Run Backend Locally (Node.js)

```bash
cd node-api
npm install
npm start
# Backend runs at http://localhost:4000
```

### Option C: Use Mock API (Simulate Backend)

Create a mock response system (see instructions below)

---

## 🧪 Mock API Testing

If you want to test the full flow **without backend**:

### Add Mock Responses to `src/api_node.js`

Currently the functions will fail. To see what happens, modify:

```javascript
// In src/api_node.js

export async function summarizeWithAI(
  text,
  intent = "summarize",
  language = "id"
) {
  // MOCK RESPONSE for preview:
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        summary: `📋 Mock Response (${intent} mode)\n\n• Point 1: HTML adalah struktur halaman\n• Point 2: Tags seperti <div>, <p>, <h1>\n• Point 3: Semantic HTML lebih baik\n• Point 4: Aksesibilitas penting`,
        tokensUsed: 150,
        model: "gpt-4o",
      });
    }, 2000);
  });
}

export async function askAI(question, context = "", language = "id") {
  // MOCK RESPONSE for preview:
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        answer: `🗣️ Mock Answer\n\nPertanyaan Anda: "${question}"\n\nJawaban: Berdasarkan konteks pelajaran, jawabannya adalah...`,
        tokensUsed: 100,
        model: "gpt-4o",
      });
    }, 1500);
  });
}
```

---

## 📊 Component Breakdown

### State Management

```
┌─ aiMode: "summarize" | "explain" | "quiz" | "practice" | "ask"
├─ aiLoading: true | false
├─ aiResponse: string | null
├─ aiQuestion: string
└─ aiModalOpen: true | false
```

### Handler Function

```javascript
handleAiModeRequest()
  ├─ Collects lesson text (title + subtitle + content + code)
  ├─ Calls appropriate API function based on aiMode
  ├─ Sets loading state
  └─ Updates response when complete
```

### Modal UI

```
Header
├─ Title: "🤖 Asisten AI"
└─ Close button

Mode Selector
├─ 5 mode buttons in grid
└─ Active mode highlighted

Conditional Content
├─ If "ask" mode: show input field
└─ If loading: show spinner text

Response Display
├─ Scrollable response area
└─ Pre-formatted text

Footer (if response)
└─ "Mode Lain" button to switch
```

---

## 🚀 Quick Checklist

### Frontend UI ✅

- [x] Modal opens/closes
- [x] 5 mode buttons display
- [x] Mode selection works (highlight changes)
- [x] "Tanya" mode shows input
- [x] Responsive on mobile/tablet/desktop
- [x] Dark mode compatible

### Backend Integration (Requires Docker)

- [ ] API endpoints respond
- [ ] Rate limiting works
- [ ] Token counting accurate
- [ ] Error handling graceful

### Performance (After Backend)

- [ ] First response < 10s
- [ ] Subsequent < 8s
- [ ] No UI freezing
- [ ] Memory stable

---

## 🎨 Visual Examples

### Summarize Response (Expected):

```
📋 Ringkasan HTML Dasar

• HTML adalah bahasa markup untuk struktur halaman web
• Tags seperti <h1>, <p>, <div>, <span> memiliki fungsi berbeda
• Semantic HTML menggunakan tags yang bermakna
• Aksesibilitas penting untuk screen reader
• Struktur yang baik membuat kode lebih maintainable
```

### Explain Response (Expected):

```
💡 Penjelasan Semantic HTML

Semantic HTML seperti menggunakan tanda baca yang tepat dalam
bahasa Indonesia. Misalnya:

❌ Salah: "semuanya pakai <div>"
✅ Benar: Gunakan <header>, <nav>, <main>, <article>

Keuntungan:
1. Kode lebih mudah dipahami
2. SEO lebih baik (search engine tahu struktur)
3. Screen reader bisa navigasi lebih baik
4. Maintainability meningkat
```

### Quiz Response (Expected):

```
❓ Kuis: Semantic HTML

Pertanyaan: Apa perbedaan <div> dan <section>?

A) <div> untuk styling, <section> untuk konten semantik
B) Tidak ada perbedaan, bisa saling mengganti
C) <section> hanya untuk article
D) <div> lebih powerful dari <section>

✅ Jawaban Benar: A
```

### Practice Response (Expected):

```
✏️ Latihan: Buat Form HTML

Level 1 (Mudah):
Buat form login dengan 2 input (email, password) dan tombol submit

Level 2 (Menengah):
Tambahkan validasi, error messages, dan styling

Level 3 (Sulit):
Buat form dengan conditional fields dan dynamic validation
```

### Ask Response (Expected):

```
🗣️ Jawaban

Anda bertanya: "Bagaimana cara membuat div responsif?"

Jawaban: Gunakan CSS media queries atau flexbox:

@media (max-width: 768px) {
  .container {
    display: flex;
    flex-direction: column;
  }
}

Konteks dari pelajaran: CSS Layout menggunakan Flexbox
dan Grid untuk responsiveness...
```

---

## 🐛 Troubleshooting

### Modal doesn't open?

- Check browser console (F12) for errors
- Verify button is visible in video controls

### Mode buttons not clickable?

- Check if modal is focused
- Try clicking directly on text/icon

### Input field not appearing in "Tanya" mode?

- Scroll down in modal if cut off
- Check responsive breakpoint (mobile/desktop)

### Dark mode colors off?

- Clear browser cache (Ctrl+Shift+Delete)
- Check `dark` prop in Tailwind CSS

---

## 📝 Notes

- **Current Date**: December 5, 2025
- **Framework**: React 19 + Vite 5.4.21
- **Styling**: Tailwind CSS 3 + Framer Motion
- **Backend Status**: Not running (Docker needed)
- **Frontend Status**: ✅ Running at http://localhost:5173

---

## Next: Full Integration Testing

Once you install Docker and run the backend, you can test:

1. AI responses with real OpenAI API
2. Rate limiting (10 requests/hour)
3. Database logging
4. Error handling
5. Performance metrics

**Ready to test?** 🚀
