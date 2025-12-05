const fetch = global.fetch || require("node-fetch");

// Helper: Generate contextual system prompt based on intent
function getSystemPrompt(intent = "summarize", language = "id") {
  const prompts = {
    summarize: {
      id: "Anda adalah asisten pembelajaran yang merangkum konten pelajaran secara ringkas dan menarik untuk pelajar. Gunakan bullet points, buat jawaban mudah dipahami dalam bahasa Indonesia.",
      en: "You are a learning assistant that summarizes lesson content concisely and engagingly for learners. Use bullet points, keep explanations clear and in English.",
    },
    explain: {
      id: "Anda adalah tutor yang menjelaskan konsep sulit dengan cara yang mudah dipahami. Gunakan analogi dan contoh nyata. Jawab dalam bahasa Indonesia.",
      en: "You are a tutor who explains difficult concepts in easy-to-understand ways. Use analogies and real-world examples. Answer in English.",
    },
    quiz: {
      id: "Anda adalah pembuat kuis pendidikan. Buat pertanyaan yang menguji pemahaman mendalam, bukan hanya hafalan. Sertakan 4 pilihan jawaban dan jawaban benar. Gunakan bahasa Indonesia.",
      en: "You are an educational quiz creator. Create questions that test deep understanding, not just memorization. Include 4 answer options and the correct answer. Use English.",
    },
    practice: {
      id: "Anda adalah asisten praktik coding. Buat latihan yang progressif dari mudah ke sulit. Sertakan hints dan penjelasan. Jawab dalam bahasa Indonesia.",
      en: "You are a coding practice assistant. Create progressive exercises from easy to hard. Include hints and explanations. Answer in English.",
    },
    clarify: {
      id: "Anda adalah asisten yang menjawab pertanyaan pelajar dengan jelas dan singkat. Fokus pada apa yang ditanyakan. Jangan memberikan informasi yang tidak relevan. Jawab dalam bahasa Indonesia.",
      en: "You are an assistant who answers student questions clearly and concisely. Focus on what is asked. Don't provide irrelevant information. Answer in English.",
    },
  };

  return prompts[intent]?.[language] || prompts.summarize[language];
}

// POST /api/ai/summarize
// body: { text: string, intent?: "summarize"|"explain"|"quiz"|"practice"|"clarify", language?: "id"|"en" }
const summarize = async (req, res) => {
  try {
    const { text, intent = "summarize", language = "id" } = req.body;
    if (!text) return res.status(400).json({ error: "text required" });

    const apiKey = process.env.AI_API_KEY;
    const apiUrl =
      process.env.AI_API_URL || "https://api.openai.com/v1/chat/completions";
    const model = process.env.AI_MODEL || "gpt-4o";

    if (!apiKey)
      return res
        .status(500)
        .json({ error: "AI API key not configured on server" });

    const systemPrompt = getSystemPrompt(intent, language);

    // Build contextual user message
    let userMessage = text;
    if (intent === "summarize") {
      userMessage = `Ringkas konten berikut dengan 3-5 poin utama yang jelas:\n\n${text}`;
    } else if (intent === "explain") {
      userMessage = `Jelaskan konsep berikut dengan cara yang mudah dipahami:\n\n${text}`;
    } else if (intent === "quiz") {
      userMessage = `Buat 1 pertanyaan kuis berdasarkan konten ini dengan 4 pilihan jawaban:\n\n${text}`;
    } else if (intent === "practice") {
      userMessage = `Buat 1 latihan praktis berdasarkan konten ini (mulai dari mudah):\n\n${text}`;
    }

    const body = {
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_tokens: 500,
      temperature: 0.3,
    };

    const r = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error("AI provider error:", r.status, txt);
      return res
        .status(502)
        .json({ error: "AI provider error", status: r.status });
    }

    const data = await r.json();
    const reply =
      data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || null;

    res.json({
      ok: true,
      summary: reply,
      intent,
      language,
      tokenUsage: {
        prompt: data?.usage?.prompt_tokens,
        completion: data?.usage?.completion_tokens,
        total: data?.usage?.total_tokens,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/ai/ask
// General Q&A endpoint: answer any question about a lesson
// body: { question: string, context?: string, language?: "id"|"en" }
const ask = async (req, res) => {
  try {
    const { question, context = "", language = "id" } = req.body;
    if (!question) return res.status(400).json({ error: "question required" });

    const apiKey = process.env.AI_API_KEY;
    const apiUrl =
      process.env.AI_API_URL || "https://api.openai.com/v1/chat/completions";
    const model = process.env.AI_MODEL || "gpt-4o";

    if (!apiKey)
      return res
        .status(500)
        .json({ error: "AI API key not configured on server" });

    const systemPrompt = getSystemPrompt("clarify", language);

    const userMessage = context
      ? `Berdasarkan konten berikut:\n\n${context}\n\nJawab pertanyaan: ${question}`
      : `Jawab pertanyaan berikut: ${question}`;

    const body = {
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_tokens: 400,
      temperature: 0.5,
    };

    const r = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error("AI provider error:", r.status, txt);
      return res
        .status(502)
        .json({ error: "AI provider error", status: r.status });
    }

    const data = await r.json();
    const reply =
      data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || null;

    res.json({
      ok: true,
      answer: reply,
      question,
      language,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { summarize, ask };
