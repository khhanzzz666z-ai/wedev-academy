import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCourseById, getLessonByCourseAndLessonId, markLessonAsCompleted, getCourseProgress } from "./database";

export default function CourseLearningPage({ dark, courseId, onBack, currentUser }) {
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const courseData = getCourseById(courseId);
    if (courseData) {
      setCourse(courseData);
      setSelectedLessonId(courseData.lessons[0]?.id);
      setProgress(getCourseProgress(courseId));
      setCurrentLesson(courseData.lessons[0]);
    }
    setLoading(false);
  }, [courseId]);

  const handleSelectLesson = (lessonId) => {
    setSelectedLessonId(lessonId);
    if (course) {
      const lesson = course.lessons.find((l) => l.id === lessonId);
      setCurrentLesson(lesson);
    }
  };

  const handleMarkComplete = () => {
    if (selectedLessonId && courseId) {
      markLessonAsCompleted(courseId, selectedLessonId);
      if (course) {
        const updatedCourse = getCourseById(courseId);
        setCourse(updatedCourse);
        setProgress(getCourseProgress(courseId));
        
        // Update current lesson completion status
        if (currentLesson) {
          currentLesson.completed = true;
        }
      }
    }
  };

  const handleNextLesson = () => {
    if (course) {
      const currentIndex = course.lessons.findIndex((l) => l.id === selectedLessonId);
      if (currentIndex < course.lessons.length - 1) {
        const nextLesson = course.lessons[currentIndex + 1];
        handleSelectLesson(nextLesson.id);
        handleMarkComplete();
      }
    }
  };

  if (loading || !course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 2 }} className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
      </div>
    );
  }

  const currentLessonIndex = course.lessons.findIndex((l) => l.id === selectedLessonId);

  return (
    <div className={`min-h-screen ${dark ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'}`}>
      {/* Header */}
      <header className={`border-b ${dark ? 'border-slate-800' : 'border-slate-200'} sticky top-0 z-10 backdrop-blur`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm hover:opacity-70 transition"
          >
            ← Kembali ke Kursus
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold">{course.title}</h1>
            <p className="text-xs text-slate-500">{currentLesson.title}</p>
          </div>

          <div className="text-sm text-right">
            <div className="font-semibold">{progress}%</div>
            <div className="text-xs text-slate-500">Selesai</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          {/* Video Player Placeholder */}
          <div className={`rounded-2xl overflow-hidden shadow-2xl ${dark ? 'bg-slate-800' : 'bg-slate-100'} mb-8`}>
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-indigo-600 to-fuchsia-600">
              <div className="text-center">
                <div className="text-6xl mb-4">▶️</div>
                <p className="text-white text-lg font-semibold">{currentLesson.title}</p>
                <p className="text-white/80 text-sm mt-2">{currentLesson.duration} menit</p>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className={`rounded-2xl p-8 ${dark ? 'bg-slate-800/50' : 'bg-slate-50'} border ${dark ? 'border-slate-700' : 'border-slate-200'}`}>
            <h2 className="text-2xl font-bold mb-4">{currentLesson.title}</h2>
            
            <p className={`leading-relaxed mb-6 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
              {currentLesson.content}
            </p>

            {/* Learning Materials */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold">Materi Pembelajaran</h3>
              
              <div className={`p-4 rounded-lg ${dark ? 'bg-slate-700/50' : 'bg-white'} border ${dark ? 'border-slate-600' : 'border-slate-200'}`}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📚</div>
                  <div>
                    <p className="font-semibold">Topik Utama</p>
                    <p className={`text-sm mt-1 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Pelajari konsep fundamental dan praktik terbaik
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${dark ? 'bg-slate-700/50' : 'bg-white'} border ${dark ? 'border-slate-600' : 'border-slate-200'}`}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💻</div>
                  <div>
                    <p className="font-semibold">Contoh Kode</p>
                    <p className={`text-sm mt-1 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Lihat dan pelajari contoh implementasi praktis
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${dark ? 'bg-slate-700/50' : 'bg-white'} border ${dark ? 'border-slate-600' : 'border-slate-200'}`}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <p className="font-semibold">Latihan</p>
                    <p className={`text-sm mt-1 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Kerjakan latihan untuk memperkuat pemahaman
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleMarkComplete}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  currentLesson.completed
                    ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {currentLesson.completed ? '✓ Selesai' : 'Tandai Selesai'}
              </button>

              {currentLessonIndex < course.lessons.length - 1 && (
                <button
                  onClick={handleNextLesson}
                  className="px-6 py-3 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold transition"
                >
                  Pelajaran Berikutnya →
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Sidebar - Lessons List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`rounded-2xl p-6 h-fit sticky top-24 ${dark ? 'bg-slate-800/50' : 'bg-slate-50'} border ${dark ? 'border-slate-700' : 'border-slate-200'}`}
        >
          <h3 className="text-lg font-bold mb-4">Daftar Pelajaran</h3>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">Progress</span>
              <span className="text-xs font-bold text-indigo-400">{progress}%</span>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${dark ? 'bg-slate-700' : 'bg-slate-200'}`}>
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>

          {/* Lessons */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {course.lessons.map((lesson, index) => (
              <motion.button
                key={lesson.id}
                onClick={() => handleSelectLesson(lesson.id)}
                whileHover={{ x: 4 }}
                className={`w-full text-left p-3 rounded-lg transition ${
                  selectedLessonId === lesson.id
                    ? 'bg-indigo-600 text-white'
                    : `${dark ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="text-lg mt-0.5">
                    {lesson.completed ? '✓' : `${index + 1}`}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight truncate">
                      {lesson.title}
                    </p>
                    <p className={`text-xs mt-1 ${selectedLessonId === lesson.id ? 'text-white/70' : dark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {lesson.duration} menit
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Course Info */}
          <div className={`mt-6 pt-6 border-t ${dark ? 'border-slate-700' : 'border-slate-200'}`}>
            <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
              <span className="font-semibold">Instruktur:</span> {course.instructor}
            </p>
            <p className={`text-xs mt-2 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
              <span className="font-semibold">Total Jam:</span> {course.hours}h
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
