# Technická specifikace

## Stack

| Oblast    | Řešení                                   |
| --------- | ---------------------------------------- |
| Framework | Next.js 16.3, App Router, React 19       |
| Jazyk     | TypeScript strict                        |
| Styly     | Tailwind CSS 4 + projektové CSS tokeny   |
| Font      | lokální Montserrat Variable              |
| Validace  | Zod 4                                    |
| E-mail    | Resend batch API                         |
| Testy     | Vitest + V8 coverage                     |
| Kvalita   | ESLint 9, Prettier, TypeScript           |
| Build     | Next standalone Node, multi-stage Docker |

## Veřejné routy

`/`, `/kurzy`, `/kurzy/[slug]`, `/cenik`, `/jak-probiha-vyuka`, `/strizkov`, `/kladno`, `/statenice`, `/kontakt`, `/o-nas`, `/blog`, `/blog/[slug]`, `/objednavka`, právní dokumenty, `robots.txt`, `sitemap.xml` a 404.

Legacy veřejné aliasy mají jednoskokové permanentní redirecty v `next.config.ts`. Odstraněné aplikační routy portálu, administrace, onboardingu, obchodu a kampaně vedou na nejbližší veřejnou stránku.

## API

### `POST /api/orders`

Požaduje `Content-Type: application/json` a přesný `Origin`. Maximální payload je 20 000 bytů.

Pole:

- `firstName`, `lastName`, `email`, `phone`;
- `courseId`, `branchId`;
- volitelná `note` do 1 000 znaků;
- prázdný honeypot `website`;
- `formStartedAt`, UUID `idempotencyKey`;
- `termsAccepted: true`, `privacyAccepted: true`.

Stavy: `201` úspěch obou providerem přijatých e-mailů; `400` validace/allowlist/čas; `403` origin; `413` velikost; `415` content type; `429` limit; `503` provider nebo neočekávaná chyba. Odpověď neobsahuje provider ID ani osobní údaje.

## Bezpečnost

- cena, text kurzu, pobočka a recipient se neberou z klienta;
- exact-origin allowlist používá kanonickou doménu a `SITE_URL`;
- honeypot, minimální doba 3,5 s, payload limit a pět pokusů za deset minut na hash adresy;
- idempotency key je předán Resend batchi;
- bezpečný test mode je mimo produkci výchozí; reálný Resend v developmentu vyžaduje `ORDER_EMAIL_MODE=resend` a v produkci se test mode ignoruje;
- produkční build lze lokálně ověřit proti přibalenému provider mocku, ale vlastní base URL je povolena jen pro loopback a s explicitním serverovým přepínačem;
- základní bezpečnostní hlavičky a zakázané browser capabilities jsou v `next.config.ts`;
- žádný obsah formuláře se záměrně neloguje.

## SEO a výkon

Serverové metadata, canonicaly, Open Graph, JSON-LD `DrivingSchool` a `Course`, sitemap, robots a lokální assety. Klíčové fotografie používají `next/image`. Marketingové routy jsou předgenerované a mobilní menu funguje přes nativní HTML bez klientského JavaScriptu.

## Docker a Coolify

- build i runtime používají Node.js 24 Alpine;
- závislosti instaluje reprodukovatelné `npm ci` podle `package-lock.json`;
- runtime obsahuje pouze Next standalone výstup, statické soubory a `public`;
- proces běží jako neprivilegovaný uživatel `nextjs` (UID 1001);
- aplikace poslouchá na `0.0.0.0:3000`;
- Docker healthcheck kontroluje statický `GET /healthz`;
- secrets a produkční konfigurace se předávají pouze jako Coolify runtime environment variables.

## Testovací minimum

CI vyžaduje průchod `npm run verify`: čisté formátování, lint bez warningů, strict typecheck, Vitest coverage alespoň 80 % statements/functions/lines a 75 % branches, architektonický guard, produkční build a kontrolu předgenerovaného HTML a SEO metadat. Samostatný job sestavuje Docker image. Browser smoke pokrývá desktop, mobilní navigaci, CTA, query předvýběr, chyby, testovací odeslání a děkovací stav.

Pravidla změn, Definition of Done a doporučený GitHub branch ruleset jsou v `AGENTS.md`, `QUALITY-GATES.md` a `CONTRIBUTING.md`. Tyto dokumenty jsou součástí technického kontraktu projektu.
