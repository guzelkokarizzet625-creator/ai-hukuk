import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  // Stripe webhook imza doğrulamasını ekleyin
  // const sig = req.headers["stripe-signature"] as string;
  // const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

  // TODO: Event tipine göre (checkout.session.completed vb) Prisma'da membership oluşturun

  res.json({ received: true });
}
