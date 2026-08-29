export const articles = [
  {
    slug: "prvni-jizda-v-autoskole-priprava",
    title: "První jízda v autoškole: jak se připravit",
    description: "Co si vzít s sebou, co čekat a proč není potřeba umět řídit předem.",
    image: "/assets/vehicles/fabia-bubu-hero.jpg",
    sections: [
      [
        "Přijďte odpočatí",
        "Na první jízdu stačí pohodlné oblečení, pevná obuv a časová rezerva. Instruktor počítá s tím, že jste začátečník.",
      ],
      [
        "Začíná se od základů",
        "Nejdřív se seznámíte s ovládacími prvky, nastavením sedadla a zrcátek. Do složitějšího provozu se postupuje až podle vaší jistoty.",
      ],
      [
        "Chyba je součást výuky",
        "Jízda je trénink. Ptejte se, pokud něčemu nerozumíte, a vnímejte zpětnou vazbu jako návod pro další pokus.",
      ],
    ],
  },
  {
    slug: "ridicak-na-automat-kdy-dava-smysl",
    title: "Řidičák na automat: kdy dává smysl",
    description: "Výhody výcviku s automatickou převodovkou a důležité omezení oprávnění.",
    image: "/assets/icons/car-auto-bubu.jpeg",
    sections: [
      [
        "Méně úkonů při jízdě",
        "Bez spojky a ručního řazení zbývá více pozornosti na provoz, značky a správné rozhodování.",
      ],
      [
        "Pro koho je automat vhodný",
        "Hodí se řidičům, kteří plánují používat automat, chtějí jednodušší ovládání nebo se potřebují soustředit na dění kolem vozu.",
      ],
      [
        "Pozor na omezení",
        "Pokud složíte praktickou zkoušku na vozidle s automatickou převodovkou, řidičské oprávnění je omezené na automat. Aktuální pravidla si potvrďte s pobočkou.",
      ],
    ],
  },
  {
    slug: "bezpecne-jizdni-navyky",
    title: "Bezpečné jízdní návyky, které se vyplatí trénovat",
    description: "Pět jednoduchých oblastí, na kterých stojí klidná a předvídavá jízda.",
    image: "/assets/vehicles/car-skoda-white.jpeg",
    sections: [
      [
        "Dívejte se s předstihem",
        "Pohled nepatří jen těsně před kapotu. Sledujte vývoj situace dál před sebou a pravidelně kontrolujte zrcátka.",
      ],
      [
        "Nechte si prostor",
        "Bezpečný odstup dává čas reagovat. Rezerva pomáhá také při parkování a při průjezdu nepřehlednými místy.",
      ],
      [
        "Buďte čitelní",
        "Včas používejte směrovky, měňte rychlost plynule a rozhodujte se tak, aby ostatní mohli váš záměr pochopit.",
      ],
    ],
  },
] as const;

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
