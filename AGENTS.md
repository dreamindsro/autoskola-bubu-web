# Závazné pokyny pro práci v repozitáři

Tento soubor je provozní smlouva pro vývojáře i AI nástroje. Před jakoukoliv změnou jej přečtěte celý společně s `QUALITY-GATES.md`. Pokud zadání odporuje těmto pravidlům, práci zastavte a vyžádejte si výslovné rozhodnutí vlastníka.

## Povinný pracovní postup

1. Nepracujte přímo na `main`. Jedna změna patří do jedné krátké větve a jednoho pull requestu.
2. Před úpravou zjistěte skutečný stav kódu. Nedoplňujte domnělé funkce nebo obsah.
3. Udělejte nejmenší změnu, která splní zadání. Bez výslovného požadavku neměňte architekturu, závislosti ani vizuální směr.
4. Ke změně logiky přidejte nebo upravte test. Oprava chyby musí obsahovat regresní test.
5. Před předáním vždy spusťte `npm run verify`. Neobcházejte, nevypínejte ani nesnižujte žádnou kontrolu.
6. Pull request lze sloučit jen při zelených kontrolách `quality` a `docker` a vyplněném checklistu.
7. Dokumentaci upravte ve stejném pull requestu, pokud změna ovlivňuje chování, konfiguraci, obsahový model nebo nasazení.

## Produktové hranice

- Jde pouze o veřejný marketingový web Autoškoly BuBu a jednoduchou e-mailovou přihlášku.
- Nepřidávejte účty, přihlášení, studentský portál, administraci, onboarding, databázi, Supabase, e-shop, košík ani platby.
- Původní veřejný web je vizuální baseline. Zachovávejte značku, Montserrat, paletu, rozvržení a responzivní chování; bez výslovného zadání nedělejte redesign.
- Nepřidávejte falešné recenze, hodnocení, neověřené termíny kurzů, garantované délky ani jiné neověřené sliby.
- Právní identifikaci, ceny, kontakty a adresáty nikdy neodhadujte. Chybějící údaj označte jako blocker.

## Architektura a typovost

- React Server Components jsou výchozí. Direktivu `"use client"` smí používat pouze skutečně interaktivní izolovaná komponenta. Aktuální allowlist hlídá `scripts/verify-architecture.mjs`.
- Marketingové stránky musí zůstat staticky předgenerované do HTML. Jediný dynamický endpoint je `POST /api/orders`.
- `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride` a ostatní přísná TypeScript pravidla se nesmí vypnout.
- Nepoužívejte `any`, `@ts-ignore`, `@ts-nocheck`, vypínání ESLint pravidel ani type assertion jen za účelem umlčení chyby. Výjimka vyžaduje zdůvodnění v kódu i pull requestu.
- Nabídka, ceny, povolené dvojice kurz–pobočka a adresáti mají jediný zdroj v `src/data/catalog.ts`. Nevytvářejte jejich kopii v komponentách ani API.
- Novou produkční závislost přidejte pouze tehdy, když stejného výsledku nelze rozumně dosáhnout existujícím stackem. Zdůvodněte ji v pull requestu.

## Bezpečnost a osobní údaje

- Nikdy nedůvěřujte ceně, názvu kurzu, pobočce ani cílovému e-mailu z klienta.
- Nikdy neposílejte osobní údaje v URL, analytice ani logu.
- Zachovejte same-origin kontrolu, limit payloadu, Zod validaci, honeypot, minimální dobu vyplnění, rate limit, serverový allowlist a idempotency key.
- Úspěch formuláře smí vzniknout pouze po přijetí obou e-mailů providerem.
- Lokální e-mailový test mode nesmí v produkci obejít Resend. Tajné hodnoty patří pouze do runtime environment variables.

## SEO, SSR a výkon

- Každá veřejná indexovatelná stránka musí mít unikátní `title`, smysluplný `description` a vlastní canonical.
- Nová veřejná stránka musí být zařazena do navigace, sitemap nebo obou podle svého účelu. Neindexovatelné stránky musí mít explicitní `robots` nastavení.
- Zachovejte JSON-LD, Open Graph, `robots.ts`, `sitemap.ts`, 404 a jednoskokové permanentní redirecty.
- Nepoužívejte `force-dynamic`, klientské načítání hlavního obsahu ani browser-only rendering marketingových stránek.
- Obrázky používejte přes `next/image`, assety a fonty lokálně. Do produkce nepřidávejte vzdálené runtime fonty.
- `npm run guard:rendering` musí po buildu potvrdit předgenerované HTML a SEO metadata klíčových rout.

## Vzhled a přístupnost

- Podporujte šířku od 320 px, klávesnici, viditelný focus, sémantické HTML a `prefers-reduced-motion`.
- Změny klíčových stránek porovnejte ve stejném desktopovém a mobilním viewportu s baseline.
- Vizuální změna vyžaduje screenshot před/po v pull requestu. Bez screenshotu se vizuální změna neslučuje.
- Neodstraňujte labely formulářů, alt texty, skip link ani sémantickou hierarchii nadpisů.

## Testovací pravidla

- Unit testy nesmí záviset na síti, skutečném Resendu, čase systému ani pořadí spuštění.
- Testujte veřejné chování a bezpečnostní invarianty, ne implementační detaily.
- Coverage limity jsou minimum, ne cíl. Je zakázáno snižovat threshold nebo přidávat `exclude` kvůli průchodu CI.
- Změna katalogu musí zachovat unikátní ID/slugy, povolené kombinace a SEO sitemap testy.
- Změna objednávky musí otestovat validaci, allowlist, bezpečnostní kontroly a chybový stav provideru.

## Definition of Done

Změna je hotová pouze tehdy, když:

- odpovídá zadání a nepřidává vedlejší scope;
- má potřebné testy a dokumentaci;
- `npm run verify` projde lokálně;
- Docker build projde v CI;
- u vizuální změny je ověřen desktop i mobil;
- pull request vysvětluje riziko, rollback a případné produkční proměnné;
- nejsou známé chyby, placeholdery nebo blockery skryté v textu.

Podrobný význam kontrol a postup při selhání je v `QUALITY-GATES.md`. První kroky pro nevývojáře jsou v `START-HERE.md`.
