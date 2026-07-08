import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

// Güvenli promote için basit bir secret kontrolü kullanıyoruz
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, secret } = req.body as { email?: string; secret?: string };
  if (!email || !secret) return res.status(400).json({ error: "email ve secret gerekli" });

  if (secret !== process.env.PROMOTE_SECRET) return res.status(403).json({ error: "Yetkisiz" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

  await prisma.user.update({ where: { id: user.id }, data: { role: "ADMIN" } });

  res.json({ ok: true, message: `${email} kullanıcısı admin yapıldı.` });
}
