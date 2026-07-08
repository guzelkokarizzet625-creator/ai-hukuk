"use client";
import ChatBox from "../../../components/ChatBox";

export default function PsikolojiChat() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-gold">AL Psikoloji AI</h1>
      <p className="text-sm text-gray-300">
        Özellikler: Psikoloji asistanı · Aile terapisi destek asistanı · Motivasyon · Duygu günlüğü · Stres & kaygı desteği · Nefes egzersizleri
      </p>
      <div className="rounded-md bg-yellow-50/5 p-4 text-sm text-gray-300">
        <strong>UYARI:</strong> Ben bir terapist değilim, teşhis koymam. Sağlık sorunlarınız için lütfen bir uzmanla görüşün.
      </div>
      <ChatBox product="psikoloji" />
    </div>
  );
}
