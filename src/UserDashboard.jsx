import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCoursesByUserEnrollment, getTrialDaysRemaining } from "./database";

export default function UserDashboard({
  currentUser,
  dark,
  onClose,
  onNavigate,
}) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedLessons: 0,
    hoursSpent: 0,
    streakDays: 7,
  });

  useEffect(() => {
    const courses = getCoursesByUserEnrollment(currentUser.id);
    setEnrolledCourses(courses);

    // Calculate stats
    const totalCourses = courses.length;
    const completedLessons = courses.reduce((acc, course) => {
      if (course.lessons) {
        return acc + course.lessons.filter((l) => l.completed).length;
      }
      return acc;
    }, 0);

    setStats({
      totalCourses,
      completedLessons,
      hoursSpent: Math.floor(Math.random() * 100) + 10,
      streakDays: 7,
    });
  }, [currentUser]);

  const trialDays = getTrialDaysRemaining(currentUser.id);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Dashboard Pembelajaran
          </h2>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Selamat datang kembali, {currentUser.fullName}!
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition text-sm sm:text-base"
          >
            ✕
          </button>
          <button
            onClick={() => onNavigate("home")}
            className="px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition text-sm sm:text-base flex items-center gap-2"
          >
            🏠 Home
          </button>
        </div>
      </div>

      {/* Trial Status */}
      {trialDays > 0 && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`p-4 rounded-2xl border ${
            trialDays <= 2
              ? "bg-red-500/10 border-red-400/30"
              : "bg-emerald-500/10 border-emerald-400/30"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`font-semibold ${
                  trialDays <= 2 ? "text-red-300" : "text-emerald-300"
                }`}
              >
                Trial Gratis Aktif
              </h3>
              <p
                className={`text-sm mt-1 ${
                  trialDays <= 2 ? "text-red-200" : "text-emerald-200"
                }`}
              >
                {trialDays} hari tersisa sebelum membership berakhir
              </p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl text-sm font-medium">
              Upgrade Sekarang
            </button>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Kursus", value: stats.totalCourses, icon: "📚" },
          {
            label: "Lesson Diselesaikan",
            value: stats.completedLessons,
            icon: "✓",
          },
          { label: "Jam Belajar", value: stats.hoursSpent, icon: "⏱️" },
          { label: "Streak", value: `${stats.streakDays}d`, icon: "🔥" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border ${
              dark
                ? "bg-white/5 border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="text-xl sm:text-2xl mb-2">{stat.icon}</div>
            <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Enrolled Courses */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold mb-4">
          Kursus yang Diikuti
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course, idx) => {
              const completedLessons = course.lessons
                ? course.lessons.filter((l) => l.completed).length
                : 0;
              const totalLessons = course.lessons ? course.lessons.length : 0;
              const progress =
                totalLessons > 0
                  ? Math.round((completedLessons / totalLessons) * 100)
                  : 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 sm:p-5 rounded-lg sm:rounded-xl border cursor-pointer hover:shadow-lg transition ${
                    dark
                      ? "bg-white/5 border-white/10"
                      : "bg-slate-50 border-slate-200"
                  }`}
                  onClick={() =>
                    onNavigate("course-learn", { courseId: course.id })
                  }
                >
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <h4 className="font-semibold text-sm sm:text-base">
                      {course.title}
                    </h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 whitespace-nowrap">
                      {progress}%
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-400 mb-3">
                    {completedLessons}/{totalLessons} lesson selesai
                  </div>

                  {/* Progress Bar */}
                  <div
                    className={`h-2 rounded-full overflow-hidden ${
                      dark ? "bg-white/10" : "bg-slate-200"
                    }`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                    />
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8 text-slate-400">
              <p className="text-sm sm:text-base">
                Anda belum mengikuti kursus apapun.
              </p>
              <button
                onClick={() => onNavigate("courses")}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-lg text-xs sm:text-sm font-medium hover:shadow-lg transition"
              >
                Jelajahi Kursus
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold mb-4">Pencapaian</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { name: "Pemula", icon: "🌱", locked: false },
            { name: "7 Hari Konsisten", icon: "🔥", locked: false },
            { name: "Intermediate Dev", icon: "⭐", locked: true },
            { name: "Master Dev", icon: "👑", locked: true },
          ].map((achievement, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: achievement.locked ? 1 : 1.05 }}
              className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border text-center cursor-pointer transition ${
                achievement.locked
                  ? dark
                    ? "bg-white/3 border-white/6 opacity-50"
                    : "bg-slate-100 border-slate-300 opacity-50"
                  : "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-400/30"
              }`}
            >
              <div className="text-2xl sm:text-3xl mb-2">
                {achievement.icon}
              </div>
              <div className="text-xs sm:text-sm font-medium">
                {achievement.name}
              </div>
              {achievement.locked && (
                <div className="text-xs text-slate-400 mt-1">Terkunci</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-4 sm:pt-6 border-t border-white/10">
        <button
          onClick={() => {
            localStorage.removeItem("webdev_currentUser");
            window.location.reload();
          }}
          className="w-full px-4 py-2 bg-red-500/20 text-red-300 border border-red-400/30 rounded-lg hover:bg-red-500/30 transition text-sm sm:text-base"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
