import React, { useState } from "react";
import { motion } from "framer-motion";

export default function OAuthEmailComponent({ 
  provider = "GitHub",
  onSubmit,
  onClose,
  dark 
}) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !fullName.trim()) {
      setError("Email dan nama harus diisi");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Format email tidak valid");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onSubmit({ email, fullName });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`rounded-2xl p-8 max-w-md w-full mx-4 ${
          dark ? "bg-slate-900" : "bg-white"
        } shadow-2xl`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="text-4xl">
            {provider === "GitHub" ? "🐙" : "🔵"}
          </div>
          <div>
            <h2 className="text-2xl font-bold">Login dengan {provider}</h2>
            <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>
              Lengkapi profil Anda
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masukkan nama Anda"
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                dark
                  ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                  : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
              } focus:outline-none focus:border-indigo-500`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                dark
                  ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                  : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
              } focus:outline-none focus:border-indigo-500`}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : `Lanjutkan dengan ${provider}`}
          </button>

          <button
            type="button"
            onClick={onClose}
            className={`w-full px-4 py-3 rounded-lg border ${
              dark
                ? "border-slate-700 hover:bg-slate-800"
                : "border-slate-200 hover:bg-slate-100"
            }`}
          >
            Batal
          </button>
        </form>

        <p className={`text-xs mt-4 text-center ${dark ? "text-slate-500" : "text-slate-500"}`}>
          Data Anda akan disimpan aman sesuai Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}
