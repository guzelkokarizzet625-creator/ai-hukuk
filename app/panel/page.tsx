"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function PanelPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div>
        <h2 className="text-xl font-semibold">Yükleniyor...</h2>
        <p className="text-gray-300">Lütfen bekleyin</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div>
        <h2 className="text-xl font-semibold">Giriş gerekli</h2>
        <p className="text-gray-300">Devam etmek için Google ile giriş yapın.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gold">Kullanıcı Paneli</h1>
      <p className="text-gray-300">Hoşgeldiniz, {(session as any).user?.name}</p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/panel/history" className="p-4 bg-white/3 rounded-lg">Sohbet Geçmişi</Link>
        <Link href="/settings" className="p-4 bg-white/3 rounded-lg">Ayarlar</Link>
      </div>
    </div>
  );
}
