# Klientský podklad pro redesign webu autoskolabubu.cz

Datum: `2026-04-01`

Podklad vychází z těchto vstupů:
- UX audit současného webu
- návrh nové struktury webu
- návrh SEO struktury a strategie

Účel dokumentu:
- srozumitelně ukázat, proč současný web neplní svůj potenciál
- pojmenovat hlavní problémy z pohledu uživatele, obchodu a SEO
- ukázat, kde je prostor pro zlepšení
- doporučit jasný směr redesignu jako obchodně smysluplný krok

## Executive Summary

Současný web Autoškoly BuBu nepůsobí jako jeden silný a přehledný produktový web. Působí spíš jako několik paralelních systémů vedle sebe:
- prezentační web
- kurzové landing pages
- samostatný booking katalog
- samostatný přihlašovací formulář
- několik verzí ceníku
- zbytkové a technicky působící stránky

To je hlavní problém.

Uživatel dnes často nedostane jednoduchou odpověď na základní otázky:
- Jaký kurz potřebuji?
- Kde ho chci absolvovat?
- Kolik stojí?
- Jaký je nejbližší termín?
- Kde přesně mám udělat další krok?

Web tím zbytečně komplikuje rozhodování, oslabuje důvěru a snižuje pravděpodobnost dokončené rezervace.

Redesign proto není kosmetická úprava. Je to potřeba narovnání celé informační architektury, konverzní logiky a obsahového modelu.

Doporučený směr je jednoznačný:

`Kurz -> Lokalita -> Cena -> Termín -> Rezervace`

To v praxi znamená:
- jeden sjednocený ceník
- lokality jako přepínač nebo parametr nabídky
- kurzové stránky jako hlavní produktové stránky
- jeden hlavní rezervační tok
- samostatné SEO vstupy pro 3 lokality bez vytváření chaosu

## 1. Co je dnes špatně

## 1.1 Web je strukturálně roztříštěný

Současný web rozděluje jednu obchodní nabídku do několika různých vrstev, které si navzájem konkurují.

Typické příklady:
- kurzy jsou řešené na více různých typech URL
- rezervace běží přes oddělené booking stránky
- existuje samostatná stránka přihlášení
- ceník není na jednom místě
- lokalita se propisuje do několika různých navigačních a obsahových vrstev

Výsledek:
- uživatel nemá jeden srozumitelný mentální model webu
- informace jsou rozmístěné na více místech
- web nepůsobí jako jeden ucelený produkt

## 1.2 Lokalita je modelovaná jako problém navigace

Lokalita dnes funguje současně jako:
- samostatná stránka
- samostatný ceník
- položka v menu
- údaj ve formuláři
- údaj v booking detailu

To je zbytečně složité.

Pro většinu uživatelů není lokalita samostatný produkt. Je to parametr nabídky. Uživatel obvykle nejdřív řeší kurz a až potom místo.

Současný web ale lokalitu používá tak, že štěpí obsah, ceny i další kroky do více směrů.

## 1.3 Ceník je roztříštěný a nejednoznačný

Cena patří mezi nejdůležitější rozhodovací informace. Přesto dnes nefunguje jako jeden jasný zdroj pravdy.

Na webu se objevují:
- hlavní ceník
- lokální ceníky
- PDF ceníky
- ceny na kurzových stránkách
- ceny na booking kartách a service pages

To je problém, protože uživatel neví:
- která cena je hlavní
- která cena je aktuální
- jestli se liší podle lokality
- kde najde finální a důvěryhodnou odpověď

Silný web nemá několik ceníků. Má jednu jasnou cenovou logiku.

## 1.4 Web má několik paralelních konverzních cest

Dnes lze dojít ke konverzi přes více různých mechanismů:
- homepage formulář
- stránku přihlášení
- booking listing
- detail konkrétní služby
- booking formulář

To znamená, že web nevede člověka jedním hlavním tokem.

Taková situace zpravidla vede k tomu, že:
- uživatel váhá, který krok je správný
- CTA si interně konkurují
- část lidí odejde bez akce
- část lidí raději volá nebo píše, protože web jim nedal jistotu

## 1.5 Rezervační tok je technický, ne produktový

Dnešní booking je postavený kolem konkrétních instancí termínů a interní logiky systému.

Uživatel ale nepřemýšlí stylem:
- kterou interní service page mám otevřít

Přemýšlí stylem:
- chci řidičák B
- ideálně v konkrétní lokalitě
- chci vědět cenu
- chci vidět termíny
- chci rezervovat

Současný tok tak nutí uživatele přizpůsobit se systému místo toho, aby se systém přizpůsobil uživateli.

## 1.6 Na webu jsou viditelné známky obsahového a strukturálního rozpadu

Byly nalezené indexované nebo publikované stránky, které působí jako zbytky, staré verze nebo technický odpad.

To je důležité nejen z pohledu pořádku, ale i z pohledu důvěry:
- web působí méně udržovaně
- oslabuje brand
- zhoršuje SEO signály
- komplikuje interní správu a budoucí rozvoj

## 2. Co to znamená pro byznys

Současný problém není jen estetický. Má přímý obchodní dopad.

## 2.1 Slabší konverze

Pokud uživatel neví:
- kde najde správnou cenu
- kde si má vybrat termín
- jestli má vyplnit formulář nebo rezervovat

pravděpodobnost dokončené akce klesá.

Web tím přichází o část poptávek i rezervací, které by jinak mohl získat.

## 2.2 Vyšší kognitivní zátěž

Dobrý web snižuje mentální námahu. Současný web ji zvyšuje.

Uživatel musí:
- dohledávat informace na více místech
- porovnávat různé formáty cen
- interpretovat, jak fungují lokality
- domýšlet si, co bude následovat po kliknutí

Čím víc si musí domýšlet, tím menší je šance, že dokončí akci.

## 2.3 Slabší důvěryhodnost

Když web působí jako kombinace více systémů, starých stránek a nekonzistentních cest, vzniká nejistota:
- je web aktuální?
- je nabídka správně?
- je cena finální?
- rezervuju opravdu správný termín?

U služeb typu autoškola je důvěra zásadní. Uživatel nekupuje impulzivně. Potřebuje jistotu.

## 2.4 Horší správa obsahu a provozní neefektivita

Pokud je jedna informace rozprostřená do více stránek a formátů, roste riziko:
- neaktuálních cen
- duplicitního obsahu
- chybných odkazů
- složité údržby
- dražších budoucích změn

To není jen UX problém. Je to i provozní náklad.

## 2.5 Oslabené SEO

Současná struktura vytváří rizika:
- kanibalizace mezi podobnými stránkami
- slabé nebo duplicitní URL
- roztříštěná relevance
- zbytečně indexované stránky bez skutečné hodnoty

Místo aby web posiloval několik silných stránek, rozděluje autoritu mezi více slabých vstupů.

## 3. Kde je největší příležitost ke zlepšení

Redesign dává největší smysl tam, kde se protíná UX, obchod a SEO.

## 3.1 Sjednocený ceník

Nejsilnější a nejjasnější změna.

Místo více ceníků doporučujeme:
- jednu stránku `/cenik`
- jeden zdroj pravdy
- přepínač lokality nebo přímé porovnání lokalit

Přínos:
- lepší orientace
- méně dotazů na základní informace
- vyšší důvěra
- jednodušší správa

## 3.2 Kurz jako hlavní produktová stránka

Každý klíčový kurz má mít vlastní silnou produktovou stránku, která odpoví na vše důležité:
- pro koho kurz je
- jak probíhá
- kolik stojí
- kde je dostupný
- jaké jsou termíny
- jak rezervovat

Přínos:
- vyšší konverzní síla
- méně přeskakování mezi stránkami
- lepší SEO relevance

## 3.3 Lokalita jako parametr nabídky, ne paralelní miniweb

Lokalita má měnit:
- cenu
- termíny
- kontaktní nebo provozní kontext

Ale nemá vytvářet samostatný chaos v navigaci a ceníku.

Přínos:
- jednodušší UX
- menší obsahová duplicita
- přitom stále zachovaná možnost cílit lokální SEO

## 3.4 Jeden hlavní rezervační tok

Doporučený model je:

`Vyber kurzu -> Vyber lokality -> Vyber termínu -> Vyplnění údajů -> Potvrzení`

Přínos:
- jasný pocit postupu
- nižší nejistota
- menší počet odpadnutí
- lepší měřitelnost konverze

## 3.5 Obsahový a technický úklid

Redesign je správný moment odstranit:
- staré a zbytkové URL
- duplicitní stránky
- nekonzistentní texty
- zbytečné indexované stránky

Přínos:
- čistší brand
- lepší SEO
- menší provozní chaos

## 4. Jak má nový web fungovat

Nový web by měl stát na jedné jednoduché logice:

`Kurz -> Lokalita -> Cena -> Termín -> Rezervace`

To znamená:

## 4.1 Hlavní struktura webu

Navržené hlavní sekce:
- Domů
- Kurzy
- Ceník
- Jak probíhá výuka
- FAQ
- Kontakt
- Blog

To je struktura, která odpovídá tomu, jak uživatel přemýšlí.

## 4.2 Kurzové stránky jako hlavní money pages

Nejsilnější obchodní stránky mají být:
- Řidičák B
- L17
- Řidičák A
- A1
- A2
- AM
- B96
- B+E
- další doplňkové kurzy podle priority

Každá má mít:
- jasný headline
- stručné vysvětlení
- cenu podle lokality
- nejbližší termíny
- silné CTA
- relevantní FAQ
- trust prvky

## 4.3 Jeden ceník pro celý web

Místo několika lokálních ceníků:
- jeden sjednocený ceník
- lokalita jen mění hodnotu na stejné stránce

To je lepší pro:
- uživatele
- obsah
- SEO
- správu

## 4.4 Lokality mají mít smysluplnou roli

Pro UX:
- lokalita je parametr nabídky

Pro SEO:
- lokalita má vlastní landing page pro 3 klíčové oblasti:
  - Praha 8 / Střížkov
  - Kladno
  - Statenice

Správné řešení je hybrid:
- hlavní obchodní logika webu je sjednocená
- lokální SEO má vlastní vstupy
- ale nevznikají tři různé miniweby

## 4.5 Rezervační tok musí být jednotný

Na webu nemají existovat dvě nebo tři rovnocenné cesty ke stejné akci.

Hlavní CTA má být:
- `Rezervovat termín`

Sekundární CTA:
- `Nechat si poradit`

Tím se oddělí:
- uživatel, který je připravený rezervovat
- uživatel, který se ještě rozhoduje

## 5. Jak redesign pomůže SEO

SEO má být přirozený výsledek dobré struktury, ne vrstva chaosu navíc.

## 5.1 Silnější hlavní stránky

Nový model vytvoří silné canonical stránky pro hlavní vyhledávací záměry:
- řidičák B
- řidičák A
- ceník autoškoly
- autoškola Praha 8 / Střížkov
- autoškola Kladno
- autoškola Statenice

Místo více slabých URL vznikne menší počet silných vstupních stránek.

## 5.2 Lepší lokální SEO bez rozbití UX

Web musí cílit 3 lokality:
- Praha 8 / Střížkov
- Kladno
- Statenice

To ale neznamená třikrát kopírovat celý web.

Správný model:
- silné lokalitní stránky
- vybrané lokálně-kurzové landing pages pro nejdůležitější kombinace
- stejné kurzové a rezervační jádro napříč webem

## 5.3 Lepší indexace a méně odpadu

Redesign umožní:
- odstranit zbytkové stránky
- přesměrovat staré URL
- snížit duplicitní nebo slabý obsah
- dát vyhledávačům jasnější architekturu

## 6. Co by měl klient od nového webu očekávat

Dobře navržený nový web nepřinese jen hezčí vzhled. Měl by přinést:

## 6.1 Lepší orientaci uživatele

Uživatel bude rychleji chápat:
- kde je
- co čte
- co si má vybrat
- co má udělat jako další krok

## 6.2 Vyšší konverzní potenciál

Méně zmatku znamená:
- více dokončených rezervací
- více kvalitních poptávek
- méně odpadnutí po cestě

## 6.3 Vyšší důvěryhodnost značky

Jeden konzistentní systém působí profesionálněji než soubor paralelních stránek a formulářů.

## 6.4 Lepší spravovatelnost

Obsah bude jednodušší:
- aktualizovat
- rozšiřovat
- udržovat
- měřit

## 6.5 Lepší základ pro další růst

Nová architektura vytvoří prostor pro:
- další SEO růst
- kampaně
- rozšiřování lokalit
- rozšiřování kurzů
- lepší analytiku a optimalizaci konverze

## 7. Doporučené zadání redesignu

Pokud má redesign dávat obchodní smysl, měl by být postavený na těchto rozhodnutích:

1. Web musí být organizovaný primárně podle kurzů.
2. Lokalita musí fungovat jako parametr nabídky, ne jako samostatný paralelní web.
3. Musí existovat jeden sjednocený ceník.
4. Musí existovat jeden hlavní rezervační tok.
5. Kurzové stránky musí fungovat jako hlavní produktové a SEO stránky.
6. Pro 3 klíčové lokality musí vzniknout samostatná lokální SEO vrstva.
7. Součástí redesignu musí být i obsahový a URL úklid včetně redirectů.

## 8. Doporučený závěr pro klienta

Současný web není problém proto, že by byl jen vizuálně starší. Problém je hlubší:
- je informačně roztříštěný
- má nejasný konverzní model
- pracuje se špatně modelovanými lokalitami
- nemá sjednocenou cenovou logiku
- oslabuje důvěru i SEO výkon

Proto doporučujeme redesign jako strukturální a obchodní projekt, ne jako kosmetický refresh.

Směr redesignu by měl být jednoznačný:
- zjednodušit
- sjednotit
- zpřehlednit
- posílit kurzové stránky
- sjednotit ceník
- narovnat rezervaci
- vytvořit čistou lokální SEO vrstvu pro 3 klíčové lokality

Pokud se tato logika dodrží, nový web bude:
- srozumitelnější pro nové návštěvníky
- důvěryhodnější pro rozhodování
- silnější pro SEO
- lépe spravovatelný
- a hlavně obchodně výkonnější než současný stav
