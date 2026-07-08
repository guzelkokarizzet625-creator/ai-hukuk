import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../lib/prisma";
import { callGemini } from "../../lib/gemini";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";

async function getUsageCount(userId: string) {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  const record = await prisma.usage.findFirst({
    where: {
      userId,
      date: {
        gte: todayStart,
        lte: todayEnd
      }
    }
  });
  return record?.count ?? 0;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions as any);
  if (!session || !session.user?.email) return res.status(401).json({ error: "Oturum açılmamış" });

  const userEmail = session.user.email as string;
  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

  const { message, product, chatId } = req.body as { message: string; product: string; chatId?: string };

  const isPremium = await prisma.membership.findFirst({ where: { userId: user.id, status: "active" } });
  if (!isPremium) {
    const usageCount = await getUsageCount(user.id);
    if (usageCount >= 3) {
      return res.status(403).json({ error: "Günlük ücretsiz soru hakkınızı doldurdunuz. Lütfen premium olun." });
    }
  }

  let chat;
  if (chatId) {
    chat = await prisma.chat.findUnique({ where: { id: chatId } });
  }
  if (!chat) {
    chat = await prisma.chat.create({
      data: {
        userId: user.id,
        product,
        title: message.slice(0, 100)
      }
    });
  }

  await prisma.message.create({
    data: {
      chatId: chat.id,
      role: "user",
      content: message
    }
  });

  let systemPrompt = "";
  if (product === "hukuk") {
    systemPrompt = `Sen AL Hukuk AI’sın. Türkiye hukukuna dair genel bilgilendirici cevaplar verirsin. Hukuki tavsiye vermezsin, resmi görüş yerine geçmez. Kullanıcıya açık ve anlaşılır bir dilde yanıt ver. Kategoriler: İş Hukuku, Aile Hukuku, İcra Hukuku, Ceza Hukuku, Trafik Hukuku, Tüketici Hukuku, Kira Hukuku.`;
  } else {
    systemPrompt = `Sen AL Psikoloji AI’sın. Destekleyici bilgi ve öneriler sun. Terapist olmadığın, teşhis koymadığın ve yalnızca bilgi/ destek amaçlı yardımcı olduğun her yanıtta açıkça belirtilmelidir.`;
  }

  const prompt = `${systemPrompt}\nKullanıcı: ${message}\nCevap:`;

  try {
    const aiResponse = await callGemini(prompt);
    await prisma.message.create({
      data: {
        chatId: chat.id,
        role: "assistant",
        content: aiResponse
      }
    });

    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());
    const existing = await prisma.usage.findFirst({
      where: {
        userId: user.id,
        date: {
          gte: todayStart,
          lte: todayEnd
        }
      }
    });
    if (existing) {
      await prisma.usage.update({
        where: { id: existing.id },
        data: { count: existing.count + 1 }
      });
    } else {
      await prisma.usage.create({
        data: { userId: user.id, date: new Date(), count: 1 }
      });
    }

    res.json({ chatId: chat.id, response: aiResponse });
  } catch (err) {
    console.error("AI çağrısı hata:", err);
    res.status(500).json({ error: "AI servisine bağlanırken hata oluştu." });
  }
}
