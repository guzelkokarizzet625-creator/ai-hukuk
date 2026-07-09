"use client";

import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Nav from "../components/Nav";

export const metadata = {
  title: "AL AI",
  description: "AL Hukuk AI & AL Psikoloji AI"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6">{children}</main>
            <footer className="text-center text-sm text-gray-400 py-6">
              © {new Date().getFullYear()} AL AI — Hukuki/psikolojik tavsiye yerine geçmez.
            </footer>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
