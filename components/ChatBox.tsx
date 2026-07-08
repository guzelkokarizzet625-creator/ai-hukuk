"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ChatBox({ product }: { product: string }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // İlk yüklemede geçmiş sohbetleri çekebilirsiniz (API ekleyin)
  }, []);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    const messageToSend = input;
    setInput("");
    setLoading(true);
    try {
      const resp = await axios.post("/api/chat", { message: messageToSend, product });
      const ai = resp.data.response;
      setMessages((m) => [...m, { role: "assistant", content: ai }]);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.error ?? "Sunucu hatası";
      setMessages((m) => [...m, { role: "assistant", content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="bg-white/3 rounded-lg p-4 min-h-[220px] max-h-[60vh] overflow-y-auto">
        {messages.length === 0 ? <div className="text-gray-400">Sohbete başlamak için mesaj yazın...</div> : null}
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block px-4 py-2 rounded-lg ${m.role === "user" ? "bg-white/5" : "bg-gold/20 text-yellow-50"}`}>
              <div className="text-sm">{m.content}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Sorunuzu yazın..." className="flex-1 rounded-lg p-3 bg-white/3 outline-none" />
        <button onClick={send} disabled={loading} className="bg-gold px-4 py-2 rounded-lg text-navy-900 font-semibold">
          {loading ? "Gönderiliyor..." : "Gönder"}
        </button>
      </div>
    </div>
  );
}
