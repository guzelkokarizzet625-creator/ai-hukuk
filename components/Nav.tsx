"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession();
  return (
    <nav className="w-full bg-[rgba(255,255,255,0.02)] border-b border-white/6">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gold text-navy-900 flex items-center justify-center font-bold">AL</div>
          <div className="text-white font-semibold">AL AI</div>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/products" className="text-sm text-gray-200 hidden sm:inline">Ürünler</Link>
          <Link href="/panel" className="text-sm text-gray-200 hidden sm:inline">Panel</Link>

          {session?.user ? (
            <>
              <button onClick={() => signOut()} className="text-sm text-gray-200">Çıkış</button>
            </>
          ) : (
            <button onClick={() => signIn("google")} className="text-sm bg-gold px-3 py-1 rounded-md text-navy-900">Google ile giriş</button>
          )}
        </div>
      </div>
    </nav>
  );
}
