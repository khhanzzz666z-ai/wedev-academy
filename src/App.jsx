import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AuthComponent from "./AuthComponent";
import AdminLoginPage from "./AdminLoginPage";
import CourseLearningPage from "./CourseLearningPage";
import UserDashboard from "./UserDashboard";
import {
  getAllCourses,
  enrollUserInCourse,
  isUserEnrolled,
  isTrialActive,
  getTrialDaysRemaining,
  getCoursesByUserEnrollment,
} from "./database";

function ChatBotBubble({ dark, position = "bottom-right" }) {
  const [showWA, setShowWA] = useState(true);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: "Halo! Saya asisten WebDev Academy — tanya tentang kursus, contoh kode, atau debugging.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (open && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, open]);

  const quickReplies = [
    "Bagaimana memulai React?",
    "Rekomendasi kursus frontend",
    "Cara deploy ke Vercel",
  ];

  function getLocalReply(text) {
    const t = (text || "").toLowerCase();
    if (t.includes("react"))
      return "Mulai dengan komponen, state, dan hooks. Saran: kursus Frontend Mastery di platform kami.";
    if (t.includes("deploy") || t.includes("vercel"))
      return "Untuk deploy ke Vercel, buat akun, hubungkan repo Git, dan push ke main. Vercel otomatis deploy.";
    if (t.includes("backend") || t.includes("api"))
      return "Pelajari Node.js dan Express untuk membuat API. Gunakan Postman untuk testing.";
    if (t.includes("css") || t.includes("html"))
      return "Mulai dari struktur HTML dan box model, lalu pelajari Flexbox dan Grid untuk layout.";
    return "Maaf, saya belum tahu jawaban spesifik untuk itu. Coba tanyakan dengan lebih detail atau lihat kursus terkait di daftar kursus.";
  }

  function sendMessageLocal(text) {
    if (!text || !text.trim()) return;
    const userMsg = { id: Date.now(), from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const reply = getLocalReply(text);
      const botMsg = { id: Date.now() + 1, from: "bot", text: reply };
      setMessages((m) => [...m, botMsg]);
      setLoading(false);
    }, 700);
  }

  function handleSendClick() {
    sendMessageLocal(input);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendClick();
    }
  }

  const posClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
    "center-right": "bottom-1/3 right-6",
  };

  const posClass = posClasses[position] || posClasses["bottom-right"];

  return (
    <div className={`fixed z-50 flex flex-col items-end gap-3 ${posClass}`}>
      <motion.div
        animate={{ y: [0, -8, 0], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="pointer-events-none absolute -top-10 -left-10 w-20 h-20 rounded-full blur-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(236,72,153,0.25))",
        }}
      />

      {showWA && (
        <div className="relative flex items-center gap-2">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className={`p-3 rounded-full shadow-xl hover:scale-105 transition-transform ${
              dark ? "bg-green-700" : "bg-green-500"
            }`}
            title="Chat on WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-white"
            >
              <path d="M20.5 3.5A11.9 11.9 0 0012 1C6.5 1 2 5.6 2 11.1c0 1.9.5 3.8 1.5 5.5L2 23l6.6-1.7c1.6 1 3.5 1.4 5.4 1.4 5.5 0 10-4.6 10-10.1 0-1.8-.4-3.4-1.5-4.8z" />
            </svg>
          </a>
          <button
            onClick={() => setShowWA(false)}
            className="p-1 rounded-full bg-red-500 text-white text-xs shadow"
            title="Close WhatsApp"
          >
            ✕
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((s) => !s)}
        className={`p-3 rounded-full shadow-xl hover:scale-105 transition-transform ${
          dark ? "bg-indigo-600" : "bg-blue-600"
        }`}
        aria-label="Open chat"
      >
        <motion.div
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex items-center gap-2 text-white"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="av1" x1="0" x2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="40" r="14" fill="url(#av1)" />
            <rect
              x="28"
              y="58"
              rx="8"
              width="44"
              height="22"
              fill="url(#av1)"
            />
          </svg>
        </motion.div>
      </button>

      {open && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.18 }}
          className={`w-80 rounded-2xl shadow-2xl overflow-hidden ${
            dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
        >
          <div
            className={`flex items-center justify-between px-4 py-3 border-b ${
              dark ? "border-gray-800" : "border-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white shadow"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M12 3c-4.4 0-8 3.6-8 8 0 1.1.2 2.2.6 3.2L4 21l6.9-2.6c.9.2 1.9.4 3.1.4 4.4 0 8-3.6 8-8s-3.6-8-8-8z" />
                </svg>
              </motion.div>
              <div>
                <div className="font-semibold">WebDev Assistant</div>
                <div className="text-xs text-gray-400">
                  Dapat menjawab soal coding & tutorial
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              {loading ? "Mengetik..." : "Online"}
            </div>
          </div>

          <div
            className={`px-3 py-2 border-b ${
              dark ? "border-gray-800" : "border-gray-100"
            }`}
          >
            <div className="flex gap-2 flex-wrap">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessageLocal(q)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    dark
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={containerRef}
            className="h-60 p-3 overflow-y-auto space-y-2"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] p-2 rounded-xl ${
                  m.from === "user"
                    ? "ml-auto text-white bg-indigo-600"
                    : dark
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div
            className={`p-3 border-t ${
              dark ? "border-gray-800" : "border-gray-100"
            }`}
          >
            <div className="flex gap-2">
              <input
                value={input}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan sesuatu..."
                className={`flex-1 px-3 py-2 rounded-lg ${
                  dark
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-gray-900 border-gray-200"
                }`}
              />
              <button
                onClick={handleSendClick}
                className="px-3 py-2 rounded-lg bg-indigo-600 text-white"
              >
                Kirim
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function WebDevApp() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);
  const [route, setRoute] = useState("home");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("webdev_currentUser");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.log("Error loading user");
      }
    }

    const savedAdminUser = localStorage.getItem("webdev_adminUser");
    if (savedAdminUser) {
      try {
        setAdminUser(JSON.parse(savedAdminUser));
      } catch (e) {
        console.log("Error loading admin user");
      }
    }
  }, []);

  const coursesCatalog = [
    {
      id: "frontend",
      title: "Frontend Mastery",
      level: "Beginner → Intermediate",
      hours: 48,
      desc: "HTML, CSS, Modern JS, React",
    },
    {
      id: "backend",
      title: "Backend & API",
      level: "Intermediate",
      hours: 40,
      desc: "Node.js, Express, Authentication, REST",
    },
    {
      id: "fullstack",
      title: "Fullstack Project",
      level: "Intermediate → Advanced",
      hours: 60,
      desc: "End-to-end product: DB, API, Frontend",
    },
    {
      id: "devops",
      title: "DevOps Essentials",
      level: "Intermediate",
      hours: 18,
      desc: "CI/CD, Docker, Deployment",
    },
  ];

  // Load courses from database on mount
  useEffect(() => {
    const courses = getAllCourses();
    setCoursesList(courses);
  }, []);

  const go = (r, opts) => {
    if (r === "course" && opts && opts.course) {
      setSelectedCourse(opts.course);
      setRoute("course");
    } else if (r === "course-learn" && opts && opts.courseId) {
      const course = coursesList.find((c) => c.id === opts.courseId);
      if (course) {
        setSelectedCourse(course);
        setRoute("course-learn");
      }
    } else setRoute(r);
    window.scrollTo(0, 0);
  };

  if (loading)
    return (
      <div
        className={`${
          dark ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
        } min-h-screen flex items-center justify-center`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
            className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-2xl"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg tracking-wide"
          >
            Memuat WebDev Academy...
          </motion.p>
        </motion.div>
      </div>
    );

  return (
    <div
      className={`${
        dark
          ? "min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-900 text-slate-100"
          : "min-h-screen bg-gradient-to-b from-white via-slate-50 to-indigo-50 text-slate-900"
      } antialiased relative overflow-hidden`}
    >
      <motion.div
        className="pointer-events-none absolute top-12 left-8 rounded-3xl opacity-20 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -16, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          width: 180,
          height: 180,
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(236,72,153,0.35))",
        }}
      />

      <header className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition"
        >
          <div
            className={`w-9 sm:w-10 h-9 sm:h-10 rounded-lg flex items-center justify-center shadow-2xl ${
              dark
                ? "bg-gradient-to-br from-indigo-400 to-fuchsia-500"
                : "bg-gradient-to-br from-indigo-300 to-pink-300"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12h18"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-base sm:text-lg leading-tight">
              WebDev Academy
            </div>
            <div className="text-xs text-slate-300">Learn. Build. Ship.</div>
          </div>
        </button>

        <nav className="hidden lg:flex gap-4 items-center text-sm">
          <button
            onClick={() => go("home")}
            className="px-3 py-2 hover:bg-white/5 rounded-lg transition"
          >
            Home
          </button>
          <button
            onClick={() => go("courses")}
            className="px-3 py-2 hover:bg-white/5 rounded-lg transition"
          >
            Kursus
          </button>
          <button
            onClick={() => go("modules")}
            className="px-3 py-2 hover:bg-white/5 rounded-lg transition"
          >
            Modul
          </button>
          <button
            onClick={() => go("features")}
            className="px-3 py-2 hover:bg-white/5 rounded-lg transition"
          >
            Fitur
          </button>
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
            {currentUser ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => go("dashboard")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-semibold">
                  {currentUser.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">{currentUser.fullName}</div>
                  <div className="text-xs text-slate-400">
                    {currentUser.email.substring(0, 15)}...
                  </div>
                </div>
              </motion.button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthMode("login");
                    go("auth");
                  }}
                  className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition"
                >
                  Sign in
                </button>
              </>
            )}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition"
            >
              {dark ? "🌙" : "☀️"}
            </button>
          </div>
        </nav>

        <div className="lg:hidden flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition"
          >
            {dark ? "🌙" : "☀️"}
          </button>
          {currentUser ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => go("dashboard")}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-xs sm:text-sm font-semibold"
            >
              {currentUser.fullName.charAt(0).toUpperCase()}
            </motion.button>
          ) : (
            <button
              onClick={() => {
                setAuthMode("login");
                go("auth");
              }}
              className="px-3 py-2 rounded-lg bg-white/10 text-sm hover:bg-white/20 transition"
            >
              Login
            </button>
          )}
          {currentUser && (
            <button
              onClick={() => {
                localStorage.removeItem("webdev_currentUser");
                setCurrentUser(null);
                go("home");
              }}
              className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition text-lg"
              title="Logout"
            >
              ✕
            </button>
          )}
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {route === "home" && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            <div className="lg:col-span-7">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
              >
                WebDev Academy —{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-400">
                  Belajar Coding
                </span>{" "}
                dengan cepat
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 sm:mt-6 text-slate-300 max-w-xl text-sm sm:text-base leading-relaxed"
              >
                Kursus interaktif, modul efisien, proyek nyata, dan mentor ahli.
              </motion.p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => go("courses")}
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 rounded-lg sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transition text-sm sm:text-base"
                >
                  Mulai Belajar
                </button>
                <button
                  onClick={() => go("features")}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg sm:rounded-2xl border border-white/10 hover:bg-white/5 transition text-sm sm:text-base"
                >
                  Lihat Fitur
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ y: -6 }}
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="w-72 h-48 rounded-2xl shadow-2xl p-3 bg-gradient-to-br from-white/6 to-white/3"
              >
                <svg viewBox="0 0 600 360" className="w-full h-full">
                  <rect
                    x="20"
                    y="20"
                    rx="14"
                    width="560"
                    height="240"
                    fill="#0b1220"
                  />
                  <g transform="translate(60 60)">
                    <rect
                      x="0"
                      y="0"
                      width="480"
                      height="12"
                      rx="6"
                      fill="#0ea5e9"
                    />
                    <rect
                      x="0"
                      y="24"
                      width="360"
                      height="10"
                      rx="6"
                      fill="#60a5fa"
                    />
                    <rect
                      x="0"
                      y="44"
                      width="280"
                      height="10"
                      rx="6"
                      fill="#34d399"
                    />
                  </g>
                </svg>
              </motion.div>
            </div>
          </section>
        )}

        {route === "modules" && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Modul Pembelajaran Efisien
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                "HTML & CSS Dasar",
                "JavaScript Modern",
                "Frontend Framework (React)",
                "Backend & API",
                "Database",
                "Deployment",
              ].map((m, i) => (
                <motion.div
                  key={m}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 sm:p-6 rounded-lg sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur shadow-xl hover:shadow-2xl transition"
                >
                  <h4 className="font-semibold text-base sm:text-lg">{m}</h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Materi singkat, langsung ke inti, disertai contoh kode dan
                    latihan.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {route === "courses" && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Daftar Kursus
            </h2>
            <p className="text-slate-400 mb-6 text-xs sm:text-sm sm:text-base">
              Pilih kursus untuk mulai belajar. Coba gratis 7 hari pertama.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {coursesCatalog.map((c, i) => {
                const isEnrolled =
                  currentUser && isUserEnrolled(currentUser.id, c.id);
                return (
                  <motion.article
                    key={c.id}
                    initial={{ y: 12, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.06 * i }}
                    className={`p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-2xl backdrop-blur shadow-lg border transition-all cursor-pointer hover:shadow-2xl ${
                      isEnrolled
                        ? `${
                            dark
                              ? "bg-green-500/10 border-green-400/30"
                              : "bg-green-50 border-green-200"
                          }`
                        : `${
                            dark
                              ? "bg-white/3 border-white/6"
                              : "bg-slate-50 border-slate-200"
                          }`
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs sm:text-sm text-slate-300">
                          {c.level}
                        </div>
                        <div className="font-semibold mt-1 sm:mt-2 text-sm sm:text-lg">
                          {c.title}
                        </div>
                      </div>
                      {isEnrolled && (
                        <div className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300 whitespace-nowrap">
                          ✓ Terdaftar
                        </div>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-200">
                      {c.hours}h
                    </div>
                    <p className="mt-3 sm:mt-4 text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {c.desc}
                    </p>
                    <div className="mt-4 sm:mt-6 flex justify-between items-center gap-2">
                      <div className="text-xs text-slate-300">
                        ⭐ 4.8 • 1234 siswa
                      </div>
                      <button
                        onClick={() => go("course", { course: c })}
                        className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm transition ${
                          isEnrolled
                            ? `${
                                dark
                                  ? "bg-green-500/30 text-green-200"
                                  : "bg-green-100 text-green-700"
                              } hover:opacity-80`
                            : "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:shadow-lg"
                        }`}
                      >
                        {isEnrolled ? "Lanjutkan" : "Buka"}
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        )}

        {route === "course" && selectedCourse && (
          <div>
            <button
              onClick={() => go("courses")}
              className="text-xs sm:text-sm mb-4 text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              ← Kembali ke daftar kursus
            </button>
            <div className="rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white/8 to-white/3 border border-white/8 backdrop-blur">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {selectedCourse.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 text-xs sm:text-sm text-slate-300">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
                      {selectedCourse.level}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300">
                      {selectedCourse.hours} jam
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
                      ⭐ 4.8 • 1234 siswa
                    </span>
                  </div>
                  <p className="mt-4 sm:mt-6 text-slate-300 text-sm sm:text-base leading-relaxed">
                    Kursus komprehensif yang dirancang untuk membawa Anda dari
                    pemula hingga mahir. Anda akan belajar{" "}
                    {selectedCourse.desc.toLowerCase()} melalui video
                    berkualitas tinggi, coding exercises, dan project
                    real-world.
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <h3 className="text-base sm:text-lg font-semibold mb-4">
                      Yang akan Anda Pelajari
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {[
                        "✓ Konsep fundamental dengan penjelasan mendalam",
                        "✓ Best practices industri dan coding standards",
                        "✓ Project-based learning dengan skenario real",
                        "✓ Code review dari mentor berpengalaman",
                        "✓ Debugging dan problem-solving techniques",
                        "✓ Sertifikat yang diakui industri",
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="text-slate-300 flex items-start gap-2 text-xs sm:text-sm leading-relaxed"
                        >
                          <span className="text-emerald-400">
                            {item.split("✓")[0]}✓
                          </span>
                          <span>{item.split("✓")[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ y: -6 }}
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="rounded-lg sm:rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 border border-white/10 sticky top-4 sm:top-20"
                  >
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                        {currentUser ? "Terdaftar" : "Rp 499.000"}
                      </div>
                      {!currentUser && (
                        <div className="text-xs text-slate-400 mt-1">
                          Atau coba 7 hari gratis
                        </div>
                      )}
                    </div>

                    <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                      <button
                        onClick={() => {
                          if (currentUser) {
                            enrollUserInCourse(
                              currentUser.id,
                              selectedCourse.id
                            );
                            const updatedUser = { ...currentUser };
                            if (!updatedUser.enrolledCourses)
                              updatedUser.enrolledCourses = [];
                            if (
                              !updatedUser.enrolledCourses.includes(
                                selectedCourse.id
                              )
                            ) {
                              updatedUser.enrolledCourses.push(
                                selectedCourse.id
                              );
                            }
                            setCurrentUser(updatedUser);
                            localStorage.setItem(
                              "webdev_currentUser",
                              JSON.stringify(updatedUser)
                            );
                            go("course-learn", { courseId: selectedCourse.id });
                          } else {
                            go("auth");
                          }
                        }}
                        className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-lg sm:rounded-xl font-semibold text-white hover:shadow-lg transition text-sm sm:text-base"
                      >
                        {currentUser
                          ? "Mulai Belajar Sekarang"
                          : "Mulai Gratis"}
                      </button>

                      <button
                        className="w-full px-4 py-3 border border-white/20 rounded-lg sm:rounded-xl font-medium hover:bg-white/5 transition text-sm sm:text-base"
                        onClick={() => go("courses")}
                      >
                        Kembali
                      </button>
                    </div>

                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10 space-y-2 text-xs sm:text-sm text-slate-400">
                      <div>✓ Akses seumur hidup</div>
                      <div>✓ Download materi & sertifikat</div>
                      <div>✓ Akses komunitas</div>
                      <div>✓ 30 hari garansi uang kembali</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        )}

        {route === "course-learn" && selectedCourse && currentUser && (
          <CourseLearningPage
            courseId={selectedCourse.id}
            currentUser={currentUser}
            onBack={() => go("courses")}
            dark={dark}
          />
        )}

        {route === "features" && (
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">
              Kenapa Pilih WebDev Academy?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 rounded-lg sm:rounded-2xl bg-white/4 border border-white/6 hover:bg-white/6 transition">
                <h4 className="font-semibold text-base sm:text-lg">
                  Mentor Berpengalaman
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Sesi live, code review, dan feedback langsung.
                </p>
              </div>
              <div className="p-4 sm:p-6 rounded-lg sm:rounded-2xl bg-white/4 border border-white/6 hover:bg-white/6 transition">
                <h4 className="font-semibold text-base sm:text-lg">
                  Proyek Nyata
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Bangun produk riil yang bisa dimasukkan ke portfolio.
                </p>
              </div>
              <div className="p-4 sm:p-6 rounded-lg sm:rounded-2xl bg-white/4 border border-white/6 hover:bg-white/6 transition">
                <h4 className="font-semibold text-base sm:text-lg">
                  Komunitas
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Akses ke Discord, pairing session, dan job board.
                </p>
              </div>
            </div>
          </div>
        )}

        {route === "auth" && (
          <AuthComponent
            dark={dark}
            onClose={() => go("home")}
            onLoginSuccess={(user) => setCurrentUser(user)}
          />
        )}

        {route === "dashboard" && currentUser && (
          <UserDashboard
            currentUser={currentUser}
            dark={dark}
            onClose={() => go("home")}
            onNavigate={go}
          />
        )}

        {route === "admin" && (
          <AdminLoginPage
            dark={dark}
            onClose={() => go("home")}
            onAdminLogin={(user) => setAdminUser(user)}
          />
        )}
      </main>

      <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-indigo-700/40 to-fuchsia-700/30 border border-white/6 backdrop-blur shadow-2xl max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12 my-6 sm:my-8 lg:my-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-bold">
              Bergabung Sekarang
            </div>
            <div className="text-xs sm:text-base text-slate-300 mt-2">
              Coba gratis 7 hari — akses penuh ke semua kursus dan komunitas.
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <button
              onClick={() => {
                if (currentUser) {
                  go("courses");
                } else {
                  go("auth");
                }
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg sm:rounded-xl lg:rounded-2xl bg-white text-slate-900 font-bold hover:shadow-lg transition text-sm sm:text-base"
            >
              Mulai Free Trial
            </button>
          </div>
        </div>
      </div>

      <footer className="relative z-10 mt-12 border-t border-white/6 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-400 gap-4 sm:gap-0">
          <div>© {new Date().getFullYear()} WebDev Academy</div>
          <div className="flex gap-3 sm:gap-4 items-center justify-center sm:justify-start flex-wrap">
            <button
              onClick={() => go("home")}
              className="hover:text-white transition"
            >
              Terms
            </button>
            <span>·</span>
            <button
              onClick={() => go("home")}
              className="hover:text-white transition"
            >
              Privacy
            </button>
            <span>·</span>
            <button
              onClick={() => go("home")}
              className="hover:text-white transition"
            >
              Contact
            </button>
            {!adminUser && (
              <>
                <span>·</span>
                <button
                  onClick={() => go("admin")}
                  className="text-xs text-slate-500 hover:text-slate-300 transition"
                  title="Admin"
                >
                  ⚙️
                </button>
              </>
            )}
          </div>
        </div>
      </footer>

      <ChatBotBubble dark={dark} position={"bottom-right"} />
    </div>
  );
}
