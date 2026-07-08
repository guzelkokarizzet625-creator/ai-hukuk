import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function callGemini(prompt: string) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY tanımlı değil");
  }

  // Örnek endpoint: Gerçek kullanım için Google dökümantasyonunu kontrol edin
  const url = "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=" + GEMINI_API_KEY;

  const resp = await axios.post(url, {
    prompt: {
      text: prompt
    },
    temperature: 0.2,
    maxOutputTokens: 700
  });

  const text = resp.data?.candidates?.[0]?.content ?? resp.data?.output?.[0]?.content ?? JSON.stringify(resp.data);
  return text;
}
