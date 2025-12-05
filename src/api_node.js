// src/api_node.js
// Client helper for Node API (Express)
const API_BASE = window.__NODE_API_URL__ || "http://localhost:4000";

function getToken() {
  return localStorage.getItem("token");
}

async function fetchWithAuth(path, opts = {}) {
  const token = getToken();
  const headers = opts.headers || {};
  headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;
  opts.headers = headers;
  const res = await fetch(`${API_BASE}${path}`, opts);
  if (res.status === 401) {
    // token invalid - remove
    localStorage.removeItem("token");
  }
  return res.json();
}

export async function saveLessonProgress(lessonId, payload) {
  return fetchWithAuth(`/api/progress/${lessonId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loadLessonProgress(lessonId) {
  return fetchWithAuth(`/api/progress/${lessonId}`);
}

export async function listCourses() {
  return fetchWithAuth("/api/courses");
}

export async function getCourse(id) {
  return fetchWithAuth(`/api/courses/${id}`);
}

// Summarize lesson content with intent
export async function summarizeWithAI(
  text,
  intent = "summarize",
  language = "id"
) {
  try {
    return await fetchWithAuth("/api/ai/summarize", {
      method: "POST",
      body: JSON.stringify({ text, intent, language }),
    });
  } catch (err) {
    console.error("AI summarize error:", err);
    return { ok: false, error: "Failed to summarize" };
  }
}

// Ask a question about a topic with optional context
export async function askAI(question, context = "", language = "id") {
  try {
    return await fetchWithAuth("/api/ai/ask", {
      method: "POST",
      body: JSON.stringify({ question, context, language }),
    });
  } catch (err) {
    console.error("AI ask error:", err);
    return { ok: false, error: "Failed to answer question" };
  }
}

// Convenience functions for different AI modes
export async function explainConcept(text, language = "id") {
  return summarizeWithAI(text, "explain", language);
}

export async function generateQuiz(text, language = "id") {
  return summarizeWithAI(text, "quiz", language);
}

export async function generatePractice(text, language = "id") {
  return summarizeWithAI(text, "practice", language);
}
