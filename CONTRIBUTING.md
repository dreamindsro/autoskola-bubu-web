# Přispívání do projektu

Než začnete, přečtěte `AGENTS.md`, `START-HERE.md` a `QUALITY-GATES.md`.

## Workflow

1. Aktualizujte `main` a vytvořte větev s krátkým názvem, například `content/cenik` nebo `fix/order-validation`.
2. Instalujte výhradně přes `npm ci`. Neměňte lockfile bez skutečné změny dependencies.
3. Proveďte jednu související změnu a přidejte odpovídající testy.
4. Spusťte `npm run verify`.
5. Vytvořte pull request a kompletně vyplňte šablonu.
6. Reagujte na neúspěšné kontroly a připomínky. Neslučujte při známém problému.

## Commity a pull requesty

- Commit message má stručně popsat výsledek, například `Update Kladno course pricing`.
- Jeden pull request nemá míchat refactor, redesign a obsahovou změnu.
- V popisu uveďte dopad, ověření, rizika a rollback.
- Vizuální změny musí mít desktopové a mobilní screenshoty před/po.
- Změny environment variables popište názvem proměnné, nikdy její tajnou hodnotou.

## Závislosti

Novou produkční závislost lze přidat pouze s vysvětlením:

- proč nestačí existující stack nebo platformní API;
- dopad na velikost, bezpečnost a údržbu;
- zda běží na serveru nebo v prohlížeči;
- jak je otestovaná.

## Hotovo znamená zelené CI

Lokální úspěch nestačí. Pull request musí mít zelené GitHub checks `quality` a `docker`. Podrobnosti jsou v `QUALITY-GATES.md`.
