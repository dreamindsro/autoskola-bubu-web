# Autoškola BuBu – kontext pro LLM

Tento soubor je rychlý vstupní bod pro AI nástroje pracující s repozitářem. Není náhradou za závazné instrukce.

## Povinné pořadí čtení

Před změnou načtěte:

1. `AGENTS.md` – závazný produktový a technický kontrakt;
2. `QUALITY-GATES.md` – automatické kontroly a Definition of Done;
3. `START-HERE.md` – bezpečný workflow předání;
4. `ARCHITECTURE.md` a `TECH-SPECS.md` – výsledná architektura;
5. soubory přímo dotčené zadáním.

Pokud uživatelský požadavek odporuje produktovým hranicím nebo bezpečnostním pravidlům, zastavte práci a vyžádejte si výslovné rozhodnutí vlastníka.

## Účel produktu

Veřejný web Autoškoly BuBu pro Střížkov, Kladno a Statenice:

- marketingové a lokální SEO stránky;
- nabídka, kurzy a sjednocený ceník;
- informace o průběhu výuky a pobočkách;
- jednoduchá e-mailová přihláška bez účtu a bez online platby.

Nejde o studentský portál, administraci, e-shop ani rezervační systém termínů.

## Neměnné hranice

- Nepřidávejte účty, přihlášení, onboarding, databázi, Supabase, administraci, košík ani platby.
- Nedělejte redesign bez výslovného zadání. Původní veřejný vzhled, značka, Montserrat a tyrkysovo-modrá paleta jsou baseline.
- Nevymýšlejte recenze, hodnocení, termíny, garance, právní identifikaci, ceny ani kontakty.
- Nepřidávejte osobní údaje do URL, analytiky nebo logů.
- Nepřidávejte novou produkční závislost bez zdůvodnění v pull requestu.

## Technický kontrakt

- Next.js 16 App Router, React 19, strict TypeScript a Tailwind CSS 4.
- React Server Components jsou výchozí.
- Veřejné stránky musí zůstat staticky předgenerované do serverově dostupného HTML.
- Jediný dynamický endpoint je `POST /api/orders`.
- Jediná aktuálně povolená client component je `src/components/order-form.tsx`.
- Build musí zachovat `output: "standalone"` pro Coolify.
- Lokální fonty a assety; obrázky přes `next/image`.

Architektonické invarianty automaticky kontroluje `scripts/verify-architecture.mjs`.

## Zdroje pravdy

- Kurzy, ceny, pobočky, povolené kombinace a adresáti: `src/data/catalog.ts`.
- SEO články: `src/data/articles.ts`.
- Základní brand a canonical URL: `src/data/site.ts`.
- Metadata jednotlivých stránek: příslušný `src/app/**/page.tsx`.
- Redirecty a bezpečnostní hlavičky: `next.config.ts`.
- Formulářová validace a allowlist: `src/lib/order.ts`.
- Origin a rate limit: `src/lib/request-security.ts`.
- Odeslání e-mailů: server-only `src/lib/email.ts`.

Nevytvářejte druhou kopii cen, adresátů nebo povolených kombinací.

## Objednávkový tok

Server musí vždy:

1. ověřit origin, content type a velikost payloadu;
2. provést Zod validaci, honeypot a minimální dobu vyplnění;
3. aplikovat rate limit;
4. odvodit kurz, pobočku, cenu a adresáta z katalogu;
5. použít idempotency key;
6. odeslat potvrzení studentovi a souhrn správné pobočce;
7. vrátit úspěch pouze při přijetí obou e-mailů providerem.

Test mode nesmí fungovat v produkci. Secrets patří pouze do serverových runtime environment variables.

## SEO a renderování

Každá veřejná indexovatelná stránka potřebuje:

- unikátní title a vlastní canonical;
- smysluplný description;
- serverově dostupný hlavní obsah a H1;
- správný dopad do sitemap/robots;
- Open Graph metadata;
- mobilní a přístupné provedení.

Zachovejte JSON-LD, 404 a jednoskokové permanentní redirecty. Nepoužívejte `force-dynamic` ani klientské načítání hlavního marketingového obsahu.

`scripts/verify-rendering.mjs` po buildu kontroluje předgenerované HTML, metadata, unikátní title/canonicaly, API scope a standalone výstup.

## Povinný workflow

1. Pracujte na samostatné větvi, nikdy přímo na `main`.
2. Udělejte nejmenší změnu odpovídající zadání.
3. Ke změně logiky přidejte test; oprava chyby vyžaduje regresní test.
4. Spusťte:

```bash
npm ci
npm run verify
```

5. Vytvořte pull request podle šablony.
6. Vizuální změnu doložte desktopovým a mobilním screenshotem před/po.
7. Neslučujte, dokud nejsou checks `quality` a `docker` zelené.

Je zakázáno řešit selhání CI vypnutím pravidla, odstraněním testu, přidáním ignore nebo snížením coverage.

## Rozlišení od veřejného llms.txt

`llms.md` popisuje práci v repozitáři. `public/llms.txt` je stručný veřejný popis obsahu výsledného webu a nesmí obsahovat interní instrukce, secrets ani provozní detaily.
