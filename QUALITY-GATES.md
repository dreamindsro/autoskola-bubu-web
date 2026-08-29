# Quality gates

Tento dokument definuje kontroly, které chrání kvalitu webu. Kontroly jsou závazné. Pokud se musí pravidlo změnit, změna patří do samostatného pull requestu se zdůvodněním a schválením technického vlastníka.

## Jediný povinný příkaz

```bash
npm ci
npm run verify
```

`npm run verify` provede v pevném pořadí:

1. `format:check` – konzistentní formátování;
2. `lint` – Next.js Core Web Vitals, TypeScript a zákaz problematických konstrukcí;
3. `typecheck` – strict TypeScript bez emitování;
4. `coverage` – unit testy a minimální coverage;
5. `guard:architecture` – produktové a architektonické invarianty;
6. `build` – skutečný produkční Next.js build;
7. `guard:rendering` – předgenerované HTML, SEO metadata, jediný API endpoint a standalone výstup.

Úspěch jednotlivého příkazu nenahrazuje celý `verify`.

## Automaticky hlídané invarianty

### TypeScript a lint

- `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `noFallthroughCasesInSwitch` a `allowJs: false`;
- žádné `any`, `@ts-ignore`, `@ts-nocheck` nebo `console` v aplikačním `src`;
- ESLint bez warningů;
- Next.js Core Web Vitals pravidla.

### Architektura

- jediný API route handler je `src/app/api/orders/route.ts`;
- jediná povolená client component je explicitní allowlist v architektonickém guardu;
- `src/lib/email.ts` zůstává server-only;
- Next.js build zůstává `standalone`;
- zakázané databázové, autentizační a platební balíčky se nesmí objevit v dependencies.

### Testy

- všechny Vitest testy musí projít;
- minimálně 80 % statements/functions/lines a 75 % branches v hlídané aplikační logice;
- SEO test kontroluje unikátní sitemap URL, všechny kurzy a články, lokality a robots pravidla;
- coverage práh se nesnižuje kvůli průchodu konkrétní změny.

### SSR/SSG a SEO

- homepage, nabídka, ceník, průběh výuky, pobočky, kontakt, informace, články, kurzy a právní stránky musí existovat jako předgenerované HTML;
- klíčové HTML musí obsahovat český jazyk dokumentu, title, description, canonical a Open Graph metadata;
- homepage musí obsahovat JSON-LD;
- `/api/orders` nesmí být omylem předgenerovaný a žádný další `/api/*` endpoint není povolen;
- `.next/standalone/server.js` musí vzniknout pro Coolify deployment.

### Docker

Samostatný CI job sestaví multi-stage produkční image. Ověřuje Dockerfile a závislosti v čistém prostředí. Job se spustí až po úspěchu hlavní quality kontroly.

## Ruční kontroly podle typu změny

| Typ změny    | Povinné ruční ověření                                                            |
| ------------ | -------------------------------------------------------------------------------- |
| Pouze text   | význam, pravopis, pravdivost, žádné neověřené sliby                              |
| Cena/katalog | správná pobočka, cena, CTA předvýběr, adresát; test katalogu                     |
| Vzhled/CSS   | desktop + mobil od 320 px, klávesnice, focus, reduced motion, screenshot před/po |
| Nová stránka | navigace, metadata, canonical, sitemap/robots, nadpis H1, mobil                  |
| Formulář/API | validace, honeypot, čas, allowlist, idempotence, oba e-maily, chyba provideru    |
| Redirect     | jednoskokový permanentní redirect a správný cílový canonical                     |
| Deployment   | `/healthz`, homepage, testovací přihláška, žádné secrets v buildu/logu           |

## Doporučené nastavení GitHub Ruleset pro `main`

Repozitářové soubory samy nemohou vynutit ochranu větve. V **Settings → Rules → Rulesets** vytvořte aktivní branch ruleset pro výchozí větev `main`:

1. zakažte deletion a force push;
2. vyžadujte pull request před merge;
3. po jmenování technického vlastníka vyžadujte alespoň jedno schválení;
4. vyžadujte vyřešení všech review conversations;
5. vyžadujte status checks `quality` a `docker`;
6. vyžadujte branch up to date before merging;
7. nepovolujte bypass osobě, která běžně zadává obsahové změny;
8. povolte pouze squash merge a automatické smazání sloučené větve.

Bez tohoto rulesetu jsou kontroly informativní, protože uživatel s write přístupem může pushnout přímo do `main`.

## Co dělat při červené kontrole

1. Neslučujte pull request.
2. Otevřete selhaný krok a zkopírujte první konkrétní chybovou zprávu.
3. Opravte příčinu v kódu nebo testu.
4. Nemažte test, nepřidávejte ignore a nesnižujte threshold.
5. Spusťte znovu celý `npm run verify`.

Výjimku nelze udělit slovně. Každá změna quality gate musí být viditelná v diffu a samostatně schválená.
