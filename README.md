# Autoškola BuBu – veřejný web

Veřejný web Autoškoly BuBu pro Střížkov, Kladno a Statenice. Projekt převádí původní statický web do Next.js 16 App Routeru bez změny jeho veřejného vizuálního směru: zachovává značku, Montserrat, tyrkysovou/modrou paletu, původní fotografie, strukturu hlavních marketingových stránek, hlavičku, patičku a mobilní CTA.

## Rozsah

- homepage, kurzy, ceník, průběh výuky, pobočky, kontakt, o nás a SEO články;
- staticky předgenerované veřejné HTML;
- jednoduchá přihláška bez účtu a bez online platby;
- jediná dynamická aplikační část je `POST /api/orders`;
- žádný studentský portál, administrace, onboarding, Supabase, databáze, e-shop, košík ani platební brána.

## Lokální spuštění

Požadován je Node.js 20.9 nebo novější.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Vývojový server běží standardně na `http://localhost:3000`.

## E-mail a prostředí

```dotenv
SITE_URL=https://www.autoskolabubu.cz
RESEND_API_KEY=re_...
RESEND_FROM=Autoškola BuBu <prihlasky@overena-domena.cz>
RESEND_REPLY_TO=volitelna-adresa@autoskolabubu.cz
ORDER_EMAIL_MODE=test
RESEND_BASE_URL=
RESEND_ALLOW_LOCAL_PROVIDER_MOCK=false
```

- `RESEND_API_KEY` a `RESEND_FROM` jsou v produkci povinné.
- `SITE_URL` přidává přesný povolený origin vedle veřejné kanonické domény.
- Mimo produkci je bezpečný test mode výchozí. `ORDER_EMAIL_MODE=resend` jej pro integrační test výslovně vypne. Hodnota `test` se v `NODE_ENV=production` ignoruje.
- Produkce musí používat ověřenou odesílací doménu v Resendu.
- Pro lokální smoke test produkčního buildu lze výslovně povolit přibalený Resend-kompatibilní mock. `RESEND_BASE_URL` přijme pouze loopback URL a současně vyžaduje `RESEND_ALLOW_LOCAL_PROVIDER_MOCK=true`; obě hodnoty patří jen do necommitovaného `.env.local`.

Endpoint kontroluje origin, typ a velikost payloadu, Zod schéma, honeypot, minimální dobu vyplnění, limit pokusů a povolenou dvojici kurz–pobočka. Kurz, pobočka, cena i cílový e-mail se vždy načítají ze serverového katalogu. Resend batch má idempotency key a úspěch se vrací pouze při přijetí obou zpráv providerem. Aplikace nezapisuje obsah přihlášek do logů a osobní údaje neposílá v URL.

## Kontroly

```bash
npm run format:check
npm run lint
npm run typecheck
npm run coverage
npm run build
```

CI provádí všechny uvedené kontroly a samostatně ověřuje sestavení produkčního Docker image. Produkční Next build má `output: "standalone"`.

## Nasazení na Coolify

Repozitář obsahuje optimalizovaný multi-stage `Dockerfile`. Builder instaluje přesně zamčené závislosti přes `npm ci`; výsledný runtime image obsahuje pouze Next.js standalone server, statické soubory a veřejné assety. Aplikace běží pod neprivilegovaným uživatelem `nextjs` na portu `3000`.

V Coolify použijte build pack **Dockerfile** s těmito hodnotami:

- Dockerfile: `/Dockerfile`;
- port: `3000`;
- healthcheck path: `/healthz`;
- healthcheck port: `3000`;
- bez vlastního start commandu — image spouští `node server.js`;
- produkční proměnné nastavte v Coolify pouze jako runtime variables, ne jako build arguments.

Docker image má vlastní healthcheck se start periodou 20 sekund. `/healthz` je statický soubor, takže nepřidává další dynamický aplikační endpoint ani závislost na Resendu.

## Zdroj obsahu

Kurzy, povolené pobočky, ceny a adresáti jsou v [`src/data/catalog.ts`](src/data/catalog.ts). Změna nabídky patří pouze tam; formulář ani API nesmí mít vlastní kopii cen nebo e-mailů.

## Produkční checklist

- doplnit a právně schválit identifikaci provozovatele, obchodní podmínky a zásady ochrany osobních údajů;
- vytvořit Resend API key, ověřit odesílací doménu a nastavit serverové proměnné;
- potvrdit správnost tří příjmových adres poboček;
- za produkčním proxy/gateway nastavit sdílený rate limit; vestavěný paměťový limit je obrana jedné Node instance;
- spustit browser smoke test a testovací přihlášku v testovacím prostředí.
