import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EnhancedVideoPlayer({ lesson, dark, onComplete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [completedSections, setCompletedSections] = useState({});

  // Struktur pembelajaran lengkap untuk setiap lesson
  const getLessonStructure = (lessonId, title) => {
    const structures = {
      "lesson-1-1": {
        title: "🏗️ HTML Fundamentals - Struktur Dasar Web",
        duration: 25,
        instructor: "Budi Hartanto",
        topics: [
          "Apa itu HTML & Kenapa Penting?",
          "Tag-tag Dasar HTML",
          "Struktur Semantik",
          "Aksesibilitas Web",
          "Best Practices HTML",
        ],
        segments: [
          {
            id: 1,
            title: "Pengenalan HTML",
            duration: 5,
            content: `
# Apa itu HTML?

HTML (HyperText Markup Language) adalah fondasi dari setiap website. 
HTML memberikan struktur dan makna pada konten web.

## Kenapa HTML Penting?
- Membentuk struktur halaman web
- Semantic meaning untuk browser dan search engine
- Aksesibilitas untuk semua pengguna
- SEO optimization
            `,
            code: `<!-- Struktur HTML Dasar -->
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Halaman Pertama Saya</title>
</head>
<body>
  <h1>Selamat Datang di Web Saya!</h1>
</body>
</html>`,
            keyPoints: [
              "DOCTYPE mendeklarasikan versi HTML",
              "html tag adalah root element",
              "head berisi metadata",
              "body berisi konten yang terlihat",
            ],
          },
          {
            id: 2,
            title: "Tag-tag Penting HTML",
            duration: 6,
            content: `
# Tag-Tag Penting HTML

Pelajari tag-tag yang paling sering digunakan dalam pengembangan web.

## Semantic Tags
Gunakan tag yang bermakna untuk struktur yang lebih baik.
            `,
            code: `<!-- Semantic HTML Structure -->
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <article>
    <h1>Judul Artikel</h1>
    <p>Konten artikel di sini...</p>
  </article>

  <aside>
    <h3>Sidebar</h3>
    <p>Informasi tambahan</p>
  </aside>
</main>

<footer>
  <p>&copy; 2024 Hak Cipta Dilindungi</p>
</footer>`,
            keyPoints: [
              "header untuk bagian atas halaman",
              "nav untuk navigasi",
              "main untuk konten utama",
              "article untuk artikel lengkap",
              "aside untuk sidebar",
              "footer untuk bagian bawah",
            ],
          },
          {
            id: 3,
            title: "Form & Input",
            duration: 7,
            content: `
# Form & Input Elements

Form adalah cara pengguna berinteraksi dengan website.

## Input Types
Ada berbagai jenis input untuk berbagai keperluan.
            `,
            code: `<!-- Form dengan berbagai input -->
<form>
  <label for="email">Email:</label>
  <input type="email" id="email" required>

  <label for="password">Password:</label>
  <input type="password" id="password" required>

  <label for="message">Pesan:</label>
  <textarea id="message" rows="4"></textarea>

  <input type="checkbox"> Saya setuju dengan Terms

  <button type="submit">Submit</button>
</form>`,
            keyPoints: [
              "label untuk menjelaskan input",
              "type email untuk validasi otomatis",
              "required untuk membuat input wajib",
              "textarea untuk teks panjang",
              "checkbox untuk pilihan ganda",
            ],
          },
          {
            id: 4,
            title: "Best Practices & Tips",
            duration: 4,
            content: `
# Best Practices HTML

Ikuti praktik terbaik untuk kode yang clean dan maintainable.

## Tips Penting
1. Selalu gunakan semantic HTML
2. Indentasi kode dengan benar
3. Tutup semua tag dengan proper
4. Gunakan lowercase untuk tag
5. Validasi HTML Anda
            `,
            code: `<!-- Contoh kode yang baik -->
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Praktik Terbaik HTML</title>
</head>
<body>
  <header>
    <h1>Website Saya</h1>
  </header>

  <main>
    <section>
      <h2>Tentang Saya</h2>
      <p>Deskripsi lengkap di sini...</p>
    </section>
  </main>
</body>
</html>`,
            keyPoints: [
              "Gunakan semantic tags",
              "Indentasi dengan konsisten",
              "Komentar untuk bagian kompleks",
              "Validasi menggunakan validator W3C",
            ],
          },
        ],
      },
      "lesson-1-2": {
        title: "🎨 CSS Fundamentals - Styling Indah",
        duration: 30,
        instructor: "Siti Rahmawati",
        topics: [
          "CSS Basics & Selectors",
          "Box Model (Margin, Padding, Border)",
          "Flexbox untuk Layout",
          "Responsive Design",
          "CSS Tips & Tricks",
        ],
        segments: [
          {
            id: 1,
            title: "Pengenalan CSS",
            duration: 6,
            content: `
# Apa itu CSS?

CSS (Cascading Style Sheets) adalah bahasa untuk styling HTML.
Dengan CSS kita membuat website menjadi indah dan menarik.

## Tiga Cara Menggunakan CSS
1. Inline CSS - langsung di HTML tag
2. Internal CSS - di dalam tag <style>
3. External CSS - di file terpisah (.css)
            `,
            code: `/* External CSS - cara terbaik */
/* styles.css */

/* CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
}

p {
  font-size: 1rem;
  margin-bottom: 1rem;
}`,
            keyPoints: [
              "External CSS paling scalable",
              "CSS Reset menghilangkan default browser",
              "Selalu gunakan box-sizing: border-box",
              "Tentukan typography dasar di body",
            ],
          },
          {
            id: 2,
            title: "Selectors & Specificity",
            duration: 6,
            content: `
# CSS Selectors & Specificity

Pahami bagaimana CSS memilih elemen.

## Jenis-Jenis Selector
- Element Selector: h1, p, div
- Class Selector: .button, .header
- ID Selector: #main, #footer
- Attribute Selector: [type="text"]
- Pseudo-classes: :hover, :active
            `,
            code: `/* Berbagai jenis selector */

/* Element Selector */
p {
  color: blue;
}

/* Class Selector */
.btn {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* ID Selector */
#header {
  background: #333;
  color: white;
}

/* Pseudo-class */
.btn:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}

/* Attribute Selector */
input[type="text"] {
  border: 1px solid #ddd;
  padding: 8px;
}

/* Descendant Selector */
header nav a {
  color: white;
  text-decoration: none;
}`,
            keyPoints: [
              "Class untuk styling yang reusable",
              "ID untuk styling unik",
              "Pseudo-classes untuk interaksi",
              "Specificity: ID > Class > Element",
            ],
          },
          {
            id: 3,
            title: "Box Model & Flexbox",
            duration: 9,
            content: `
# Box Model & Flexbox

Box Model adalah fondasi layout CSS.
Flexbox membuat layout responsif menjadi mudah.

## Box Model Components
- Content: Konten sebenarnya
- Padding: Ruang dalam elemen
- Border: Garis di sekitar padding
- Margin: Ruang di luar elemen
            `,
            code: `/* Box Model */
.card {
  width: 300px;
  
  /* Content area */
  padding: 20px; /* Ruang dalam */
  border: 2px solid #ddd; /* Border */
  margin: 20px; /* Ruang luar */
  
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Flexbox Layout */
.container {
  display: flex;
  justify-content: space-between; /* Horizontal alignment */
  align-items: center; /* Vertical alignment */
  gap: 20px; /* Jarak antar item */
  flex-wrap: wrap; /* Wrap ke baris baru */
}

.item {
  flex: 1; /* Sama besar */
  min-width: 250px; /* Minimum width */
}

/* Responsive Flexbox */
@media (max-width: 768px) {
  .container {
    flex-direction: column; /* Stack vertikal */
  }
}`,
            keyPoints: [
              "Padding = ruang dalam, Margin = ruang luar",
              "display: flex untuk flexbox",
              "justify-content untuk align horizontal",
              "align-items untuk align vertikal",
              "gap untuk jarak antar item",
            ],
          },
          {
            id: 4,
            title: "Responsive Design",
            duration: 9,
            content: `
# Responsive Design dengan Media Queries

Buat website yang responsif di semua ukuran layar.

## Breakpoints Umum
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
            `,
            code: `/* Mobile-First Approach */

/* Default: Mobile (0px - 639px) */
body {
  font-size: 14px;
}

.container {
  padding: 10px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 kolom */
}

/* Tablet (640px - 1023px) */
@media (min-width: 640px) {
  body {
    font-size: 16px;
  }

  .container {
    padding: 20px;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr); /* 2 kolom */
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  body {
    font-size: 18px;
  }

  .container {
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr); /* 3 kolom */
  }
}`,
            keyPoints: [
              "Mobile-first: mulai dari mobile",
              "Gunakan min-width untuk scales up",
              "Breakpoints standard: 640px, 1024px",
              "Grid responsif dengan media queries",
              "Flexible typography",
            ],
          },
        ],
      },
      "lesson-1-3": {
        title: "⚡ JavaScript Basics - Interaktivitas Web",
        duration: 35,
        instructor: "Ahmad Wijaya",
        topics: [
          "Variables & Data Types",
          "Functions & Arrow Functions",
          "DOM Manipulation",
          "Events & Listeners",
          "Async/Await Basics",
        ],
        segments: [
          {
            id: 1,
            title: "Variables & Data Types",
            duration: 7,
            content: `
# Variables & Data Types

JavaScript adalah bahasa pemrograman yang flexible.
Pelajari cara menyimpan dan memanipulasi data.

## Tiga Cara Deklarasi Variable
- var: Old style (hindari)
- let: Recommended, block-scoped
- const: Untuk nilai yang tidak berubah
            `,
            code: `// Variables - Cara Modern

// const - gunakan ini default
const name = "John";
const age = 25;
const isStudent = true;

// let - gunakan jika akan diubah
let counter = 0;
counter = counter + 1;

// Data Types
const string = "Hello"; // Text
const number = 42; // Angka
const decimal = 3.14;
const boolean = true; // true/false
const array = [1, 2, 3, 4]; // Array
const object = { name: "John", age: 25 }; // Object
const nothing = null; // Tidak ada nilai
const undefined_var = undefined; // Belum didefinisikan

// Type Checking
console.log(typeof string); // "string"
console.log(typeof number); // "number"
console.log(typeof array); // "object" (array adalah object)`,
            keyPoints: [
              "Gunakan const secara default",
              "Gunakan let jika nilai berubah",
              "Hindari var",
              "String bisa single atau double quote",
              "Array dan Object untuk data kompleks",
            ],
          },
          {
            id: 2,
            title: "Functions & Arrow Functions",
            duration: 8,
            content: `
# Functions & Arrow Functions

Function adalah blok kode yang dapat digunakan kembali.

## Dua Cara Menulis Function
1. Function Declaration (traditional)
2. Arrow Function (modern)
            `,
            code: `// Function Declaration - Traditional
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Alice")); // "Hello, Alice!"

// Function dengan multiple parameters
function add(a, b) {
  return a + b;
}

console.log(add(5, 3)); // 8

// Arrow Function - Modern & Recommended
const multiply = (a, b) => {
  return a * b;
};

// Arrow Function Shorthand (simple)
const square = (x) => x * x;
const square2 = x => x * x; // Bisa tanpa kurung jika 1 param

// Arrow Function untuk Array
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Filter Array
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log(evenNumbers); // [2, 4]`,
            keyPoints: [
              "Function declaration untuk reusable code",
              "Arrow function adalah syntax modern",
              "Template literals dengan backticks dan ${}",
              "map() untuk transform array",
              "filter() untuk select array items",
              "return statement untuk mengembalikan nilai",
            ],
          },
          {
            id: 3,
            title: "DOM Manipulation",
            duration: 10,
            content: `
# DOM Manipulation

DOM (Document Object Model) adalah representasi HTML dalam JavaScript.
Kita bisa mengubah halaman dengan JavaScript.

## Common DOM Methods
- getElementById, querySelector
- classList untuk mengelola class
- textContent, innerHTML untuk konten
- addEventListener untuk events
            `,
            code: `// Select Elements
const header = document.getElementById("header");
const buttons = document.querySelectorAll(".btn");
const container = document.querySelector(".container");

// Change Content
header.textContent = "Welcome!";
header.innerHTML = "<strong>Welcome!</strong>";

// Change Attributes
header.setAttribute("data-id", "123");
header.id = "new-id";

// Manage Classes
header.classList.add("active");
header.classList.remove("inactive");
header.classList.toggle("highlight");

// Change Styles
header.style.color = "blue";
header.style.fontSize = "2rem";
header.style.backgroundColor = "#f0f0f0";

// Create & Append Elements
const newDiv = document.createElement("div");
newDiv.textContent = "This is new!";
newDiv.classList.add("new-element");
container.appendChild(newDiv);

// Remove Elements
container.removeChild(newDiv);

// Events
const button = document.querySelector(".btn");
button.addEventListener("click", function() {
  alert("Button clicked!");
});`,
            keyPoints: [
              "getElementById untuk select by ID",
              "querySelector untuk CSS selectors",
              "textContent untuk teks biasa",
              "innerHTML untuk HTML content",
              "classList untuk manage classes",
              "addEventListener untuk handle events",
              "createElement untuk buat elemen baru",
            ],
          },
          {
            id: 4,
            title: "Events & Event Listeners",
            duration: 10,
            content: `
# Events & Event Listeners

Events adalah user interactions seperti klik, input, scroll.

## Common Events
- click: Ketika user klik
- input: Ketika user ketik di input
- submit: Ketika form dikirim
- scroll: Ketika user scroll
- mouseover/mouseout: Ketika mouse hover
            `,
            code: `// Click Event
const button = document.querySelector(".btn");
button.addEventListener("click", function(event) {
  console.log("Button clicked!");
  console.log(event.target); // Element yang diklik
});

// Input Event
const input = document.querySelector("input");
input.addEventListener("input", function(event) {
  console.log("User typing:", event.target.value);
});

// Form Submit
const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default submit
  const formData = new FormData(form);
  console.log(Object.fromEntries(formData));
});

// Mouse Events
button.addEventListener("mouseover", function() {
  button.style.backgroundColor = "yellow";
});

button.addEventListener("mouseout", function() {
  button.style.backgroundColor = "";
});

// Keyboard Events
document.addEventListener("keypress", function(event) {
  console.log("Key pressed:", event.key);
});

// Event Delegation - Listen on parent
const list = document.querySelector("ul");
list.addEventListener("click", function(event) {
  if (event.target.tagName === "LI") {
    event.target.style.color = "red";
  }
});`,
            keyPoints: [
              "addEventListener untuk attach event handler",
              "event.preventDefault() untuk cancel default behavior",
              "event.target untuk element yang trigger event",
              "Event delegation untuk efficient listening",
              "Multiple listeners bisa di-attach same element",
            ],
          },
        ],
      },
    };

    return (
      structures[lessonId] || {
        title: title,
        duration: 20,
        instructor: "Instruktur",
        topics: ["Topik 1", "Topik 2", "Topik 3"],
        segments: [
          {
            id: 1,
            title: "Pengenalan",
            duration: 5,
            content: "Konten pembelajaran",
            code: "// Code example",
            keyPoints: ["Point 1", "Point 2"],
          },
        ],
      }
    );
  };

  const lessonStructure = getLessonStructure(lesson.id, lesson.title);
  const currentSegmentData = lessonStructure.segments[currentSegment];
  const totalProgress =
    ((currentSegment + 1) / lessonStructure.segments.length) * 100;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentSegment < lessonStructure.segments.length - 1) {
            setCurrentSegment(currentSegment + 1);
            setProgress(0);
          } else {
            setIsPlaying(false);
            onComplete && onComplete();
          }
          return 0;
        }
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentSegment]);

  const handleSegmentClick = (index) => {
    setCurrentSegment(index);
    setProgress(0);
    setIsPlaying(false);
  };

  const toggleSegmentCompletion = (segmentId) => {
    setCompletedSections((prev) => ({
      ...prev,
      [segmentId]: !prev[segmentId],
    }));
  };

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50" : ""} rounded-xl overflow-hidden shadow-2xl`}
    >
      {/* Main Video Player */}
      <div
        className={`${
          isFullscreen ? "w-full h-screen" : "aspect-video"
        } bg-gradient-to-br from-slate-900 to-slate-800 relative group`}
      >
        {/* Video Content Area */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          animate={{
            backgroundImage: isPlaying
              ? "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(236,72,153,0.4))"
              : "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.8))",
          }}
        >
          {/* Current Segment Title & Content */}
          <div className="text-center max-w-3xl mb-8">
            <motion.h2
              key={`${currentSegment}-title`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              {currentSegmentData.title}
            </motion.h2>

            <motion.p
              key={`${currentSegment}-desc`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/80 text-lg leading-relaxed whitespace-pre-wrap"
            >
              {currentSegmentData.content.split("\n").slice(0, 3).join("\n")}
            </motion.p>
          </div>

          {/* Play Button */}
          {!isPlaying && (
            <motion.button
              onClick={() => setIsPlaying(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mb-8 w-20 h-20 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-5xl hover:bg-white/30 transition"
            >
              ▶️
            </motion.button>
          )}

          {/* Segment Counter */}
          <div className="text-white/70 text-sm">
            Segmen {currentSegment + 1} dari {lessonStructure.segments.length}
          </div>
        </motion.div>

        {/* Progress & Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition">
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-white/70 mt-1 flex justify-between">
              <span>Segmen {currentSegment + 1}</span>
              <span>
                {currentSegmentData.duration} menit per segmen
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-xl"
              >
                {isPlaying ? "⏸️" : "▶️"}
              </button>

              <button
                onClick={() =>
                  setCurrentSegment(Math.max(0, currentSegment - 1))
                }
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
              >
                ⏮️
              </button>

              <button
                onClick={() =>
                  setCurrentSegment(
                    Math.min(lessonStructure.segments.length - 1, currentSegment + 1)
                  )
                }
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
              >
                ⏭️
              </button>

              <div className="flex items-center gap-1 bg-white/10 rounded-lg px-2 py-1.5">
                <span className="text-sm text-white">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-20 h-1 rounded-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
              >
                📄
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
              >
                {isFullscreen ? "🗗" : "⛶"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Below Video */}
      {!isFullscreen && (
        <div className={`${dark ? "bg-slate-800" : "bg-slate-50"}`}>
          {/* Segment Navigation */}
          <div className={`border-b ${dark ? "border-slate-700" : "border-slate-200"} p-4 sm:p-6`}>
            <h3 className="font-bold text-sm mb-4">Segmen Pembelajaran:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 overflow-x-auto pb-2">
              {lessonStructure.segments.map((segment, idx) => (
                <motion.button
                  key={segment.id}
                  onClick={() => handleSegmentClick(idx)}
                  whileHover={{ scale: 1.05 }}
                  className={`p-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                    currentSegment === idx
                      ? "bg-indigo-600 text-white"
                      : completedSections[segment.id]
                      ? `${dark ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-700"}`
                      : `${dark ? "bg-slate-700 text-slate-300" : "bg-white text-slate-900"}`
                  }`}
                >
                  <div className="text-lg mb-1">
                    {completedSections[segment.id] ? "✅" : "📺"}
                  </div>
                  <div className="truncate">{segment.title.split(" ").slice(0, 2).join(" ")}</div>
                  <div className="text-xs opacity-75">{segment.duration}m</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-4">{currentSegmentData.title}</h3>

                {/* Description */}
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    dark ? "bg-slate-700/50" : "bg-white"
                  }`}
                >
                  <p className={`whitespace-pre-wrap leading-relaxed ${
                    dark ? "text-slate-300" : "text-slate-700"
                  }`}>
                    {currentSegmentData.content}
                  </p>
                </div>

                {/* Code Example */}
                <div className="mb-6">
                  <h4 className="font-bold mb-3">💻 Contoh Kode:</h4>
                  <div
                    className={`rounded-lg p-4 overflow-x-auto ${
                      dark ? "bg-slate-900 text-slate-100" : "bg-slate-900 text-slate-100"
                    }`}
                  >
                    <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap break-words">
                      <code>{currentSegmentData.code}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Key Points Sidebar */}
              <div>
                <h4 className="font-bold mb-4">🎯 Poin Penting:</h4>
                <div className="space-y-3">
                  {currentSegmentData.keyPoints.map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-3 rounded-lg border-l-4 border-indigo-500 ${
                        dark ? "bg-slate-700/50" : "bg-indigo-50"
                      }`}
                    >
                      <p className={`text-sm ${dark ? "text-slate-200" : "text-slate-900"}`}>
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Mark as Complete Button */}
                <motion.button
                  onClick={() => toggleSegmentCompletion(currentSegmentData.id)}
                  whileHover={{ scale: 1.05 }}
                  className={`w-full mt-6 py-2 rounded-lg font-semibold transition ${
                    completedSections[currentSegmentData.id]
                      ? "bg-green-500/20 text-green-300 border border-green-500/50"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {completedSections[currentSegmentData.id]
                    ? "✅ Selesai"
                    : "Tandai Selesai"}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className={`flex gap-4 p-4 sm:p-6 border-t ${dark ? "border-slate-700" : "border-slate-200"}`}>
            <button
              onClick={() => setCurrentSegment(Math.max(0, currentSegment - 1))}
              disabled={currentSegment === 0}
              className="flex-1 px-6 py-3 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Sebelumnya
            </button>

            <button
              onClick={() =>
                setCurrentSegment(
                  Math.min(lessonStructure.segments.length - 1, currentSegment + 1)
                )
              }
              disabled={currentSegment === lessonStructure.segments.length - 1}
              className="flex-1 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Selanjutnya →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
