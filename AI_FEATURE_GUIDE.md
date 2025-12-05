# 🤖 Panduan Fitur AI Multi-Mode

## Ringkasan

Fitur AI yang telah diimplementasikan mendukung **5 mode pembelajaran berbeda** yang memberikan pengalaman belajar yang disesuaikan dengan kebutuhan siswa. Fitur ini telah diintegrasikan secara penuh dari backend hingga frontend.

---

## 5 Mode AI

### 1. 📋 **Ringkas (Summarize)**

- **Tujuan**: Merangkum konten pelajaran dalam bentuk ringkas dan mudah dicerna
- **Format Respons**: Bullet points yang jelas
- **Contoh**: Merangkum topik HTML menjadi poin-poin penting
- **Trigger**: Klik tombol "🤖 AI" → Pilih "📋 Ringkas"

### 2. 💡 **Jelaskan (Explain)**

- **Tujuan**: Menjelaskan konsep sulit dengan cara yang mudah dipahami
- **Teknik**: Menggunakan analogi dan contoh nyata
- **Contoh**: Menjelaskan mengapa semantic HTML penting dengan analogi
- **Trigger**: Klik tombol "🤖 AI" → Pilih "💡 Jelaskan"

### 3. ❓ **Kuis (Quiz)**

- **Tujuan**: Menguji pemahaman mendalam, bukan hanya hafalan
- **Format Respons**: Pertanyaan dengan 4 pilihan jawaban + jawaban benar
- **Contoh**: "Apa perbedaan antara `<div>` dan `<section>`?"
- **Trigger**: Klik tombol "🤖 AI" → Pilih "❓ Kuis"

### 4. ✏️ **Latihan (Practice)**

- **Tujuan**: Memberikan latihan coding yang progressif
- **Pendekatan**: Dari mudah ke sulit, dengan hints
- **Contoh**: "Buat form HTML dengan validasi sederhana"
- **Trigger**: Klik tombol "🤖 AI" → Pilih "✏️ Latihan"

### 5. 🗣️ **Tanya (Ask)**

- **Tujuan**: Menjawab pertanyaan spesifik siswa tentang pelajaran
- **Konteks**: Mengetahui konteks materi saat ini
- **Contoh**: "Bagaimana cara membuat div responsif?"
- **Input**: Siswa mengetik pertanyaan mereka
- **Trigger**: Klik tombol "🤖 AI" → Pilih "🗣️ Tanya" → Ketik pertanyaan → Kirim

---

## Arsitektur Implementasi

### Frontend (`src/EnhancedVideoPlayer.jsx`)

```
┌─────────────────────────────────────┐
│      EnhancedVideoPlayer Component   │
├─────────────────────────────────────┤
│  State:                             │
│  - aiMode: "summarize"|"explain"|   │
│            "quiz"|"practice"|"ask"  │
│  - aiLoading: boolean               │
│  - aiResponse: string               │
│  - aiQuestion: string               │
│  - aiModalOpen: boolean             │
├─────────────────────────────────────┤
│  Handler:                           │
│  - handleAiModeRequest()            │
│    ↓ Calls api_node.js functions   │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│        API Helper (api_node.js)     │
├─────────────────────────────────────┤
│  - summarizeWithAI(text, intent)   │
│  - askAI(question, context)        │
│  - explainConcept(text)            │
│  - generateQuiz(text)              │
│  - generatePractice(text)          │
└─────────────────────────────────────┘
         ↓ (HTTP POST)
┌─────────────────────────────────────┐
│        Node.js/Express Backend      │
├─────────────────────────────────────┤
│  POST /api/ai/summarize             │
│  POST /api/ai/ask                   │
│  ↓                                  │
│  aiController.js                    │
│  - getSystemPrompt(intent, lang)    │
│  - summarize(req, res)              │
│  - ask(req, res)                    │
└─────────────────────────────────────┘
         ↓ (HTTP POST)
┌─────────────────────────────────────┐
│        OpenAI API                   │
│        /v1/chat/completions         │
├─────────────────────────────────────┤
│  System Prompt (Context-specific)   │
│  User Message (Lesson content/Q)    │
│  ↓                                  │
│  AI Response (Contextual answer)    │
└─────────────────────────────────────┘
```

### Backend (`node-api/src/controllers/aiController.js`)

**System Prompts** (Contextual untuk setiap intent):

| Intent        | Indonesian                                      | English                                         |
| ------------- | ----------------------------------------------- | ----------------------------------------------- |
| **summarize** | Merangkum konten pelajaran ringkas & menarik    | Summarize content concisely & engagingly        |
| **explain**   | Tutor yang jelaskan konsep sulit mudah dipahami | Tutor explains difficult concepts easily        |
| **quiz**      | Pembuat kuis untuk uji pemahaman mendalam       | Quiz creator for deep understanding             |
| **practice**  | Asisten praktik coding progressif mudah→sulit   | Coding practice assistant progressive easy→hard |
| **clarify**   | Menjawab pertanyaan pelajar jelas & singkat     | Answer student questions clearly & concisely    |

---

## Cara Penggunaan

### Flow Umum:

1. **Buka Pelajaran** → Pilih lesson di dashboard
2. **Buka AI Modal** → Klik tombol "🤖 AI" di video player
3. **Pilih Mode** → Klik salah satu dari 5 tombol mode
4. **Tunggu Respon** → AI memproses (2-10 detik)
5. **Lihat Hasil** → Baca respons contextual

### Contoh Penggunaan:

#### Mode "Ringkas":

```
Siswa: Klik 📋 Ringkas
AI: ✅ Merangkum HTML tags, structure, semantic HTML
Hasil: 5 bullet points penting yang ringkas
```

#### Mode "Jelaskan":

```
Siswa: Klik 💡 Jelaskan
AI: ✅ Menjelaskan semantic HTML dengan analogi
Hasil: "Semantic HTML seperti penggunaan tanda baca yang tepat..."
```

#### Mode "Tanya":

```
Siswa: Klik 🗣️ Tanya
Siswa: Ketik "Apa perbedaan <div> dan <span>?"
AI: ✅ Menjawab dengan konteks pelajaran saat ini
Hasil: "Perbedaan utama adalah..."
```

---

## Environment Variables (Backend)

File: `node-api/.env`

```env
# OpenAI Configuration
AI_API_KEY=sk-...               # OpenAI API key
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-4o                 # Model yang digunakan
```

---

## API Endpoints

### POST `/api/ai/summarize`

**Request:**

```json
{
  "text": "HTML content atau lesson content",
  "intent": "summarize|explain|quiz|practice|clarify",
  "language": "id|en"
}
```

**Response:**

```json
{
  "summary": "Respons AI contextual...",
  "tokensUsed": 150,
  "model": "gpt-4o"
}
```

### POST `/api/ai/ask`

**Request:**

```json
{
  "question": "Bagaimana cara membuat div responsif?",
  "context": "Lesson content untuk context...",
  "language": "id|en"
}
```

**Response:**

```json
{
  "answer": "Jawaban contextual terhadap pertanyaan...",
  "tokensUsed": 200,
  "model": "gpt-4o"
}
```

---

## Testing Lokal

### 1. Start Development Stack:

```bash
cd node-api
docker-compose up -d
```

### 2. Start Frontend:

```bash
cd ..
npm run dev
# Akses: http://localhost:5173
```

### 3. Test AI Features:

- Login ke dashboard
- Pilih "HTML Dasar - Struktur HTML"
- Klik tombol "🤖 AI"
- Test semua 5 mode

### Troubleshooting:

```bash
# Check backend logs:
docker logs webdev-academy-api

# Check OpenAI connection:
curl -X POST http://localhost:4000/api/ai/summarize \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"text":"Test HTML","intent":"summarize","language":"id"}'
```

---

## Fitur Advanced

### 1. Token Usage Tracking

Setiap respons mencatat token yang digunakan untuk monitoring biaya OpenAI.

### 2. Language Support

- Indonesian (`id`) - Default
- English (`en`) - Untuk pelajar bahasa inggris

### 3. Rate Limiting

- **AI Requests**: 10 per jam per user
- Prevent abuse dan manage biaya OpenAI

### 4. Error Handling

Jika AI tidak tersedia:

- Graceful error message untuk siswa
- Logging backend untuk debugging
- Fallback ke konten static jika perlu

---

## Improvements untuk Masa Depan

1. **Caching Responses** - Cache respons untuk pertanyaan yang sama
2. **Streaming Responses** - Stream respons real-time untuk UX lebih baik
3. **Custom Intents** - Allow users define custom AI intents
4. **Feedback Loop** - Rate respons untuk improve future answers
5. **Multi-language Full** - Support 10+ bahasa
6. **Voice Integration** - Text-to-speech untuk respons
7. **Analytics** - Track which AI modes paling berguna

---

## Kesimpulan

Fitur AI Multi-Mode memberikan:

- ✅ **5 cara berbeda** untuk belajar
- ✅ **Context-aware** responses dari AI
- ✅ **Language flexible** (ID/EN)
- ✅ **Rate limited** untuk sustainability
- ✅ **Production-ready** dengan error handling

Siswa sekarang dapat belajar sesuai gaya mereka masing-masing! 🚀
