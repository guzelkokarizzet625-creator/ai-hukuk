import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <h1 className="text-3xl font-semibold text-gold">AL AI</h1>
      <p className="text-center text-gray-300 max-w-xl">
        AL Hukuk AI ve AL Psikoloji AI ile hızlı, anlaşılır ve güvenli destek. Ücretsiz kullanıcılar için günlük 3 soru hakkı. Premium üyelik ile limitsiz erişim.
      </p>

      <div className="w-full flex gap-4 flex-col sm:flex-row">
        <Link href="/products" className="w-full sm:w-1/2 bg-white/5 border border-white/10 rounded-lg p-6 hover:scale-101 transition">
          <h2 className="text-xl font-medium">Ürünleri Keşfet</h2>
          <p className="text-sm text-gray-300 mt-2">AL Hukuk AI ve AL Psikoloji AI arasından seçim yapın.</p>
        </Link>

        <Link href="/panel" className="w-full sm:w-1/2 bg-gradient-to-r from-primary-800 to-primary-700 rounded-lg p-6">
          <h2 className="text-xl font-medium text-gold">Kullanıcı Paneli</h2>
          <p className="text-sm text-gray-200 mt-2">Hesabınız, üyelikler ve sohbet geçmişi.</p>
        </Link>
      </div>
    </div>
  );
}
