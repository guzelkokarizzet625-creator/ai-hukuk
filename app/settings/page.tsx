"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [promoteEmail, setPromoteEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const promote = async () => {
    try {
      const res = await fetch("/api/admin/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: promoteEmail, secret })
      });
      const data = await res.json();
      if (res.ok) setMsg(data.message || "Başarılı");
      else setMsg(data.error || "Hata");
    } catch (err) {
      setMsg("Sunucu hatası");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gold">Ayarlar</h1>
      <div className="p-4 bg-white/3 rounded-md">
        <h2 className="font-medium">Kendinizi admin yapmak (deploy sonrası)</h2>
        <p className="text-sm text-gray-300">E-posta adresinizi ve PROMOTE_SECRET değerini girin.</p>
        <input value={promoteEmail} onChange={(e) => setPromoteEmail(e.target.value)} placeholder="E-posta" className="w-full mt-2 p-2 rounded bg-white/5" />
        <input value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="PROMOTE_SECRET" className="w-full mt-2 p-2 rounded bg-white/5" />
        <button onClick={promote} className="mt-2 bg-gold text-navy-900 px-3 py-2 rounded">Promote</button>
        {msg ? <p className="mt-2 text-sm">{msg}</p> : null}
      </div>
    </div>
  );
}
