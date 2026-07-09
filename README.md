# AL AI

AL Hukuk AI & AL Psikoloji AI — Next.js + TypeScript + Tailwind ile hazırlanmış örnek uygulama.

## Özellikler

- Türkçe kullanıcı arayüzü
- Koyu lacivert + altın tema
- Google ile oturum açma (NextAuth)
- Ücretsiz kullanıcılar: günlük 3 soru limiti
- Premium için Stripe altyapısına hazır yerler
- AI sohbet: Google Gemini (Generative Language API) ile sunucu tarafı entegrasyonu
- Vercel deploy için hazır

## Kurulum

1. Klonlayın ve bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. `.env` dosyasını oluşturun (aşağıdaki örnek):
   ```bash
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="uzun-rastgele-string"
   GOOGLE_CLIENT_ID="..."
   GOOGLE_CLIENT_SECRET="..."
   GEMINI_API_KEY="... (Google Generative API Key)"
   STRIPE_SECRET_KEY="..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="..."
   ```

3. Prisma migrate:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. Geliştirmeyi başlatın:
   ```bash
   npm run dev
   ```

## Google Gemini Notu

- `lib/gemini.ts` içindeki endpoint örnektir. Google'ın güncel Generative API dökümantasyonuna göre endpoint ve body formatını kontrol edip gerekirse düzenleyin.
- Prod için API anahtarınızı güvenle saklayın (Vercel env).

## Stripe / Premium

- Stripe entegrasyonu için `pages/api/stripe-webhook.ts` örneği eklendi. Gerçek kullanımda webhook imza doğrulaması ve checkout flow'u ekleyin.

## Vercel Dağıtımı

- Vercel'e push edin ve proje ayarlarında yukarıdaki ortam değişkenlerini ekleyin.
- `DATABASE_URL`: production için PostgreSQL/PlanetScale/Heroku Postgres kullanmanızı öneririm.
- `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_*` ve `GEMINI_API_KEY` kesinlikle Vercel Secrets olarak eklenmelidir.

## Uyarı

Bu repo örnek bir başlangıç iskeletidir. Üretim öncesinde güvenlik, hata yönetimi, rate limit, maliyet kontrolü (Gemini istekleri pahalı olabilir), kullanıcı verilerinin gizliliği gibi konuları tamamlayın.
