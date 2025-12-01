import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AuthComponent from "./AuthComponent";
import AdminLoginPage from "./AdminLoginPage";

function ChatBotBubble({ dark, position = "bottom-right" }) {
  const [showWA, setShowWA] = useState(true);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Halo! Saya asisten WebDev Academy — tanya tentang kursus, contoh kode, atau debugging." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (open && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, open]);

  const quickReplies = ["Bagaimana memulai React?", "Rekomendasi kursus frontend", "Cara deploy ke Vercel"];

  function getLocalReply(text) {
    const t = (text || "").toLowerCase();
    if (t.includes("react")) return "Mulai dengan komponen, state, dan hooks. Saran: kursus Frontend Mastery di platform kami.";
    if (t.includes("deploy") || t.includes("vercel")) return "Untuk deploy ke Vercel, buat akun, hubungkan repo Git, dan push ke main. Vercel otomatis deploy.";
    if (t.includes("backend") || t.includes("api")) return "Pelajari Node.js dan Express untuk membuat API. Gunakan Postman untuk testing.";
    if (t.includes("css") || t.includes("html")) return "Mulai dari struktur HTML dan box model, lalu pelajari Flexbox dan Grid untuk layout.";
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
    "center-right": "bottom-1/3 right-6"
  };

  const posClass = posClasses[position] || posClasses["bottom-right"];

  return (
    <div className={`fixed z-50 flex flex-col items-end gap-3 ${posClass}`}>
      <motion.div animate={{ y: [0, -8, 0], opacity: [0.6, 0.2, 0.6] }} transition={{ duration: 4, repeat: Infinity }} className="pointer-events-none absolute -top-10 -left-10 w-20 h-20 rounded-full blur-3xl" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(236,72,153,0.25))' }} />

      {showWA && (
        <div className="relative flex items-center gap-2">
          <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className={`p-3 rounded-full shadow-xl hover:scale-105 transition-transform ${dark ? 'bg-green-700' : 'bg-green-500'}`} title="Chat on WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M20.5 3.5A11.9 11.9 0 0012 1C6.5 1 2 5.6 2 11.1c0 1.9.5 3.8 1.5 5.5L2 23l6.6-1.7c1.6 1 3.5 1.4 5.4 1.4 5.5 0 10-4.6 10-10.1 0-1.8-.4-3.4-1.5-4.8z"/></svg>
          </a>
          <button onClick={() => setShowWA(false)} className="p-1 rounded-full bg-red-500 text-white text-xs shadow" title="Close WhatsApp">✕</button>
        </div>
      )}

      <button onClick={() => setOpen((s) => !s)} className={`p-3 rounded-full shadow-xl hover:scale-105 transition-transform ${dark ? 'bg-indigo-600' : 'bg-blue-600'}`} aria-label="Open chat">
        <motion.div animate={{ rotate: [0, 6, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} className="flex items-center gap-2 text-white">
          <svg className="w-5 h-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="av1" x1="0" x2="1"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#ec4899"/></linearGradient>
            </defs>
            <circle cx="50" cy="40" r="14" fill="url(#av1)" />
            <rect x="28" y="58" rx="8" width="44" height="22" fill="url(#av1)" />
          </svg>
        </motion.div>
      </button>

      {open && (
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.18 }} className={`w-80 rounded-2xl shadow-2xl overflow-hidden ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
          <div className={`flex items-center justify-between px-4 py-3 border-b ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="flex items-center gap-3">
              <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white shadow">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M12 3c-4.4 0-8 3.6-8 8 0 1.1.2 2.2.6 3.2L4 21l6.9-2.6c.9.2 1.9.4 3.1.4 4.4 0 8-3.6 8-8s-3.6-8-8-8z"/></svg>
              </motion.div>
              <div>
                <div className="font-semibold">WebDev Assistant</div>
                <div className="text-xs text-gray-400">Dapat menjawab soal coding & tutorial</div>
              </div>
            </div>
            <div className="text-xs text-gray-400">{loading ? 'Mengetik...' : 'Online'}</div>
          </div>

          <div className={`px-3 py-2 border-b ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="flex gap-2 flex-wrap">
              {quickReplies.map((q) => (
                <button key={q} onClick={() => sendMessageLocal(q)} className={`px-3 py-1 rounded-full text-sm ${dark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>{q}</button>
              ))}
            </div>
          </div>

          <div ref={containerRef} className="h-60 p-3 overflow-y-auto space-y-2">
            {messages.map((m) => (
              <div key={m.id} className={`max-w-[85%] p-2 rounded-xl ${m.from === 'user' ? 'ml-auto text-white bg-indigo-600' : (dark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900')}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className={`p-3 border-t ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="flex gap-2">
              <input value={input} onKeyDown={handleKeyDown} onChange={(e) => setInput(e.target.value)} placeholder="Tanyakan sesuatu..." className={`flex-1 px-3 py-2 rounded-lg ${dark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`} />
              <button onClick={handleSendClick} className="px-3 py-2 rounded-lg bg-indigo-600 text-white">Kirim</button>
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

  useEffect(() => { 
    const t = setTimeout(() => setLoading(false), 2200); 
    return () => clearTimeout(t); 
  }, []);

  useEffect(() => { 
    if (dark) document.documentElement.classList.add('dark'); 
    else document.documentElement.classList.remove('dark'); 
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
    { id: "frontend", title: "Frontend Mastery", level: "Beginner → Intermediate", hours: 48, desc: "HTML, CSS, Modern JS, React" },
    { id: "backend", title: "Backend & API", level: "Intermediate", hours: 40, desc: "Node.js, Express, Authentication, REST" },
    { id: "fullstack", title: "Fullstack Project", level: "Intermediate → Advanced", hours: 60, desc: "End-to-end product: DB, API, Frontend" },
    { id: "devops", title: "DevOps Essentials", level: "Intermediate", hours: 18, desc: "CI/CD, Docker, Deployment" },
  ];

  const go = (r, opts) => { if (r === 'course' && opts && opts.course) { setSelectedCourse(opts.course); setRoute('course'); } else setRoute(r); window.scrollTo(0,0); };

  if (loading) return (
    <div className={`${dark ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'} min-h-screen flex items-center justify-center`}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="text-center">
        <motion.div animate={{ rotate: [0,360] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }} className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-2xl" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="mt-6 text-lg tracking-wide">Memuat WebDev Academy...</motion.p>
      </motion.div>
    </div>
  );

  return (
    <div className={`${dark ? 'min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-900 text-slate-100' : 'min-h-screen bg-gradient-to-b from-white via-slate-50 to-indigo-50 text-slate-900'} antialiased relative overflow-hidden`}>
      <motion.div className="pointer-events-none absolute top-12 left-8 rounded-3xl opacity-20 blur-3xl" animate={{ x: [0,20,0], y: [0,-16,0] }} transition={{ duration: 10, repeat: Infinity }} style={{ width: 180, height: 180, background: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(236,72,153,0.35))' }} />

      <header className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-2xl ${dark ? 'bg-gradient-to-br from-indigo-400 to-fuchsia-500' : 'bg-gradient-to-br from-indigo-300 to-pink-300'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">WebDev Academy</div>
            <div className="text-xs text-slate-300">Learn. Build. Ship.</div>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 items-center text-sm">
          <button onClick={() => go('home')} className="hover:text-white">Home</button>
          <button onClick={() => go('courses')} className="hover:text-white">Courses</button>
          <button onClick={() => go('modules')} className="hover:text-white">Modules</button>
          <button onClick={() => go('features')} className="hover:text-white">Features</button>
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-sm font-semibold">
                  {currentUser.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">{currentUser.fullName}</div>
                  <div className="text-xs text-slate-400">{currentUser.email}</div>
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem("webdev_currentUser");
                    setCurrentUser(null);
                    go('home');
                  }}
                  className="px-4 py-2 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => { setAuthMode('login'); go('auth'); }} className="px-4 py-2 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20">Sign in</button>
              </>
            )}
            <button onClick={() => setDark(!dark)} className="px-3 py-2 rounded-lg border border-white/10">{dark ? '🌙' : '☀️'}</button>
          </div>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setDark(!dark)} className="px-3 py-2 rounded-lg border border-white/10">{dark ? '🌙' : '☀️'}</button>
          {currentUser ? (
            <button
              onClick={() => {
                localStorage.removeItem("webdev_currentUser");
                setCurrentUser(null);
                go('home');
              }}
              className="px-3 py-2 rounded-lg bg-red-500/20 text-sm"
            >
              Logout
            </button>
          ) : (
            <button onClick={() => { setAuthMode('login'); go('auth'); }} className="px-3 py-2 rounded-lg bg-white/10">Login</button>
          )}
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {route === 'home' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-extrabold leading-tight">WebDev Academy — <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-400">Belajar Coding</span> dengan cepat</motion.h1>
              <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 text-slate-300 max-w-xl">Kursus interaktif, modul efisien, proyek nyata, dan mentor ahli.</motion.p>
              <div className="mt-8 flex gap-4">
                <button onClick={() => go('courses')} className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 rounded-2xl font-semibold shadow-lg">Mulai Belajar</button>
                <button onClick={() => go('features')} className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/10">Lihat Fitur</button>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div initial={{ y: -6 }} animate={{ y: [ -6, 6, -6 ] }} transition={{ duration: 6, repeat: Infinity }} className="w-72 h-48 rounded-2xl shadow-2xl p-3 bg-gradient-to-br from-white/6 to-white/3">
                <svg viewBox="0 0 600 360" className="w-full h-full">
                  <rect x="20" y="20" rx="14" width="560" height="240" fill="#0b1220" />
                  <g transform="translate(60 60)">
                    <rect x="0" y="0" width="480" height="12" rx="6" fill="#0ea5e9" />
                    <rect x="0" y="24" width="360" height="10" rx="6" fill="#60a5fa" />
                    <rect x="0" y="44" width="280" height="10" rx="6" fill="#34d399" />
                  </g>
                </svg>
              </motion.div>
            </div>
          </section>
        )}

        {route === 'modules' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Modul Pembelajaran Efisien</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["HTML & CSS Dasar","JavaScript Modern","Frontend Framework (React)","Backend & API","Database","Deployment"].map((m, i) => (
                <motion.div key={m} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur shadow-xl">
                  <h4 className="font-semibold text-lg">{m}</h4>
                  <p className="mt-2 text-sm text-slate-300">Materi singkat, langsung ke inti, disertai contoh kode dan latihan.</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {route === 'courses' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Daftar Kursus</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coursesCatalog.map((c, i) => (
                <motion.article key={c.id} initial={{ y: 12, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.06 * i }} className="p-5 rounded-2xl bg-white/3 border border-white/6 backdrop-blur shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-300">{c.level}</div>
                      <div className="font-semibold mt-2 text-lg">{c.title}</div>
                    </div>
                    <div className="text-sm text-slate-200">{c.hours}h</div>
                  </div>
                  <p className="mt-4 text-slate-300 text-sm">{c.desc}</p>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="text-xs text-slate-300">Rating 4.8</div>
                    <button onClick={() => go('course', { course: c })} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl font-medium">Open</button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {route === 'course' && selectedCourse && (
          <div>
            <button onClick={() => go('courses')} className="text-sm mb-4">← Back to courses</button>
            <div className="rounded-2xl p-6 bg-white/5 border border-white/8 backdrop-blur">
              <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
              <div className="text-sm text-slate-300 mt-2">{selectedCourse.level} • {selectedCourse.hours} hours</div>
              <p className="mt-4 text-slate-300">This course covers: {selectedCourse.desc}. You will build a project and get mentor feedback. The curriculum is split into weekly milestones with quizzes and projects.</p>
              <div className="mt-6 flex gap-3">
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl">Enroll</button>
                <button className="px-4 py-2 border rounded-xl" onClick={() => go('courses')}>Back</button>
              </div>
            </div>
          </div>
        )}

        {route === 'features' && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Kenapa Pilih WebDev Academy?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">
                <h4 className="font-semibold">Mentor Berpengalaman</h4>
                <p className="mt-2 text-sm text-slate-300">Sesi live, code review, dan feedback langsung.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">
                <h4 className="font-semibold">Proyek Nyata</h4>
                <p className="mt-2 text-sm text-slate-300">Bangun produk riil yang bisa dimasukkan ke portfolio.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">
                <h4 className="font-semibold">Komunitas</h4>
                <p className="mt-2 text-sm text-slate-300">Akses ke Discord, pairing session, dan job board.</p>
              </div>
            </div>
          </div>
        )}

        {route === 'auth' && (
          <AuthComponent 
            dark={dark} 
            onClose={() => go('home')}
            onLoginSuccess={(user) => setCurrentUser(user)}
          />
        )}

        {route === 'admin' && (
          <AdminLoginPage
            dark={dark}
            onClose={() => go('home')}
            onAdminLogin={(user) => setAdminUser(user)}
          />
        )}

      </main>

      <div className="rounded-3xl p-8 bg-gradient-to-r from-indigo-700/40 to-fuchsia-700/30 border border-white/6 backdrop-blur shadow-2xl max-w-7xl mx-auto px-6 py-12 my-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-2xl font-bold">Bergabung Sekarang</div>
            <div className="text-slate-300 mt-2">Coba gratis 7 hari — akses penuh ke semua kursus dan komunitas.</div>
          </div>
          <div>
            <button onClick={() => go('auth')} className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-bold hover:shadow-lg transition">Mulai Free Trial</button>
          </div>
        </div>
      </div>

      <footer className="relative z-10 mt-12 border-t border-white/6 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-sm text-slate-400">
          <div>© {new Date().getFullYear()} WebDev Academy</div>
          <div className="flex gap-4">
            Terms · Privacy · Contact
            {!adminUser && <button onClick={() => go('admin')} className="text-xs text-slate-500 hover:text-slate-300" title="Admin">⚙️</button>}
          </div>
        </div>
      </footer>

      <ChatBotBubble dark={dark} position={"bottom-right"} />
    </div>
  );
}
