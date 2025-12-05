import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EnhancedVideoPlayer({ lesson, dark, courseId }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  // AI modal state
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiMode, setAiMode] = useState("summarize"); // summarize, explain, quiz, practice, ask
  const [aiQuestion, setAiQuestion] = useState("");

  // Struktur pembelajaran lengkap berdasarkan lesson ID
  const getLearningStructure = (lessonId) => {
    const structures = {
      "lesson-1-1": {
        title: "Pengenalan HTML - Struktur Dasar Web",
        module: "🏗️ Struktur Web",
        duration: 45,
        steps: [
          {
            title: "📖 Pengantar HTML",
            subtitle: "Apa itu HTML dan mengapa penting?",
            content:
              "HTML adalah HyperText Markup Language. Ini adalah bahasa markup yang digunakan untuk membuat struktur halaman web. HTML bekerja dengan menggunakan tags (label) untuk menjelaskan kepada browser bagaimana menampilkan konten.",
            code: `<!-- Struktur HTML paling dasar -->
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Halaman Saya</title>
</head>
<body>
  <p>Halo, dunia!</p>
</body>
</html>`,
            duration: 8,
            keyPoints: [
              "HTML = HyperText Markup Language",
              "Menggunakan tags untuk struktur",
              "Browser membaca dan menampilkan HTML",
            ],
          },
          {
            title: "🏗️ Struktur Dasar HTML",
            subtitle: "Komponen-komponen penting dalam HTML",
            content:
              "Setiap dokumen HTML memiliki struktur standar. Elemen <!DOCTYPE> memberitahu browser versi HTML yang digunakan. Tag <html> adalah root element, <head> berisi metadata, dan <body> berisi konten yang terlihat.",
            code: `<!DOCTYPE html>
<!-- Deklarasi versi HTML5 -->

<html lang="id">
  <!-- Root element: membungkus seluruh dokumen -->

  <head>
    <!-- Metadata: tidak ditampilkan di halaman -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Judul Halaman</title>
  </head>

  <body>
    <!-- Konten: ditampilkan di halaman web -->
    <h1>Selamat Datang!</h1>
    <p>Ini adalah paragraf pertama saya.</p>
  </body>
</html>`,
            duration: 10,
            keyPoints: [
              "<!DOCTYPE html> deklarasi tipe dokumen",
              "<head> berisi metadata dan link",
              "<body> berisi konten utama",
              "<title> judul di tab browser",
            ],
          },
          {
            title: "🏷️ Tag-tag HTML Penting",
            subtitle: "Tag umum yang sering digunakan",
            content:
              "Ada banyak tag HTML. Beberapa tag paling penting adalah heading (h1-h6), paragraph (p), links (a), images (img), lists (ul, ol, li), dan semantic tags.",
            code: `<!-- Headings: dari h1 (terbesar) ke h6 (terkecil) -->
<h1>Judul Utama</h1>
<h2>Subjudul</h2>
<h3>Sub-subjudul</h3>

<!-- Paragraph: teks normal -->
<p>Ini adalah paragraf pertama.</p>
<p>Ini adalah paragraf kedua.</p>

<!-- Links: navigasi ke halaman lain -->
<a href="https://google.com">Klik ke Google</a>
<a href="/halaman-lain.html">Ke Halaman Lain</a>

<!-- Images: menampilkan gambar -->
<img src="foto.jpg" alt="Deskripsi foto">

<!-- Lists: daftar terurut dan tidak terurut -->
<ul>
  <li>Item tidak terurut 1</li>
  <li>Item tidak terurut 2</li>
</ul>

<ol>
  <li>Item terurut 1</li>
  <li>Item terurut 2</li>
</ol>`,
            duration: 12,
            keyPoints: [
              "<h1> hingga <h6> untuk heading",
              "<p> untuk paragraph",
              "<a> untuk link",
              "<img> untuk gambar",
              "<ul> dan <ol> untuk list",
            ],
          },
          {
            title: "♿ Semantic HTML & Aksesibilitas",
            subtitle: "Menulis HTML yang bermakna dan accessible",
            content:
              "Semantic HTML menggunakan tags yang memiliki arti. Ini membuat kode lebih mudah dipahami dan meningkatkan aksesibilitas untuk screen reader dan pengguna dengan disabilitas.",
            code: `<!-- Semantic HTML: tags yang memiliki arti -->
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <article>
    <h1>Judul Artikel</h1>
    <p>Isi artikel...</p>
  </article>
  
  <aside>
    <h3>Info Tambahan</h3>
    <p>Sidebar content</p>
  </aside>
</main>

<footer>
  <p>&copy; 2024 Hak Cipta</p>
</footer>

<!-- Accessibility: alt text untuk gambar -->
<img src="diagram.png" alt="Diagram proses pembelian">

<!-- Label untuk form input -->
<label for="nama">Nama Anda:</label>
<input id="nama" type="text" placeholder="Masukkan nama">`,
            duration: 15,
            keyPoints: [
              "<header>, <nav>, <main> semantic tags",
              "<article> untuk konten utama",
              "<aside> untuk sidebar",
              "<footer> untuk footer",
              "Alt text untuk gambar",
              "Label untuk form inputs",
            ],
          },
          {
            title: "✅ Ringkasan & Latihan",
            subtitle: "Review apa yang sudah dipelajari",
            content:
              "Anda telah mempelajari fondasi HTML! Sekarang Anda tahu struktur dasar halaman web, tag-tag penting, dan best practices untuk aksesibilitas. Saatnya praktek membuat halaman HTML sendiri!",
            code: `<!-- LATIHAN: Buat halaman HTML dengan struktur lengkap -->
<!-- Ketentuan:
  1. Gunakan <!DOCTYPE html>
  2. Tambahkan heading (h1, h2)
  3. Tambahkan 3 paragraph minimal
  4. Tambahkan 1 link eksternal
  5. Tambahkan 1 gambar dengan alt text
  6. Gunakan semantic tags (header, main, footer)
-->

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Latihan HTML Saya</title>
</head>
<body>
  <header>
    <h1>Halaman Latihan HTML</h1>
  </header>

  <main>
    <!-- Tambahkan konten Anda di sini -->
  </main>

  <footer>
    <p>© 2024 Nama Anda</p>
  </footer>
</body>
</html>`,
            duration: 5,
            keyPoints: [
              "Review: Struktur HTML penting",
              "Review: Tag-tag umum",
              "Review: Semantic HTML",
              "Siap untuk CSS!",
              "Latihan membuat halaman sendiri",
            ],
          },
        ],
      },
      "lesson-1-2": {
        title: "CSS Styling Fundamentals - Desain Indah",
        module: "🎨 Styling & Layout",
        duration: 50,
        steps: [
          {
            title: "🎨 Pengantar CSS",
            subtitle: "Apa itu CSS dan cara kerjanya?",
            content:
              "CSS adalah Cascading Style Sheets. CSS digunakan untuk memberikan gaya/styling pada elemen HTML. Tanpa CSS, website hanya tampilan teks biasa. Dengan CSS, kita bisa mengubah warna, ukuran, layout, animasi, dan banyak lagi.",
            code: `/* CSS Dasar: Selector dan Properties */
selector {
  property: value;
}

/* Contoh: Memberi warna merah pada semua h1 */
h1 {
  color: red;
}

/* Contoh: Memberi background biru pada paragraph */
p {
  background-color: blue;
  color: white;
}

/* Class Selector: untuk styling elemen tertentu */
.highlight {
  background-color: yellow;
  font-weight: bold;
}

<!-- HTML yang digunakan -->
<h1>Judul</h1>
<p>Paragraph biasa</p>
<p class="highlight">Paragraph dengan highlight</p>`,
            duration: 10,
            keyPoints: [
              "CSS = Cascading Style Sheets",
              "Selector + Property + Value",
              "Class selector (.classname)",
              "ID selector (#idname)",
              "Element selector (h1, p, div)",
            ],
          },
          {
            title: "📦 Box Model - Margin, Padding, Border",
            subtitle: "Memahami struktur kotak dalam CSS",
            content:
              "Box Model adalah konsep fundamental dalam CSS. Setiap elemen HTML adalah kotak yang terdiri dari content, padding, border, dan margin. Memahami ini sangat penting untuk layout.",
            code: `/* Box Model */
.box {
  /* Content: area tempat teks/konten */
  width: 200px;
  height: 100px;
  
  /* Padding: ruang dalam dari border ke content */
  padding: 20px;
  
  /* Border: garis tepi kotak */
  border: 2px solid black;
  
  /* Margin: ruang luar dari border */
  margin: 30px;
}

/* Box Model Visualization:
   |------------ Margin -----------|
   |  |------- Border ------|       |
   |  |  |---- Padding ----|  |     |
   |  |  |    Content     |  |     |
   |  |  |__________________|  |     |
   |  |________________________|     |
   |________________________________|
*/

/* Shorthand properties */
.box-short {
  /* top right bottom left */
  margin: 10px 20px 10px 20px;
  
  /* vertical horizontal */
  padding: 10px 20px;
  
  /* semua sisi */
  border: 1px solid gray;
}`,
            duration: 12,
            keyPoints: [
              "Content: area konten",
              "Padding: ruang dalam",
              "Border: garis tepi",
              "Margin: ruang luar",
              "box-sizing: border-box mengubah kalkulasi",
            ],
          },
          {
            title: "🎯 Flexbox - Layout Mudah",
            subtitle: "Membuat layout responsive dengan flexbox",
            content:
              "Flexbox adalah cara modern untuk membuat layout. Dengan flexbox, kita bisa dengan mudah mengatur elemen secara horizontal atau vertikal, dan membuat layout responsive.",
            code: `/* Flexbox Container */
.container {
  display: flex;
  /* flex-direction: row (default), column, row-reverse, column-reverse */
  flex-direction: row;
  
  /* justify-content: alignment horizontal */
  justify-content: space-between; 
  /* flex-start, flex-end, center, space-between, space-around */
  
  /* align-items: alignment vertikal */
  align-items: center;
  /* flex-start, flex-end, center, stretch */
  
  /* gap: ruang antar item */
  gap: 20px;
  
  /* flex-wrap: wrapping ke baris berikutnya */
  flex-wrap: wrap;
}

/* Flexbox Item */
.item {
  /* flex: shorthand untuk grow, shrink, basis */
  flex: 1;
  
  /* atau terpisah */
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}

/* Contoh Layout: Centered Box */
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

<div class="centered">
  <h1>Saya di tengah!</h1>
</div>`,
            duration: 13,
            keyPoints: [
              "display: flex untuk aktifkan flexbox",
              "flex-direction: row/column",
              "justify-content: alignment horizontal",
              "align-items: alignment vertikal",
              "gap: ruang antar item",
              "flex: shorthand untuk sizing",
            ],
          },
          {
            title: "📐 CSS Grid - Layout Advanced",
            subtitle: "Grid system untuk layout kompleks",
            content:
              "CSS Grid memungkinkan Anda membuat layout 2D yang kompleks. Dengan grid, Anda bisa membuat kolom dan baris, dan menempatkan item di posisi tertentu.",
            code: `/* CSS Grid Container */
.grid-container {
  display: grid;
  
  /* grid-template-columns: ukuran kolom */
  grid-template-columns: repeat(3, 1fr);
  /* 1fr = 1 fraction unit (bagian yang sama) */
  
  /* grid-template-rows: ukuran baris */
  grid-template-rows: auto 200px 100px;
  
  /* gap: ruang antar grid */
  gap: 20px;
}

/* Grid Item */
.grid-item {
  /* grid-column: start / end */
  grid-column: 1 / 3; /* dari kolom 1 sampai 3 */
  
  /* grid-row: start / end */
  grid-row: 1 / 2;
}

/* Contoh: Layout dengan 12 kolom */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 15px;
}

.col-6 {
  grid-column: span 6; /* menempati 6 kolom */
}

.col-4 {
  grid-column: span 4; /* menempati 4 kolom */
}

<div class="grid-12">
  <div class="col-6">Kolom 6</div>
  <div class="col-6">Kolom 6</div>
  <div class="col-4">Kolom 4</div>
  <div class="col-4">Kolom 4</div>
  <div class="col-4">Kolom 4</div>
</div>`,
            duration: 12,
            keyPoints: [
              "display: grid untuk aktifkan grid",
              "grid-template-columns: ukuran kolom",
              "grid-template-rows: ukuran baris",
              "gap: ruang antar grid",
              "grid-column: span untuk lebar",
              "repeat(n, size) untuk template",
            ],
          },
          {
            title: "✅ Ringkasan & Praktik CSS",
            subtitle: "Review dan latihan CSS",
            content:
              "Sekarang Anda sudah memahami CSS dasar! Anda tahu cara styling elemen, box model, flexbox, dan grid. Saatnya untuk mempraktikkan semua ini dengan membuat layout yang cantik!",
            code: `/* LATIHAN: Buat Layout Responsive */
/* Ketentuan:
  1. Buat header dengan nav
  2. Buat main area dengan 2 kolom (sidebar dan content)
  3. Buat footer
  4. Gunakan flexbox untuk alignment
  5. Responsive di mobile (1 kolom) dan desktop (2 kolom)
*/

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

header {
  background-color: #333;
  color: white;
  padding: 20px;
}

nav {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;
  padding: 20px;
}

.sidebar {
  flex: 0 0 250px;
}

.content {
  flex: 1;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .sidebar {
    flex: 1;
  }
}`,
            duration: 8,
            keyPoints: [
              "Review: CSS selector",
              "Review: Box model",
              "Review: Flexbox",
              "Review: CSS Grid",
              "Praktik membuat layout sendiri",
            ],
          },
        ],
      },
      "lesson-1-3": {
        title: "JavaScript Basics - Interaktivitas & Logic",
        module: "⚙️ Programming Fundamentals",
        duration: 60,
        steps: [
          {
            title: "🚀 Pengantar JavaScript",
            subtitle: "Membuat website interaktif",
            content:
              "JavaScript adalah bahasa pemrograman yang membuat website interaktif. Dengan JavaScript, Anda bisa menangani klik mouse, validasi form, animasi, dan banyak lagi. JavaScript berjalan di browser pengguna.",
            code: `<!-- Menambahkan JavaScript ke HTML -->

<!-- Cara 1: Script tag di dalam HTML -->
<button id="tombol">Klik saya!</button>

<script>
  // JavaScript code di sini
  document.getElementById('tombol').addEventListener('click', function() {
    alert('Tombol diklik!');
  });
</script>

<!-- Cara 2: File eksternal (.js) -->
<script src="script.js"></script>

<!-- Cara 3: Inline (tidak disarankan) -->
<button onclick="alert('Halo!')">Klik</button>`,
            duration: 10,
            keyPoints: [
              "JavaScript berjalan di browser",
              "Script tag untuk menempatkan JS",
              "File eksternal untuk kode yang banyak",
              "Menghindari inline scripts",
              "DOM manipulation basics",
            ],
          },
          {
            title: "💾 Variables & Data Types",
            subtitle: "Menyimpan dan mengelola data",
            content:
              "Variables adalah tempat menyimpan data. JavaScript memiliki beberapa tipe data: string, number, boolean, object, array, dan null/undefined. Gunakan const untuk immutable, let untuk mutable, dan hindari var.",
            code: `// Variable declaration
var nama = 'Budi'; // Hindari var, gunakan let/const
let umur = 25;     // Bisa diubah
const kota = 'Jakarta'; // Tidak bisa diubah

// Data types
const string = 'Halo';           // String: teks
const number = 42;                // Number: angka
const float = 3.14;               // Number: desimal
const boolean = true;             // Boolean: true/false
const array = [1, 2, 3];          // Array: kumpulan data
const object = { nama: 'Budi' };  // Object: data kompleks
const nothing = null;             // Null: tidak ada nilai
const undefined_var = undefined;  // Undefined: belum didefinisikan

// Template literals (string interpolation)
const namaOrang = 'Ani';
const umurOrang = 30;
console.log(\`Nama: \${namaOrang}, Umur: \${umurOrang}\`);`,
            duration: 12,
            keyPoints: [
              "const untuk variable yang tidak berubah",
              "let untuk variable yang bisa berubah",
              "typeof operator untuk cek tipe",
              "Template literals dengan backticks",
              "Array dan Object basics",
            ],
          },
          {
            title: "🔄 Control Flow & Loops",
            subtitle: "Logika dan pengulangan dalam program",
            content:
              "Control flow memungkinkan program membuat keputusan dengan if/else. Loops memungkinkan pengulangan kode dengan for, while, atau forEach.",
            code: `// If statement
const nilai = 85;
if (nilai >= 80) {
  console.log('Grade A');
} else if (nilai >= 70) {
  console.log('Grade B');
} else {
  console.log('Grade C');
}

// Switch statement
const hari = 'Senin';
switch (hari) {
  case 'Senin':
    console.log('Hari Kerja');
    break;
  case 'Sabtu':
    console.log('Weekend');
    break;
  default:
    console.log('Hari lain');
}

// For loop
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// While loop
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}

// Array methods
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => console.log(num));

const doubled = numbers.map(num => num * 2);
const evenOnly = numbers.filter(num => num % 2 === 0);`,
            duration: 15,
            keyPoints: [
              "if/else/else if untuk kondisi",
              "switch untuk multiple conditions",
              "for loop untuk pengulangan yang pasti",
              "while loop untuk pengulangan yang kondisional",
              "forEach, map, filter untuk array",
            ],
          },
          {
            title: "🔧 Functions & Scope",
            subtitle: "Menulis kode yang reusable",
            content:
              "Functions adalah blok kode yang bisa dipanggil berkali-kali. Functions membuat kode lebih modular dan mudah di-maintain. Scope menentukan di mana variable bisa diakses.",
            code: `// Function declaration
function greet(name) {
  return \`Halo, \${name}!\`;
}

console.log(greet('Budi')); // Halo, Budi!

// Arrow function (modern)
const add = (a, b) => a + b;
console.log(add(3, 5)); // 8

// Function parameters & default values
function sayHello(name = 'Stranger') {
  console.log(\`Halo, \${name}!\`);
}

sayHello(); // Halo, Stranger!
sayHello('Ani'); // Halo, Ani!

// Scope: Global vs Local
const globalVar = 'Saya global';

function testScope() {
  const localVar = 'Saya lokal';
  console.log(globalVar); // Bisa akses
  console.log(localVar);  // Bisa akses
}

console.log(globalVar); // Bisa akses
console.log(localVar);  // Error! Tidak bisa akses

// Closure
function counter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const myCounter = counter();
console.log(myCounter()); // 1
console.log(myCounter()); // 2`,
            duration: 14,
            keyPoints: [
              "Function declaration dan arrow functions",
              "Parameters dan return values",
              "Default parameters",
              "Global scope vs local scope",
              "Closure: function returns function",
            ],
          },
          {
            title: "🎯 DOM Manipulation & Events",
            subtitle: "Berinteraksi dengan HTML dari JavaScript",
            content:
              "DOM (Document Object Model) adalah representasi HTML di JavaScript. Anda bisa select, modify, dan add elements. Events memungkinkan Anda merespons aksi pengguna.",
            code: `// Selecting elements
const button = document.getElementById('btn');
const paragraph = document.querySelector('.text');
const allDivs = document.querySelectorAll('div');

// Modifying content
button.textContent = 'Tombol Baru';
paragraph.innerHTML = '<strong>Teks tebal</strong>';

// Modifying attributes
const image = document.querySelector('img');
image.src = 'new-image.jpg';
image.alt = 'Deskripsi baru';

// Modifying styles
button.style.backgroundColor = 'red';
button.style.padding = '10px 20px';

// Adding classes
button.classList.add('active');
button.classList.remove('disabled');
button.classList.toggle('highlight');

// Event handling
button.addEventListener('click', function() {
  console.log('Tombol diklik!');
  paragraph.classList.toggle('hidden');
});

// Input events
const input = document.querySelector('input');
input.addEventListener('input', function(event) {
  console.log('Input value:', event.target.value);
});`,
            duration: 14,
            keyPoints: [
              "getElementById, querySelector selectors",
              "Modifying textContent dan innerHTML",
              "Changing attributes dan styles",
              "classList untuk manage CSS classes",
              "addEventListener untuk handle events",
            ],
          },
          {
            title: "✅ Project: Interactive To-Do List",
            subtitle: "Menggabungkan semua konsep JavaScript",
            content:
              "Mari kita buat aplikasi To-Do List interaktif yang mendemonstrasikan semua yang telah kita pelajari: variables, functions, loops, dan DOM manipulation.",
            code: `<!-- HTML -->
<input type="text" id="input" placeholder="Masukkan tugas baru">
<button id="addBtn">Tambah</button>
<ul id="list"></ul>

<!-- JavaScript -->
<script>
const input = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');

let todos = [];

function addTodo() {
  const text = input.value.trim();
  if (text === '') return;
  
  todos.push({ id: Date.now(), text, done: false });
  input.value = '';
  renderList();
}

function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderList();
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  renderList();
}

function renderList() {
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.done ? 'done' : '';
    li.innerHTML = \`
      <input type="checkbox" \${todo.done ? 'checked' : ''}>
      <span>\${todo.text}</span>
      <button>Hapus</button>
    \`;
    
    li.querySelector('input').addEventListener('change', () => toggleTodo(todo.id));
    li.querySelector('button').addEventListener('click', () => removeTodo(todo.id));
    
    list.appendChild(li);
  });
}

addBtn.addEventListener('click', addTodo);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});
</script>`,
            duration: 15,
            keyPoints: [
              "Menggabungkan HTML + CSS + JavaScript",
              "State management dengan array",
              "CRUD operations: Create, Read, Update, Delete",
              "Event handling untuk interaktivitas",
              "DOM manipulation untuk update UI",
            ],
          },
        ],
      },
      "lesson-2-1": {
        title: "Flexbox Layout - Layout Fleksibel Modern",
        module: "🎨 Advanced Layout",
        duration: 50,
        steps: [
          {
            title: "📐 Pengenalan Flexbox",
            subtitle: "Layout 1D yang powerful",
            content:
              "Flexbox adalah CSS layout module yang powerful untuk mengatur items secara horizontal atau vertikal. Ini menyelesaikan banyak masalah layout traditional CSS. Flexbox memiliki container (parent) dan items (children).",
            code: `/* Container Properties */
.container {
  display: flex;
  
  /* Direction: row (default), row-reverse, column, column-reverse */
  flex-direction: row;
  
  /* Justify Content: align items along main axis */
  justify-content: space-between;
  /* flex-start, flex-end, center, space-between, space-around, space-evenly */
  
  /* Align Items: align items along cross axis */
  align-items: center;
  /* flex-start, flex-end, center, stretch, baseline */
  
  /* Gap: ruang antara items */
  gap: 20px;
}

/* Item Properties */
.item {
  /* Flex grow: berapa banyak item grow */
  flex-grow: 1;
  
  /* Flex shrink: berapa banyak item shrink */
  flex-shrink: 1;
  
  /* Flex basis: ukuran default item */
  flex-basis: 100px;
  
  /* Shorthand: flex: grow shrink basis */
  flex: 1 1 100px;
}

<!-- HTML Example -->
<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>`,
            duration: 12,
            keyPoints: [
              "display: flex untuk enable flexbox",
              "flex-direction: row, column",
              "justify-content untuk main axis",
              "align-items untuk cross axis",
              "gap untuk spacing antar items",
            ],
          },
          {
            title: "🔄 Flexbox Container Properties",
            subtitle: "Mengatur behavior container",
            content:
              "Container properties mengontrol bagaimana children diatur dalam container. Dengan memahami ini, Anda bisa membuat layout yang kompleks dengan mudah.",
            code: `/* Flex Direction: Menentukan arah main axis */
.flex-row { flex-direction: row; }           /* ← Left to Right */
.flex-row-reverse { flex-direction: row-reverse; } /* Right to Left */
.flex-column { flex-direction: column; }     /* ↑ Top to Bottom */
.flex-column-reverse { flex-direction: column-reverse; } /* Bottom to Top */

/* Justify Content: Align items sepanjang main axis */
.justify-start { justify-content: flex-start; }     /* ▓▓▓░░░░░░ */
.justify-end { justify-content: flex-end; }         /* ░░░░░░▓▓▓ */
.justify-center { justify-content: center; }        /* ░░▓▓▓░░░░ */
.justify-between { justify-content: space-between; } /* ▓░░░▓░░░▓ */
.justify-around { justify-content: space-around; }  /* ░▓░░▓░░▓░ */
.justify-evenly { justify-content: space-evenly; }  /* ░▓░░░▓░░░▓░ */

/* Align Items: Align items sepanjang cross axis */
.align-start { align-items: flex-start; }    /* Ke atas */
.align-end { align-items: flex-end; }        /* Ke bawah */
.align-center { align-items: center; }       /* Tengah */
.align-stretch { align-items: stretch; }     /* Full height */

/* Flex Wrap: Items wrap atau tidak */
.flex-nowrap { flex-wrap: nowrap; }   /* Default: tidak wrap */
.flex-wrap { flex-wrap: wrap; }       /* Wrap ke baris baru */

/* Gap: Ruang antar items */
.gap-10 { gap: 10px; }
.gap-20 { gap: 20px; }`,
            duration: 13,
            keyPoints: [
              "flex-direction mengubah arah layout",
              "justify-content untuk horizontal alignment",
              "align-items untuk vertical alignment",
              "flex-wrap untuk multi-line layout",
              "gap untuk consistent spacing",
            ],
          },
          {
            title: "📦 Flexbox Item Properties",
            subtitle: "Mengatur item individual",
            content:
              "Item properties mengontrol bagaimana item individual behave dalam container. flex-grow, flex-shrink, dan flex-basis adalah properties yang paling penting.",
            code: `/* Flex Grow: Berapa banyak item grow dari flex-basis */
.item-grow-0 { flex-grow: 0; }  /* Tidak grow */
.item-grow-1 { flex-grow: 1; }  /* Grow sama rata */
.item-grow-2 { flex-grow: 2; }  /* Grow 2x dari grow-1 */

/* Flex Shrink: Berapa banyak item shrink */
.item-shrink-0 { flex-shrink: 0; } /* Tidak shrink */
.item-shrink-1 { flex-shrink: 1; } /* Shrink normal */

/* Flex Basis: Ukuran default sebelum grow/shrink */
.item-basis-auto { flex-basis: auto; }      /* Default */
.item-basis-100 { flex-basis: 100px; }      /* Fixed 100px */
.item-basis-50 { flex-basis: 50%; }         /* 50% dari container */

/* Shorthand: flex: grow shrink basis */
.item-flex-default { flex: 0 1 auto; }  /* Default */
.item-flex-1 { flex: 1; }               /* 1 1 auto */
.item-flex-auto { flex: auto; }         /* 1 1 auto */

/* Align Self: Override align-items untuk item tertentu */
.item-align-start { align-self: flex-start; }
.item-align-center { align-self: center; }
.item-align-end { align-self: flex-end; }
.item-align-stretch { align-self: stretch; }

/* Praktik: 3 kolom yang equal width */
.three-columns {
  display: flex;
  gap: 20px;
}

.three-columns > div {
  flex: 1;  /* Semua kolom same width */
}`,
            duration: 12,
            keyPoints: [
              "flex-grow untuk mengisi ruang kosong",
              "flex-shrink untuk memperkecil item",
              "flex-basis untuk ukuran awal",
              "flex shorthand untuk combined properties",
              "align-self untuk override alignment",
            ],
          },
          {
            title: "🏗️ Real-World Flexbox Layouts",
            subtitle: "Practical examples dan patterns",
            content:
              "Mari kita lihat bagaimana Flexbox digunakan dalam aplikasi real-world. Dari navbar sampai card layouts, Flexbox adalah tool yang sangat berguna.",
            code: `/* Layout 1: Navigation Bar */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
}

.logo { font-size: 24px; font-weight: bold; }
.nav-links { display: flex; gap: 30px; list-style: none; }
.nav-links a { color: white; text-decoration: none; }

/* Layout 2: Hero Section dengan Image */
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  padding: 60px;
}

.hero-text { flex: 1; }
.hero-image { flex: 1; }
.hero-image img { width: 100%; }

/* Layout 3: Card Grid */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px;  /* Min 300px, grow to fill */
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
}

/* Layout 4: Center content (baik horizontal & vertical) */
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.center-box > div { text-align: center; color: white; }

/* Layout 5: Sidebar Layout */
.sidebar-layout {
  display: flex;
  gap: 20px;
  min-height: 100vh;
}

.sidebar { flex: 0 0 250px; background: #f5f5f5; }
.main { flex: 1; padding: 20px; }`,
            duration: 13,
            keyPoints: [
              "Navbar dengan space-between",
              "Hero sections dengan flex layout",
              "Card grids dengan flex-wrap",
              "Center content dengan justify-content center",
              "Sidebar layouts dengan flex: 0 0",
            ],
          },
        ],
      },
      "lesson-2-2": {
        title: "CSS Grid - Layout 2D yang Powerful",
        module: "🎨 Advanced Layout",
        duration: 55,
        steps: [
          {
            title: "📊 Pengenalan CSS Grid",
            subtitle: "Layout dua dimensi (rows & columns)",
            content:
              "CSS Grid adalah layout module untuk membuat layout dua dimensi dengan rows dan columns. Grid lebih powerful daripada Flexbox untuk layout kompleks yang membutuhkan alignment di dua arah.",
            code: `/* Basic Grid Setup */
.grid-container {
  display: grid;
  
  /* Definisikan kolom */
  grid-template-columns: 200px 1fr 150px;
  /* Atau: repeat(3, 1fr) - 3 equal columns */
  /* Atau: repeat(auto-fit, minmax(250px, 1fr)) - responsive */
  
  /* Definisikan baris */
  grid-template-rows: auto 1fr auto;
  
  /* Gap antara cells */
  gap: 20px;
  /* Atau: column-gap: 10px; row-gap: 20px; */
}

.grid-item {
  /* Item position */
  grid-column: 1 / 2;  /* Dari column 1 sampai 2 */
  grid-row: 1 / 2;     /* Dari row 1 sampai 2 */
  
  /* Atau gunakan span */
  grid-column: span 2;  /* Occupies 2 columns */
  grid-row: span 1;     /* Occupies 1 row */
}

<!-- HTML Example -->
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
</div>`,
            duration: 12,
            keyPoints: [
              "display: grid untuk enable grid layout",
              "grid-template-columns untuk kolom",
              "grid-template-rows untuk baris",
              "gap untuk spacing",
              "grid-column & grid-row untuk positioning",
            ],
          },
          {
            title: "📐 Grid Template & Sizing",
            subtitle: "Mendefinisikan kolom dan baris",
            content:
              "Ada banyak cara untuk mendefinisikan kolom dan baris dalam grid. Anda bisa menggunakan pixels, percentages, fractions (fr), atau kombinasi dari semuanya.",
            code: `/* Different column sizing approaches */

/* 1. Fixed sizes */
grid-template-columns: 200px 300px 100px;

/* 2. Flexible fractions (fr unit) */
grid-template-columns: 1fr 2fr 1fr;  /* 1:2:1 ratio */

/* 3. Mix fixed and flexible */
grid-template-columns: 200px 1fr 150px;

/* 4. Repeat function */
grid-template-columns: repeat(3, 1fr);        /* 3 equal columns */
grid-template-columns: repeat(2, 200px 1fr);  /* Pattern repeat */

/* 5. Auto fit & minmax (responsive) */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
/* Creates flexible columns, minimum 250px */

grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
/* Fills available space */

/* Named lines (advanced) */
grid-template-columns: [start] 200px [middle] 1fr [end];

/* Template areas (semantic) */
grid-template-columns: repeat(12, 1fr);
grid-template-rows: auto 1fr auto;
grid-template-areas:
  "header header header header header header header header header header header header"
  "sidebar main main main main main main main main main main main"
  "footer footer footer footer footer footer footer footer footer footer footer footer";

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }`,
            duration: 13,
            keyPoints: [
              "Fixed sizing dengan pixels",
              "Flexible sizing dengan fr units",
              "repeat() function untuk patterns",
              "auto-fit & minmax untuk responsive",
              "grid-template-areas untuk semantic layout",
            ],
          },
          {
            title: "🎯 Grid Alignment & Placement",
            subtitle: "Menempatkan dan align items dalam grid",
            content:
              "Grid memberikan kontrol penuh atas alignment dan placement. Anda bisa align items horizontal, vertical, atau keduanya dengan mudah.",
            code: `/* Container alignment */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 150px);
  
  /* Align items dalam cells (horizontal) */
  justify-items: center;  /* start, end, center, stretch */
  
  /* Align items dalam cells (vertical) */
  align-items: center;    /* start, end, center, stretch */
  
  /* Align entire grid dalam container (horizontal) */
  justify-content: center;
  
  /* Align entire grid dalam container (vertical) */
  align-content: center;
  
  gap: 10px;
}

/* Individual item placement */
.item {
  /* Column: Dimulai dari column 1, berakhir column 3 (span 2 columns) */
  grid-column: 1 / 3;
  grid-column: 1 / span 2;  /* Alternative syntax */
  
  /* Row: Dari row 1 ke row 2 */
  grid-row: 1 / 2;
  
  /* Self alignment (override container) */
  justify-self: center;
  align-self: center;
}

.item-span-2 {
  grid-column: span 2;  /* Span 2 columns */
}

.item-span-2-3 {
  grid-column: 2 / 4;   /* From column 2 to 4 */
  grid-row: 1 / 3;      /* From row 1 to 3 */
}

/* Shorthand */
.item {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  
  /* Equivalent to: */
  place-items: center;  /* justify-items + align-items */
}`,
            duration: 14,
            keyPoints: [
              "justify-items & align-items untuk cells",
              "justify-content & align-content untuk grid",
              "grid-column & grid-row untuk placement",
              "span keyword untuk occupying multiple cells",
              "place-items shorthand",
            ],
          },
          {
            title: "🏗️ Real-World Grid Layouts",
            subtitle: "Practical examples dari aplikasi nyata",
            content:
              "Mari kita lihat bagaimana CSS Grid digunakan dalam aplikasi real-world. Dari dashboards sampai online magazines, Grid adalah tool yang essential.",
            code: `/* Layout 1: Classic Sidebar Layout (12 column grid) */
.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  padding: 20px;
}

.sidebar { 
  grid-column: 1 / 3;  /* Occupy columns 1-2 */
  grid-row: 1 / -1;    /* Span all rows */
}

.main { 
  grid-column: 3 / -1;  /* Occupy columns 3 to end */
}

/* Layout 2: Magazine/Blog Grid */
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.featured-article {
  grid-column: 1 / 3;   /* Span 2 columns */
  grid-row: 1 / 3;      /* Span 2 rows */
}

/* Layout 3: Holy Grail Layout */
.holy-grail {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 10px;
}

header { grid-column: 1 / -1; }
nav { grid-column: 1; grid-row: 2; }
main { grid-column: 2; grid-row: 2; }
aside { grid-column: 3; grid-row: 2; }
footer { grid-column: 1 / -1; grid-row: 3; }

/* Layout 4: Responsive Grid (Mobile First) */
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;  /* Single column on mobile */
  }
  
  .sidebar { grid-column: 1 / -1; }
  .main { grid-column: 1 / -1; }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .dashboard {
    grid-template-columns: repeat(8, 1fr);
  }
}

@media (min-width: 1025px) {
  .dashboard {
    grid-template-columns: repeat(12, 1fr);
  }
}`,
            duration: 15,
            keyPoints: [
              "Sidebar layout dengan grid-column span",
              "Magazine layout dengan featured articles",
              "Holy Grail layout dengan header/footer",
              "Responsive grid dengan media queries",
              "Mobile-first approach",
            ],
          },
        ],
      },
      "lesson-3-1": {
        title: "Responsive Design & Mobile-First",
        module: "📱 Modern Web Design",
        duration: 45,
        steps: [
          {
            title: "📱 Pengantar Responsive Design",
            subtitle: "Website yang berfungsi di semua device",
            content:
              "Responsive design membuat website tampil sempurna di desktop, tablet, dan mobile. Dengan mobile-first approach, kita mulai dengan design untuk mobile, kemudian expand untuk screen yang lebih besar.",
            code: `<!-- Mobile-first HTML -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- CSS: Mobile First (default styles untuk mobile) -->
body {
  font-size: 14px;
  padding: 10px;
}

.container {
  display: grid;
  grid-template-columns: 1fr;  /* Single column on mobile */
  gap: 10px;
}

.card {
  padding: 15px;
  border-radius: 8px;
}

/* Media query: Tablet (768px and up) */
@media (min-width: 768px) {
  body { font-size: 16px; padding: 20px; }
  .container { grid-template-columns: repeat(2, 1fr); }
}

/* Media query: Desktop (1024px and up) */
@media (min-width: 1024px) {
  body { font-size: 18px; padding: 30px; }
  .container { grid-template-columns: repeat(3, 1fr); }
}

/* Utility classes untuk responsive */
.hidden-mobile { display: none; }
@media (min-width: 768px) {
  .hidden-mobile { display: block; }
  .hidden-desktop { display: none; }
}`,
            duration: 10,
            keyPoints: [
              "Viewport meta tag essential",
              "Mobile-first approach",
              "Media queries untuk breakpoints",
              "Common breakpoints: 768px, 1024px, 1440px",
              "Responsive units: %, em, rem, vw",
            ],
          },
          {
            title: "🔧 Media Queries & Breakpoints",
            subtitle: "Mengatur style untuk device berbeda",
            content:
              "Media queries memungkinkan kita mengubah styling berdasarkan karakteristik device seperti width, height, orientation. Breakpoints adalah width tertentu di mana layout berubah.",
            code: `/* Common Media Query Syntax */

/* Min-width (mobile first) */
@media (min-width: 768px) {
  /* Styles untuk tablet and up */
}

/* Max-width (desktop first - not recommended) */
@media (max-width: 767px) {
  /* Styles untuk mobile only */
}

/* Multiple conditions */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Styles untuk tablet only */
}

/* Device orientation */
@media (orientation: portrait) {
  /* Portrait orientation */
}

@media (orientation: landscape) {
  /* Landscape orientation */
}

/* Common Breakpoints */
/*
Mobile (xs): < 480px
Small (sm): 480px - 767px
Tablet (md): 768px - 1023px
Desktop (lg): 1024px - 1439px
Wide (xl): 1440px+
*/

/* Responsive typography */
body {
  font-size: 14px;      /* Mobile */
}

@media (min-width: 768px) {
  body { font-size: 16px; }  /* Tablet */
}

@media (min-width: 1024px) {
  body { font-size: 18px; }  /* Desktop */
}

/* Responsive spacing */
.container {
  padding: 10px;        /* Mobile */
  margin: 0 auto;
  max-width: 100%;
}

@media (min-width: 768px) {
  .container {
    padding: 20px;
    max-width: 750px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 30px;
    max-width: 960px;
  }
}

@media (min-width: 1440px) {
  .container {
    padding: 40px;
    max-width: 1200px;
  }
}`,
            duration: 12,
            keyPoints: [
              "min-width untuk mobile-first",
              "max-width untuk desktop-first",
              "Multiple conditions dengan and",
              "Orientation untuk portrait/landscape",
              "Common breakpoints pattern",
            ],
          },
          {
            title: "📏 Responsive Units & Patterns",
            subtitle: "CSS units yang responsive",
            content:
              "Menggunakan unit yang tepat adalah kunci responsive design. Hindari fixed pixels, gunakan relative units seperti percentage, em, rem, dan viewport units.",
            code: `/* Responsive Units */

/* Percentage: Relative to parent */
.container { width: 80%; }      /* 80% of parent width */
.sidebar { width: 25%; }        /* 25% of parent */

/* Em: Relative to font-size of element */
body { font-size: 16px; }
.heading { font-size: 2em; }    /* 32px (2 × 16px) */
.text { padding: 1em; }         /* 16px padding */

/* Rem: Relative to root font-size */
html { font-size: 16px; }
body { font-size: 1rem; }       /* 16px */
.heading { font-size: 2rem; }   /* 32px */
.text { padding: 1rem; }        /* 16px */

/* Viewport Units */
.full-screen { width: 100vw; height: 100vh; }  /* Full viewport */
.half-screen { width: 50vw; }                   /* Half width */
.quarter-height { height: 25vh; }               /* Quarter height */

/* Max/min width for fluid sizing */
.container {
  width: 90%;           /* 90% on mobile */
  max-width: 1200px;    /* Cap at 1200px */
  margin: 0 auto;       /* Center */
}

/* Responsive Images */
img {
  max-width: 100%;      /* Never bigger than container */
  height: auto;         /* Maintain aspect ratio */
  display: block;
}

/* Fluid Typography */
h1 {
  font-size: clamp(24px, 5vw, 48px);  /* Min 24px, 5% of viewport, max 48px */
}

p {
  font-size: clamp(14px, 1.5vw, 18px);
}

/* Best Practices */
:root { font-size: 16px; }  /* Base font size */
html { scroll-behavior: smooth; }
*, *::before, *::after { box-sizing: border-box; }  /* Include padding in width */`,
            duration: 13,
            keyPoints: [
              "% untuk relative to parent width",
              "em untuk relative to current font-size",
              "rem untuk relative to root font-size",
              "vw/vh untuk viewport units",
              "clamp() untuk fluid sizing",
            ],
          },
        ],
      },
    };

    return (
      structures[lessonId] || {
        title: lesson.title || "Pelajaran Web Development",
        module: lesson.module || "📚 Pembelajaran",
        duration: lesson.duration || 45,
        steps: [
          {
            title: "📖 Pengantar",
            subtitle: "Memahami konsep dasar dan fondasi pembelajaran",
            content:
              "Mari kita pelajari topik ini dari awal. Dalam bagian ini, kita akan membahas konsep fundamental yang akan menjadi dasar untuk pembelajaran lebih lanjut. Pastikan Anda memahami setiap bagian dengan baik sebelum melanjutkan ke topik berikutnya.",
            code: `// Contoh kode untuk topik ini
// Akan ditampilkan sesuai dengan materi pembelajaran
console.log('Mari kita mulai belajar!');

// Tips:
// 1. Pahami konsep fundamental
// 2. Praktik dengan code examples
// 3. Tanya AI jika ada yang tidak jelas
// 4. Lakukan exercises untuk memperkuat pemahaman`,
            duration: 10,
            keyPoints: [
              "Pahami konsep dasar topik pembelajaran",
              "Ikuti setiap langkah dengan teliti",
              "Praktik dengan code examples yang disediakan",
            ],
          },
          {
            title: "💡 Konsep Inti",
            subtitle: "Pembelajaran mendalam tentang topik utama",
            content:
              "Sekarang kita masuk ke konsep inti dari topik ini. Bagian ini akan menjelaskan bagaimana konsep-konsep tersebut bekerja, mengapa penting, dan bagaimana menggunakannya dalam praktik. Perhatikan setiap detail dan jangan ragu untuk menggunakan AI assistant jika ada yang kurang jelas.",
            code: `// Implementasi konsep inti
// Contoh ini menunjukkan cara menerapkan konsep yang telah dipelajari

function contohPembelajaran() {
  // Langkah 1: Pahami fondasi
  // Langkah 2: Terapkan konsep
  // Langkah 3: Praktik dan eksperimen
  // Langkah 4: Minta feedback
  
  return 'Pembelajaran efektif membutuhkan praktek!';
}

// Gunakan 🤖 AI Assistant untuk membantu!
// Pilih mode: 💡 Jelaskan, ✏️ Latihan, atau 🗣️ Tanya`,
            duration: 12,
            keyPoints: [
              "Memahami cara kerja konsep dalam praktik",
              "Mengidentifikasi use case dan aplikasi",
              "Mengenal best practices dan common patterns",
            ],
          },
          {
            title: "🔧 Implementasi Praktis",
            subtitle: "Menerapkan pembelajaran dalam proyek nyata",
            content:
              "Sekarang saatnya untuk mengimplementasikan apa yang telah kita pelajari dalam situasi nyata. Bagian ini menunjukkan bagaimana menggunakan konsep-konsep ini dalam proyek sebenarnya. Ikuti setiap langkah dan coba untuk memahami logic di balik setiap kode.",
            code: `// Contoh implementasi praktis
// Ini adalah kode yang bisa langsung Anda gunakan

class LearningExercise {
  constructor() {
    this.topik = 'Web Development';
    this.progress = 0;
  }
  
  belajar() {
    this.progress += 10;
    console.log(\`Progress: \${this.progress}%\`);
  }
  
  selesai() {
    return this.progress === 100;
  }
}

// Mari kita terapkan!
const pembelajaran = new LearningExercise();
pembelajaran.belajar();`,
            duration: 15,
            keyPoints: [
              "Mengimplementasikan konsep dalam kode nyata",
              "Mengatasi challenge dan debugging",
              "Optimisasi dan best practices",
            ],
          },
          {
            title: "✅ Review & Latihan",
            subtitle: "Menguji pemahaman dan memperkuat pembelajaran",
            content:
              "Bagian terakhir ini untuk memastikan Anda telah memahami semua konsep dengan baik. Kami akan melakukan review singkat dan memberikan beberapa exercise untuk memperkuat pemahaman Anda. Jika ada yang masih kurang jelas, gunakan AI assistant untuk membantu.",
            code: `// Exercise untuk memperkuat pemahaman

// Exercise 1: Terapkan konsep dasar
// TODO: Tulis kode untuk mendemonstrasikan konsep yang telah dipelajari

// Exercise 2: Buat contoh sendiri
// TODO: Modifikasi code example dan eksperimen

// Exercise 3: Pecahkan masalah
// TODO: Gunakan pengetahuan untuk menyelesaikan masalah

// Tips untuk sukses:
// ✓ Pahami setiap line of code
// ✓ Coba modifikasi dan lihat hasilnya
// ✓ Gunakan console untuk debug
// ✓ Tanya AI jika stuck

console.log('Selamat! Anda telah menyelesaikan pembelajaran.');`,
            duration: 8,
            keyPoints: [
              "Review semua konsep yang telah dipelajari",
              "Latih dengan exercises yang disediakan",
              "Siap untuk melanjutkan ke topik berikutnya",
            ],
          },
        ],
      }
    );
  };

  const structure = getLearningStructure(lesson.id);
  const currentLessonStep = structure.steps[currentStep];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.3;
        if (newProgress >= 100) {
          if (currentStep < structure.steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setProgress(0);
            setCompletedSteps((s) =>
              s.includes(currentStep) ? s : [...s, currentStep]
            );
          } else {
            setIsPlaying(false);
          }
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, structure.steps.length, completedSteps]);

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
    setProgress(0);
    setIsPlaying(false);
  };

  const handleReplay = () => {
    // Replay current step from start
    setProgress(0);
    setIsPlaying(true);
  };

  const handleBack = () => {
    // If more than a little progress, rewind within the step; otherwise go to previous step
    setIsPlaying(false);
    setProgress((prev) => {
      if (prev > 8) {
        // rewind 10%
        return Math.max(0, prev - 10);
      }
      if (currentStep > 0) {
        setCurrentStep((s) => Math.max(0, s - 1));
        return 0;
      }
      return 0;
    });
  };

  // Persist progress & completed steps per lesson in localStorage
  useEffect(() => {
    try {
      const key = `wedev:lesson:${lesson.id}:state`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.currentStep === "number")
          setCurrentStep(parsed.currentStep);
        if (typeof parsed.progress === "number") setProgress(parsed.progress);
        if (Array.isArray(parsed.completedSteps))
          setCompletedSteps(parsed.completedSteps);
      }
    } catch (e) {
      // ignore parse errors
    }

    // If user has a server token, try to load remote progress and merge
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        // dynamic import to avoid failing when API not available
        const api = await import("./api_node");
        const res = await api.loadLessonProgress(lesson.id);
        if (res && res.ok && res.progress) {
          const p = res.progress;
          if (typeof p.currentStep === "number") setCurrentStep(p.currentStep);
          if (typeof p.progress === "number") setProgress(p.progress);
          if (Array.isArray(p.completedSteps))
            setCompletedSteps(p.completedSteps);
        }
      } catch (e) {
        // ignore server errors
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id]);

  useEffect(() => {
    try {
      const key = `wedev:lesson:${lesson.id}:state`;
      const payload = {
        currentStep,
        progress,
        completedSteps,
        updatedAt: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(payload));
    } catch (e) {
      // ignore quota errors
    }
  }, [lesson.id, currentStep, progress, completedSteps]);

  // Debounced server sync
  useEffect(() => {
    let t = null;
    const doSave = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; // only sync for authenticated users
        const api = await import("./api_node");
        await api.saveLessonProgress(lesson.id, {
          currentStep,
          progress,
          completedSteps,
        });
      } catch (e) {
        // ignore
      }
    };

    // schedule save after user stops changing for 1s
    t = setTimeout(doSave, 1000);
    return () => clearTimeout(t);
  }, [lesson.id, currentStep, progress, completedSteps]);

  // Keyboard shortcuts: Space = play/pause, ArrowLeft = back, ArrowRight = forward small, R = replay
  useEffect(() => {
    const handler = (e) => {
      // don't trigger when typing in inputs
      const t = e.target;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleBack();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        // small forward jump or next step when near end
        setProgress((prev) => {
          const next = Math.min(100, prev + 12);
          if (next >= 100) {
            if (currentStep < structure.steps.length - 1) {
              setCurrentStep((s) => s + 1);
              setCompletedSteps((s) =>
                s.includes(currentStep) ? s : [...s, currentStep]
              );
              return 0;
            }
            setIsPlaying(false);
            return 100;
          }
          return next;
        });
      }
      if (e.key && e.key.toLowerCase() === "r") {
        e.preventDefault();
        handleReplay();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentStep, structure.steps.length]);

  // Handle AI mode requests with contextual data
  const handleAiModeRequest = async () => {
    setAiLoading(true);
    setAiResponse(null);
    try {
      const api = await import("./api_node");
      const textContent =
        currentLessonStep.title +
        "\n\n" +
        currentLessonStep.subtitle +
        "\n\n" +
        currentLessonStep.content +
        "\n\n" +
        (currentLessonStep.code || "");

      let result;
      if (aiMode === "summarize") {
        result = await api.summarizeWithAI(textContent, "summarize", "id");
      } else if (aiMode === "explain") {
        result = await api.explainConcept(textContent, "id");
      } else if (aiMode === "quiz") {
        result = await api.generateQuiz(textContent, "id");
      } else if (aiMode === "practice") {
        result = await api.generatePractice(textContent, "id");
      } else if (aiMode === "ask" && aiQuestion.trim()) {
        result = await api.askAI(aiQuestion, textContent, "id");
      }

      // Extract response text from various formats
      const responseText =
        result?.summary ||
        result?.content ||
        result?.response ||
        result?.practice ||
        result?.quiz ||
        (result?.raw &&
          (result.raw.choices?.[0]?.message?.content ||
            result.raw.choices?.[0]?.text)) ||
        JSON.stringify(result);

      setAiResponse(responseText);
    } catch (e) {
      console.error("AI Error:", e);
      setAiResponse(
        `Maaf, terjadi kesalahan: ${e.message || "Coba lagi nanti."}`
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      {/* Main Video Area */}
      <div
        className={`${
          isFullscreen
            ? "w-full h-full"
            : "rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
        } ${
          dark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 to-slate-100"
        }`}
      >
        {/* Video Content */}
        <div
          className={`${
            isFullscreen
              ? "w-full h-full flex flex-col"
              : "aspect-video overflow-y-auto"
          } bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-pink-600 relative`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 18, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.995 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex-1 flex flex-col justify-between p-4 sm:p-8 text-white overflow-y-auto"
            >
              {/* Header dengan animasi */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="flex-1">
                    {/* Step indicator dengan badge animasi */}
                    <motion.p
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-xs sm:text-sm text-white/70 font-medium mb-1 inline-block bg-white/10 px-3 py-1 rounded-full"
                    >
                      ✨ Langkah {currentStep + 1} dari {structure.steps.length}
                    </motion.p>

                    {/* Title dengan animasi */}
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-lg sm:text-3xl font-bold mt-3 mb-2"
                    >
                      {currentLessonStep.title}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-xs sm:text-sm text-white/80"
                    >
                      {currentLessonStep.subtitle}
                    </motion.p>
                  </div>

                  {/* Duration badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                    className="text-right ml-4 flex-shrink-0 bg-white/10 p-3 sm:p-4 rounded-lg backdrop-blur"
                  >
                    <p className="text-2xl sm:text-4xl font-bold">
                      {currentLessonStep.duration}
                    </p>
                    <p className="text-xs sm:text-sm text-white/70">menit</p>
                  </motion.div>
                </div>

                {/* Content dengan formatting yang lebih baik */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mb-6"
                >
                  <p className="text-xs sm:text-base leading-relaxed max-w-2xl whitespace-pre-wrap">
                    {currentLessonStep.content}
                  </p>
                </motion.div>

                {/* Key Points dengan animasi stagger */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                >
                  {currentLessonStep.keyPoints.map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: idx * 0.08,
                        duration: 0.36,
                        ease: "easeOut",
                      }}
                      className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-2 sm:p-3"
                    >
                      <p className="text-xs sm:text-sm">✓ {point}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Bottom: Show more button + AI summarize */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="flex-1 sm:flex-none bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 rounded-lg px-4 py-2 text-xs sm:text-sm text-white font-semibold transition w-full sm:w-auto"
                >
                  {showTranscript
                    ? "Sembunyikan Kode"
                    : "Lihat Kode & Contoh →"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setAiMode("summarize");
                    setAiModalOpen(true);
                    setAiLoading(true);
                    setAiResponse(null);
                    setAiQuestion("");
                    // Trigger AI request after state is set
                    setTimeout(handleAiModeRequest, 100);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2 text-xs sm:text-sm text-white font-semibold transition"
                >
                  {aiLoading ? "Memproses…" : "🤖 AI"}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Code Panel */}
          <AnimatePresence>
            {showTranscript && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-white/20 bg-black/20 backdrop-blur overflow-y-auto max-h-48 sm:max-h-64"
              >
                <div className="p-3 sm:p-4">
                  <pre className="text-xs sm:text-sm font-mono text-white/90 whitespace-pre-wrap break-words">
                    <code>{currentLessonStep.code}</code>
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls Bar */}
        <div
          className={`border-t ${
            dark
              ? "border-slate-800 bg-slate-800/50"
              : "border-slate-200 bg-white/50"
          } backdrop-blur p-4 sm:p-6 space-y-4 sm:space-y-0`}
        >
          {/* Progress Bar dengan glow effect */}
          <div className="mb-4 space-y-2">
            <div className="h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden relative shadow-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 shadow-lg shadow-pink-400/50 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.5 }}
              />
            </div>

            {/* Progress text dengan real-time update */}
            <motion.p
              className="text-xs text-white/60 font-medium"
              animate={{ opacity: [0.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Progres: {Math.round(progress)}% • Langkah {currentStep + 1}/
              {structure.steps.length}
            </motion.p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
            {/* Play / Replay / Back */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                aria-label="Back"
                className={`p-2 sm:p-3 rounded-lg ${
                  dark
                    ? "bg-slate-700 hover:bg-slate-600"
                    : "bg-slate-200 hover:bg-slate-300"
                } text-lg transition`}
              >
                ◀️
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReplay}
                aria-label="Replay"
                className="p-2 sm:p-3 rounded-lg bg-white/10 hover:bg-white/20 text-lg transition"
              >
                ↺
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label="Play or pause"
                className="p-2 sm:p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition text-lg"
              >
                {isPlaying ? "⏸️" : "▶️"}
              </motion.button>

              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-2 sm:px-3 py-1">
                <span className="text-sm">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-12 sm:w-20 h-1 rounded-full cursor-pointer"
                />
              </div>
            </div>

            {/* Steps Navigation */}
            <div className="flex items-center gap-1 flex-wrap">
              {structure.steps.map((step, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleStepClick(idx)}
                  whileHover={{ scale: 1.1 }}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-semibold transition ${
                    currentStep === idx
                      ? "bg-indigo-600 text-white"
                      : completedSteps.includes(idx)
                      ? "bg-green-600 text-white"
                      : `${
                          dark
                            ? "bg-slate-700 text-slate-300"
                            : "bg-slate-200 text-slate-700"
                        }`
                  }`}
                >
                  {completedSteps.includes(idx) ? "✓" : idx + 1}
                </motion.button>
              ))}
            </div>

            {/* Fullscreen */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={`p-2 sm:p-3 rounded-lg ${
                dark
                  ? "bg-slate-700 hover:bg-slate-600"
                  : "bg-slate-200 hover:bg-slate-300"
              } transition text-lg`}
            >
              {isFullscreen ? "🗗" : "⛶"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* AI Modal with Mode Selection */}
      <AnimatePresence>
        {aiModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4"
          >
            <motion.div
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className={`max-w-2xl w-full ${
                dark ? "bg-slate-900" : "bg-white"
              } rounded-lg shadow-2xl p-4 sm:p-6`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h4 className="font-bold text-base sm:text-lg">
                  🤖 Asisten AI
                </h4>
                <button
                  onClick={() => {
                    setAiModalOpen(false);
                    setAiResponse(null);
                    setAiQuestion("");
                  }}
                  className="text-xs sm:text-sm px-3 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded text-slate-800 dark:text-slate-200"
                >
                  Tutup
                </button>
              </div>

              {/* Mode Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
                {[
                  {
                    id: "summarize",
                    label: "📋 Ringkas",
                    desc: "Ringkasan singkat",
                  },
                  {
                    id: "explain",
                    label: "💡 Jelaskan",
                    desc: "Penjelasan detail",
                  },
                  {
                    id: "quiz",
                    label: "❓ Kuis",
                    desc: "Pertanyaan & jawaban",
                  },
                  {
                    id: "practice",
                    label: "✏️ Latihan",
                    desc: "Soal praktik",
                  },
                  { id: "ask", label: "🗣️ Tanya", desc: "Pertanyaan bebas" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setAiMode(mode.id);
                      setAiResponse(null);
                      setAiQuestion("");
                    }}
                    className={`px-2 py-2 rounded text-xs sm:text-sm font-semibold transition ${
                      aiMode === mode.id
                        ? "bg-indigo-600 text-white"
                        : dark
                        ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                    title={mode.desc}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {/* Mode-specific input (for "ask" mode) */}
              {aiMode === "ask" && !aiLoading && !aiResponse && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Tanyakan sesuatu tentang pelajaran ini…"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && aiQuestion.trim()) {
                        handleAiModeRequest();
                      }
                    }}
                    className={`w-full px-3 py-2 rounded border text-sm ${
                      dark
                        ? "bg-slate-800 border-slate-700 text-white"
                        : "bg-white border-slate-300 text-slate-900"
                    }`}
                  />
                  <button
                    onClick={handleAiModeRequest}
                    disabled={!aiQuestion.trim()}
                    className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-semibold py-2 rounded text-sm transition"
                  >
                    Kirim Pertanyaan
                  </button>
                </div>
              )}

              {/* Response Display */}
              <div
                className={`rounded border p-3 sm:p-4 max-h-96 overflow-y-auto ${
                  dark
                    ? "bg-slate-800 border-slate-700"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                {aiLoading ? (
                  <p
                    className={`text-sm ${
                      dark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {aiMode === "summarize" && "Membuat ringkasan…"}
                    {aiMode === "explain" && "Menjelaskan konsep…"}
                    {aiMode === "quiz" && "Membuat kuis…"}
                    {aiMode === "practice" && "Membuat soal latihan…"}
                    {aiMode === "ask" && "Menjawab pertanyaan Anda…"}
                  </p>
                ) : aiResponse ? (
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {typeof aiResponse === "string"
                      ? aiResponse
                      : aiResponse.content ||
                        aiResponse.response ||
                        JSON.stringify(aiResponse)}
                  </div>
                ) : (
                  <p
                    className={`text-sm ${
                      dark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Pilih mode dan klik tombol untuk memulai.
                  </p>
                )}
              </div>

              {/* Action Button */}
              {!aiLoading && aiResponse && aiMode !== "ask" && (
                <button
                  onClick={() => {
                    setAiResponse(null);
                    setAiQuestion("");
                  }}
                  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded text-sm transition"
                >
                  Mode Lain
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Learning Summary */}
      {!isFullscreen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 sm:mt-6 rounded-xl sm:rounded-2xl p-4 sm:p-6 ${
            dark ? "bg-slate-800" : "bg-slate-50"
          } border ${dark ? "border-slate-700" : "border-slate-200"}`}
        >
          <h3 className="font-bold text-sm sm:text-lg mb-4">
            📚 Ringkasan Pembelajaran
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div
              className={`p-3 sm:p-4 rounded-lg ${
                dark ? "bg-slate-700/50" : "bg-white"
              }`}
            >
              <p className="text-xs text-slate-500 mb-1">Modul</p>
              <p className="font-bold text-sm sm:text-base">
                {structure.module}
              </p>
            </div>

            <div
              className={`p-3 sm:p-4 rounded-lg ${
                dark ? "bg-slate-700/50" : "bg-white"
              }`}
            >
              <p className="text-xs text-slate-500 mb-1">Progress</p>
              <p className="font-bold text-sm sm:text-base">
                {Math.round(
                  ((currentStep + 1 + progress / 100) /
                    structure.steps.length) *
                    100
                )}
                % Selesai
              </p>
            </div>

            <div
              className={`p-3 sm:p-4 rounded-lg ${
                dark ? "bg-slate-700/50" : "bg-white"
              }`}
            >
              <p className="text-xs text-slate-500 mb-1">Total Durasi</p>
              <p className="font-bold text-sm sm:text-base">
                {structure.steps.reduce((a, b) => a + b.duration, 0)} menit
              </p>
            </div>

            <div
              className={`p-3 sm:p-4 rounded-lg ${
                dark ? "bg-slate-700/50" : "bg-white"
              }`}
            >
              <p className="text-xs text-slate-500 mb-1">Langkah Selesai</p>
              <p className="font-bold text-sm sm:text-base">
                {completedSteps.length} dari {structure.steps.length}
              </p>
            </div>
          </div>

          {/* Topics Covered */}
          <div className="mt-4 sm:mt-6">
            <p className="text-xs font-bold text-slate-500 mb-2 uppercase">
              Topik yang Dipelajari
            </p>
            <div className="flex flex-wrap gap-2">
              {structure.steps.map((step, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-3 py-1.5 rounded-full ${
                    currentStep >= idx
                      ? "bg-indigo-600 text-white"
                      : `${
                          dark
                            ? "bg-slate-700 text-slate-300"
                            : "bg-slate-200 text-slate-700"
                        }`
                  }`}
                >
                  {step.title.split(" ").slice(0, 2).join(" ")}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
