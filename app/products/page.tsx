import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gold">Ürünler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/hukuk/chat" className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h3 className="font-medium">AL Hukuk AI</h3>
          <p className="text-sm text-gray-300">Kategoriler: İş, Aile, İcra, Ceza, Trafik, Tüketici, Kira</p>
        </Link>

        <Link href="/psikoloji/chat" className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h3 className="font-medium">AL Psikoloji AI</h3>
          <p className="text-sm text-gray-300">Asistan: Psikoloji, Aile Terapisi, Motivasyon, Duygu Günlüğü, Nefes Egzersizleri</p>
        </Link>
      </div>
    </div>
  );
}
