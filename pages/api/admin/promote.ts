import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, secret } = req.body;
  if (secret !== process.env.PROMOTE_SECRET) {
    return res.status(401).json({ error: "Geçersiz gizli anahtar" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

    await prisma.membership.create({
      data: {
        userId: user.id,
        status: "active",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    });

    res.json({ success: true, message: "Kullanıcı premium'a yükseltildi." });
  } catch (err) {
    console.error("Premium yükseltme hatası:", err);
    res.status(500).json({ error: "Premium yükseltme başarısız." });
  }
}
