# Začněte tady

Tento dokument je určen člověku, který web přebírá a nemusí umět programovat. Nejdůležitější pravidlo: **nikdy neupravujte ani nemažte soubory přímo ve větvi `main`**.

## Bezpečný postup každé změny

1. Popište jednu konkrétní změnu. Nekombinujte například změnu ceny, redesign a nový formulář do jednoho úkolu.
2. Vytvořte novou větev z aktuálního `main`.
3. Pokud používáte AI nástroj, vložte mu zadání z šablony níže a požádejte ho, aby nejdřív přečetl `AGENTS.md` a `QUALITY-GATES.md`.
4. Nechte vytvořit pull request. Nikdy neposílejte změnu rovnou do `main`.
5. Počkejte, až budou kontroly **quality** a **docker** zelené.
6. Zkontrolujte texty, ceny, kontakty a u vizuální změny screenshot desktopu i mobilu.
7. Teprve potom pull request slučte. Používejte **Squash and merge**.

Pokud je některá kontrola červená, změnu neslučujte. Nechte opravit příčinu; nevypínejte test ani kontrolu.

## Co můžete měnit relativně bezpečně

- Text stránky: příslušný soubor v `src/app/.../page.tsx`.
- Cena, dostupnost kurzu nebo kontakt pobočky: pouze `src/data/catalog.ts`.
- SEO title a description: export `metadata` u konkrétní stránky.
- Nový lokální obrázek: `public/assets`, použití přes `next/image`.

I tyto změny musí projít pull requestem a automatickými kontrolami.

## Co bez technického člověka neměňte

- `src/app/api/orders`, `src/lib/email.ts` a bezpečnost formuláře;
- `next.config.ts`, `tsconfig.json`, ESLint, Vitest a CI;
- `Dockerfile`, Coolify konfiguraci a environment variables;
- závislosti v `package.json`;
- canonicaly, redirecty, sitemapu, robots nebo JSON-LD;
- právní texty bez schválení provozovatele/právníka.

## Šablona zadání pro AI nebo vývojáře

```text
Pracuj na samostatné větvi, ne přímo na main.
Nejdřív přečti AGENTS.md, START-HERE.md a QUALITY-GATES.md a dodrž je.

Cíl změny:
[jedna konkrétní věta]

Co se smí změnit:
[stránky, texty nebo funkce]

Co se nesmí změnit:
[vzhled, ceny, formulář, URL apod.]

Akceptační kritéria:
- [ověřitelný bod]
- [ověřitelný bod]

Přidej nebo uprav testy, pokud se mění logika.
Před dokončením spusť npm run verify.
Vytvoř pull request a uveď změny, rizika, způsob ověření a rollback.
U vizuální změny přilož desktopový a mobilní screenshot před/po.
```

## Jak číst výsledky GitHubu

- **quality – zelená:** formátování, lint, TypeScript, unit testy, coverage, architektura, SEO/SSR a produkční build prošly.
- **docker – zelená:** lze sestavit produkční image pro Coolify.
- **Červená kontrola:** změna není připravená. Otevřete detail kontroly a předejte chybový výpis vývojáři/AI.
- **Žlutá kontrola:** stále běží. Počkejte.

## Nouzový návrat

Když se chyba projeví až po nasazení, v GitHubu otevřete poslední sloučený pull request a použijte **Revert**. Vznikne nový pull request, který musí znovu projít kontrolami. Nepřepisujte historii a nepoužívejte force push.

## Produkční blockery před prvním spuštěním

- doplněná a právně schválená identifikace provozovatele, obchodní podmínky a ochrana osobních údajů;
- ověřená odesílací doména a produkční Resend proměnné;
- potvrzené cílové e-maily všech poboček;
- nastavená ochrana větve podle `QUALITY-GATES.md`;
- úspěšná testovací přihláška v produkčně podobném prostředí.
