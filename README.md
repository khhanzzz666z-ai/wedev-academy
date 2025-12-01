# WebDev Academy

Platform pembelajaran web development modern dengan fitur interaktif, dark mode, dan chatbot AI.

## Fitur Utama

- **Dark/Light Mode** - Toggle tema gelap dan terang
- **ChatBot Interaktif** - Asisten untuk menjawab pertanyaan coding
- **Course Catalog** - Katalog lengkap kursus programming
- **Module Learning** - Modul pembelajaran terstruktur
- **Responsive Design** - Optimized untuk desktop dan mobile
- **Smooth Animations** - Animasi dengan Framer Motion
- **Modern Tech Stack** - React + Vite + Tailwind CSS

## Teknologi yang Digunakan

- **React 18** - UI Framework
- **Vite** - Build tool yang cepat
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **PostCSS** - CSS processing

## Instalasi & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Development Server
```bash
npm run dev
```

Server akan berjalan di `http://localhost:5173`

### 3. Build untuk Production
```bash
npm run build
```

### 4. Preview Build
```bash
npm run preview
```

## Struktur Proyek

```
webdev-academy/
├── src/
│   ├── App.jsx           # Main component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static files
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── postcss.config.js     # PostCSS configuration
```

## Halaman Utama

1. **Home** - Landing page dengan hero section
2. **Courses** - Katalog lengkap kursus yang tersedia
3. **Modules** - Modul pembelajaran terstruktur
4. **Features** - Keunggulan platform
5. **Auth** - Halaman login/register

## Komponen Utama

### ChatBotBubble
Chatbot interaktif yang terletak di pojok kanan bawah. Fitur:
- WhatsApp integration button
- Quick replies
- Real-time chat simulation
- Dark mode support
- Customizable position

### WebDevApp
Komponen utama aplikasi dengan:
- State management untuk routing
- Dark mode toggle
- Loading animation
- Responsive navigation

## Customization

### Mengubah WhatsApp Number
Edit di `ChatBotBubble`:
```jsx
<a href="https://wa.me/YOUR_NUMBER_HERE" ...>
```

### Mengubah Kursus
Edit `coursesCatalog` array di `WebDevApp`:
```jsx
const coursesCatalog = [
  { id: "...", title: "...", level: "...", hours: 48, desc: "..." }
]
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
