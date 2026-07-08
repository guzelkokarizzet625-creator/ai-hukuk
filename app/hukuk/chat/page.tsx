"use client";
import ChatBox from "../../../components/ChatBox";

export default function HukukChat() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-gold">AL Hukuk AI</h1>
      <p className="text-sm text-gray-300">Kategoriler: İş Hukuku · Aile Hukuku · İcra Hukuku · Ceza Hukuku · Trafik Hukuku · Tüketici Hukuku · Kira Hukuku</p>
      <ChatBox product="hukuk" />
    </div>
  );
}
