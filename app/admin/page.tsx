"use client";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();

  const isAdmin = (session as any)?.user?.role === "ADMIN";

  if (status === "loading") return <div className="text-gray-400">Yükleniyor...</div>;
  if (!session) return <div className="text-gray-300">Giriş gerekli</div>;
  if (!isAdmin) return <div className="text-red-400">Erişim reddedildi: Yönetici değilsiniz</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gold">Admin Paneli</h1>
      <p className="text-gray-300">Sistem istatistikleri ve kullanıcı yönetimi (örnek).</p>
    </div>
  );
}
