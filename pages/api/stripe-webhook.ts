// Basit Stripe webhook iskeleti - gerçek kullanımda raw body ve signature doğrulaması ekleyin
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  // TODO: İmza doğrulama ekleyin
  const evt = req.body;

  // Örnek: abonelik aktif olduğunda membership oluştur
  if (evt.type === "checkout.session.completed") {
    const customerEmail = evt.data?.object?.customer_details?.email as string | undefined;
    if (customerEmail) {
      const user = await prisma.user.findUnique({ where: { email: customerEmail } });
      if (user) {
        await prisma.membership.create({
          data: {
            userId: user.id,
            provider: "stripe",
            status: "active",
            startedAt: new Date()
          }
        });
      }
    }
  }

  res.json({ received: true });
}
