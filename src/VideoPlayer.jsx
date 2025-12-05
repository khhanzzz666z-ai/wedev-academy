import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function VideoPlayer({ lesson, dark }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(lesson.duration);
  const [volume, setVolume] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Simulated video content based on lesson
  const getVideoContent = (lessonId, title) => {
    const contents = {
      "lesson-1-1": {
        title: "Pengenalan HTML - Struktur Dasar Web",
        topics: [
          "Apa itu HTML?",
          "Tag-tag penting (html, head, body)",
          "Semantic HTML",
          "Aksesibilitas web",
        ],
        codeExample: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Halaman Pertama Saya</title>
</head>
<body>
  <header>
    <h1>Selamat Datang!</h1>
  </header>
  <main>
    <p>Ini adalah paragraf pertama saya</p>
  </main>
</body>
</html>`,
      },
      "lesson-1-2": {
        title: "CSS Styling Fundamentals - Desain Indah",
        topics: [
          "Selector CSS",
          "Box Model (margin, padding, border)",
          "Flexbox untuk layout",
          "CSS Grid system",
        ],
        codeExample: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.card {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
}`,
      },
      "lesson-1-3": {
        title: "JavaScript Basics - Interaktivitas Web",
        topics: [
          "Variables (let, const, var)",
          "Data types",
          "Functions dan Arrow functions",
          "Async/Await dan Promises",
        ],
        codeExample: `// Variables
const name = "John";
let age = 25;

// Function
function greet(person) {
  return \`Hello, \${person}!\`;
}

// Arrow function
const add = (a, b) => a + b;

// Async function
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
      },
      "lesson-1-4": {
        title: "React Introduction - Framework Modern",
        topics: [
          "Component dan JSX",
          "Props dan State",
          "React Hooks (useState, useEffect)",
          "Event handling",
        ],
        codeExample: `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`,
      },
      "lesson-1-5": {
        title: "Advanced React Patterns - Optimasi & Best Practices",
        topics: [
          "Custom Hooks",
          "Context API",
          "Performance optimization",
          "Code splitting",
        ],
        codeExample: `// Custom Hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}

// Context
const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <YourApp />
    </ThemeContext.Provider>
  );
}`,
      },
      "lesson-2-1": {
        title: "Node.js Fundamentals - Runtime JavaScript di Server",
        topics: [
          "Node.js architecture",
          "Event loop dan asynchronous",
          "File system operations",
          "Module system",
        ],
        codeExample: `// File system operations
const fs = require('fs');

// Read file
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Write file
fs.writeFile('output.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('File written');
});

// Modules
const myModule = require('./myModule');
console.log(myModule.greet('World'));`,
      },
      "lesson-2-2": {
        title: "Express.js Framework - Web Server & Routing",
        topics: [
          "Express basics",
          "Routing (GET, POST, PUT, DELETE)",
          "Middleware",
          "Error handling",
        ],
        codeExample: `const express = require('express');
const app = express();

app.use(express.json());

// GET route
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

// POST route
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json(newUser);
});

// Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
      },
      "lesson-2-3": {
        title: "RESTful APIs - Desain API yang Baik",
        topics: [
          "REST principles",
          "HTTP methods",
          "Status codes",
          "API documentation",
        ],
        codeExample: `// RESTful API endpoints
// GET /api/courses - Get all courses
// GET /api/courses/:id - Get specific course
// POST /api/courses - Create new course
// PUT /api/courses/:id - Update course
// DELETE /api/courses/:id - Delete course

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  res.json(course);
});

app.post('/api/courses', (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'Title required' });
  }
  const newCourse = { ...req.body, id: Date.now() };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});`,
      },
      "lesson-2-4": {
        title: "Authentication & Security - Proteksi Data",
        topics: [
          "Password hashing (bcrypt)",
          "JWT tokens",
          "CORS configuration",
          "Rate limiting",
        ],
        codeExample: `const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Login endpoint
app.post('/login', async (req, res) => {
  const user = users.find(u => u.email === req.body.email);
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '7d' });
  res.json({ token });
});

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    req.user = jwt.verify(token, 'secret_key');
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};`,
      },
      "lesson-2-5": {
        title: "Database Integration - Simpan Data",
        topics: [
          "SQL basics",
          "Database queries",
          "ORM (Sequelize)",
          "Relationships",
        ],
        codeExample: `const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password');

const User = sequelize.define('User', {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  fullName: DataTypes.STRING,
});

const Course = sequelize.define('Course', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
});

User.hasMany(Course);
Course.belongsTo(User);

// Query
const user = await User.findByPk(1);
const courses = await user.getCourses();`,
      },
    };

    return (
      contents[lessonId] || {
        title: title,
        topics: [
          "Pengenalan konsep",
          "Aplikasi praktis",
          "Best practices",
          "Contoh kode",
        ],
        codeExample: "// Code example akan ditampilkan di sini",
      }
    );
  };

  const videoContent = getVideoContent(lesson.id, lesson.title);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate video playing
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5;
        });
      }, 100);
    }
  };

  return (
    <div
      className={`rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      {/* Video Player Container */}
      <div
        className={`${
          isFullscreen ? "w-full h-full" : "aspect-video"
        } bg-gradient-to-br from-slate-900 to-slate-800 relative group`}
      >
        {/* Video Background with Animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: isPlaying ? ["0% 0%", "100% 100%"] : "0% 0%",
          }}
          transition={{ duration: 10, repeat: isPlaying ? Infinity : 0 }}
          style={{
            background: isPlaying
              ? "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.3))"
              : "linear-gradient(135deg, rgba(15,23,42,0.5), rgba(30,41,59,0.5))",
            backgroundSize: "200% 200%",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8">
          {/* Play Button */}
          {!isPlaying && (
            <motion.button
              onClick={handlePlayPause}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mb-4 sm:mb-8 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-4xl sm:text-6xl hover:bg-white/30 transition"
            >
              ▶️
            </motion.button>
          )}

          {/* Lesson Info */}
          <div className="text-center max-w-2xl">
            <h2 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">
              {videoContent.title}
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mb-4 sm:mb-6">
              {videoContent.topics.join(" • ")}
            </p>

            {/* Duration */}
            <div className="text-white/60 text-xs sm:text-sm font-medium">
              📺 {lesson.duration} menit pembelajaran
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition">
          {/* Progress Bar */}
          <div className="mb-2 sm:mb-3">
            <div className="h-1 sm:h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-white/70 mt-1 flex justify-between">
              <span>{Math.floor((progress / 100) * lesson.duration)}m</span>
              <span>{lesson.duration}m</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayPause}
                className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-lg sm:text-xl"
              >
                {isPlaying ? "⏸️" : "▶️"}
              </button>

              <div className="flex items-center gap-1 bg-white/10 rounded-lg px-2 py-1">
                <span className="text-xs sm:text-sm text-white">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-12 sm:w-16 h-1 rounded-full"
                />
              </div>
            </div>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-lg sm:text-xl"
            >
              {isFullscreen ? "🗗" : "⛶"}
            </button>
          </div>
        </div>
      </div>

      {/* Content Below Video */}
      {!isFullscreen && (
        <div className={`p-4 sm:p-6 ${dark ? "bg-slate-800" : "bg-slate-50"}`}>
          {/* Topics */}
          <div className="mb-6">
            <h3 className="font-bold text-sm sm:text-lg mb-3">
              📚 Topik Pelajaran:
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {videoContent.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
                    dark
                      ? "bg-slate-700/50 text-slate-100"
                      : "bg-white text-slate-900"
                  }`}
                >
                  ✓ {topic}
                </div>
              ))}
            </div>
          </div>

          {/* Code Example */}
          <div>
            <h3 className="font-bold text-sm sm:text-lg mb-3">
              💻 Contoh Kode:
            </h3>
            <div
              className={`rounded-lg p-3 sm:p-4 overflow-x-auto ${
                dark
                  ? "bg-slate-900 text-slate-100"
                  : "bg-slate-900 text-slate-100"
              }`}
            >
              <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap break-words">
                <code>{videoContent.codeExample}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
