# Pokyny pro práci v repozitáři

## Produktové hranice

- Jde pouze o veřejný marketingový web Autoškoly BuBu a jednoduchou e-mailovou přihlášku.
- Nepřidávejte účty, přihlášení, studentský portál, administraci, onboarding, databázi, Supabase, e-shop, košík ani platby.
- Původní veřejný vzhled `origin/main` před migrací je vizuální baseline. Zachovávejte značku, Montserrat, paletu, rozvržení a responzivní chování; bez výslovného zadání nedělejte redesign.
- Nepřidávejte falešné recenze, hodnocení, neověřené termíny kurzů, garantované délky ani jiné neověřené sliby.

## Architektura

- Preferujte React Server Components. Klientský JavaScript patří jen tam, kde je nutná interakce.
- Marketingové stránky musí zůstat staticky předgenerované. Jediný dynamický endpoint je `POST /api/orders`.
- Nabídka, ceny, povolené dvojice kurz–pobočka a adresáti mají jediný zdroj v `src/data/catalog.ts`.
- Nikdy nedůvěřujte ceně, názvu kurzu, pobočce ani cílovému e-mailu z klienta.
- Nikdy neposílejte osobní údaje v URL ani je nezapisujte do logů.
- Lokální e-mailový test mode nesmí v produkci obejít Resend.

## Vzhled a přístupnost

- Používejte lokální fonty a assety z `public/assets` a obrázky přes `next/image`.
- Podporujte šířku od 320 px, klávesnici, viditelný focus, sémantické HTML a `prefers-reduced-motion`.
- Změny klíčových stránek porovnávejte ve stejném desktopovém a mobilním viewportu s baseline screenshoty.

## Kvalita

Před dokončením spusťte:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run coverage
npm run build
```

Ověřte také mobilní menu, CTA, předvýběr kurzu a pobočky, validační chyby, testovací odeslání a děkovací stav. Dokumentaci udržujte v souladu s reálným stavem aplikace.
