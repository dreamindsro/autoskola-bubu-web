export const branches = {
  strizkov: {
    id: "strizkov",
    name: "Praha 8 – Střížkov",
    shortName: "Střížkov",
    address: "U Kapliček 34, Střížkov",
    email: "strizkov@autoskolabubu.cz",
    phone: "+420 725 717 755",
    phoneHref: "+420725717755",
    hours: "Po a Čt 15:00–18:00",
    area: "Praha 8",
    nearby: ["Prosek", "Kobylisy", "Letňany", "Ládví", "Ďáblice"],
    description:
      "Hlavní pobočka Autoškoly BuBu pro Prahu 8 a okolí. Výcvik připravuje na městský provoz i běžné situace za volantem.",
  },
  kladno: {
    id: "kladno",
    name: "Kladno",
    shortName: "Kladno",
    address: "Cyrila Boudy 2954 | Havířská 1141",
    email: "kladno@autoskolabubu.cz",
    phone: "+420 725 857 884",
    phoneHref: "+420725857884",
    hours: "Út a Čt 15:15–17:45",
    area: "Kladno",
    nearby: ["Kročehlavy", "Rozdělov", "Sítná"],
    description: "Dvě učebny v centru Kladna a výcvik v městském i příměstském provozu.",
  },
  statenice: {
    id: "statenice",
    name: "Statenice",
    shortName: "Statenice",
    address: "Statenická 23, Statenice",
    email: "statenice@autoskolabubu.cz",
    phone: "+420 725 703 171",
    phoneHref: "+420725703171",
    hours: "St 15:00–18:00",
    area: "Praha-západ",
    nearby: ["Horoměřice", "Suchdol", "Praha 6"],
    description: "Učebna v prostorách obecního úřadu a výcvik v okolí Statenic, Kladna a Prahy 6.",
  },
} as const;

export type BranchId = keyof typeof branches;

type Offering = {
  readonly branchId: BranchId;
  readonly priceCzk: number | null;
};

export type CourseCategory = "auto" | "moto" | "trailer" | "practice";

export type Course = {
  readonly id: string;
  readonly slug: string;
  readonly category: CourseCategory;
  readonly group: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly description: string;
  readonly image: string;
  readonly icon: string;
  readonly benefits: readonly string[];
  readonly includes: readonly string[];
  readonly faq: readonly (readonly [string, string])[];
  readonly offerings: readonly Offering[];
};

export const courses = [
  {
    id: "b",
    slug: "ridicak-skupina-b",
    category: "auto",
    group: "B",
    title: "Řidičák skupiny B",
    shortDescription: "Osobní automobily do 3,5 t",
    description:
      "Kurz pro osobní auto vedeme klidně, srozumitelně a krok za krokem. Cílem je jistota v běžném provozu, nejen příprava na zkoušku.",
    image: "/assets/vehicles/fabia-bubu-hero.jpg",
    icon: "/assets/icons/car_front_teal.svg",
    benefits: ["Manuální převodovka", "Reálný provoz", "Zákonný rozsah kurzu"],
    includes: [
      "Teoretickou výuku",
      "Praktický výcvik v zákonném rozsahu",
      "Přípravu na testy a závěrečnou zkoušku",
      "Průběžnou zpětnou vazbu od instruktora",
    ],
    faq: [
      ["Musím umět něco před první jízdou?", "Ne. Kurz počítá i s úplnými začátečníky."],
      [
        "Kolik jízd je v kurzu?",
        "Praktický výcvik probíhá v zákonném rozsahu. Konkrétní rozvržení s vámi domluví pobočka.",
      ],
    ],
    offerings: [
      { branchId: "strizkov", priceCzk: 24_900 },
      { branchId: "kladno", priceCzk: 20_000 },
      { branchId: "statenice", priceCzk: 24_900 },
    ],
  },
  {
    id: "l17",
    slug: "l17",
    category: "auto",
    group: "B–L17",
    title: "Řidičák skupiny B v režimu L17",
    shortDescription: "Řidičák od 17 let s mentorem",
    description:
      "Kurz skupiny B pro mladé řidiče v režimu L17. Vysvětlíme postup studentovi i mentorovi a provedeme vás přípravou bez zbytečného chaosu.",
    image: "/assets/vehicles/fabia-bubu-hero.jpg",
    icon: "/assets/icons/l17_teal.svg",
    benefits: ["Od 17 let", "Mentor", "Stejný výcvik skupiny B"],
    includes: [
      "Výcvik skupiny B",
      "Vysvětlení pravidel režimu L17",
      "Přípravu na testy a zkoušku",
      "Informace pro studenta i mentora",
    ],
    faq: [
      [
        "Co znamená L17?",
        "Jde o režim, který umožňuje řídit skupinu B od 17 let za splnění zákonných podmínek a s mentorem.",
      ],
    ],
    offerings: [
      { branchId: "strizkov", priceCzk: 24_900 },
      { branchId: "kladno", priceCzk: 20_000 },
    ],
  },
  {
    id: "ba",
    slug: "ridicak-skupina-b-automat",
    category: "auto",
    group: "B automat",
    title: "Řidičák skupiny B na automat",
    shortDescription: "Osobní automobil s automatickou převodovkou",
    description:
      "Praktická volba, pokud chcete mít při výcviku více prostoru na sledování provozu a méně řešit spojku a řazení.",
    image: "/assets/icons/car-auto-bubu.jpeg",
    icon: "/assets/icons/car_auto_teal.svg",
    benefits: ["Automatická převodovka", "Méně práce se spojkou", "Pouze Střížkov"],
    includes: [
      "Teoretickou výuku",
      "Výcvik na automatické převodovce",
      "Jízdy v městském provozu",
      "Přípravu na závěrečnou zkoušku",
    ],
    faq: [
      [
        "Budu moci řídit manuál?",
        "Oprávnění získané zkouškou na automatu je omezené na vozidla s automatickou převodovkou.",
      ],
    ],
    offerings: [{ branchId: "strizkov", priceCzk: 24_900 }],
  },
  {
    id: "am",
    slug: "ridicak-skupina-am",
    category: "moto",
    group: "AM",
    title: "Řidičák skupiny AM",
    shortDescription: "Bezpečný začátek na dvou kolech",
    description:
      "První motorkářský krok vedeme postupně, s důrazem na ovládání stroje a bezpečné návyky.",
    image: "/assets/icons/moto-am.jpeg",
    icon: "/assets/icons/scooter_teal.svg",
    benefits: ["První moto zkušenost", "Bezpečný základ", "Cvičiště i provoz"],
    includes: ["Teorii", "Základy ovládání stroje", "Jízdy v provozu", "Přípravu na zkoušku"],
    faq: [["Je AM pro začátečníky?", "Ano, počítáme i s nulovou předchozí zkušeností."]],
    offerings: [
      { branchId: "strizkov", priceCzk: 24_900 },
      { branchId: "kladno", priceCzk: 24_900 },
    ],
  },
  {
    id: "a1",
    slug: "ridicak-skupina-a1",
    category: "moto",
    group: "A1",
    title: "Řidičák skupiny A1",
    shortDescription: "Lehké motocykly do 125 cm³",
    description:
      "Kurz A1 pomáhá získat techniku a jistotu na lehčím motocyklu před jízdou v běžném provozu.",
    image: "/assets/icons/moto-a1.jpeg",
    icon: "/assets/icons/motorcycle_sport_teal.svg",
    benefits: ["Lehčí motocykly", "Technika ovládání", "Příprava na provoz"],
    includes: ["Teorii", "Cvičiště", "Praktické jízdy", "Nácvik zkouškových úloh"],
    faq: [["Je A1 vhodná pro začátečníka?", "Ano, výcvik postupuje od základů."]],
    offerings: [
      { branchId: "strizkov", priceCzk: 24_900 },
      { branchId: "kladno", priceCzk: 24_900 },
    ],
  },
  {
    id: "a2",
    slug: "ridicak-skupina-a2",
    category: "moto",
    group: "A2",
    title: "Řidičák skupiny A2",
    shortDescription: "Motocykly do výkonu 35 kW",
    description:
      "Výcvik pro střední motocykly stavíme na technice, bezpečném brzdění a klidném rozhodování v provozu.",
    image: "/assets/icons/moto-a2.jpeg",
    icon: "/assets/icons/motorcycle_a2_teal.svg",
    benefits: ["Do 35 kW", "Bezpečné manévry", "Cvičiště i provoz"],
    includes: ["Teorii", "Cvičiště", "Jízdy v provozu", "Přípravu na zkoušku"],
    faq: [["Musím už umět jezdit?", "Ne. Výcvik přizpůsobíme vaší předchozí zkušenosti."]],
    offerings: [
      { branchId: "strizkov", priceCzk: 24_900 },
      { branchId: "kladno", priceCzk: 24_900 },
    ],
  },
  {
    id: "a",
    slug: "ridicak-skupina-a",
    category: "moto",
    group: "A",
    title: "Řidičák skupiny A",
    shortDescription: "Motocykl bez omezení výkonu",
    description:
      "Kurz na velkou motorku vedeme s důrazem na techniku, odpovědnost a respekt k provozu.",
    image: "/assets/vehicles/moto-honda-blue-hero.jpeg",
    icon: "/assets/icons/motorcycle_a_teal.svg",
    benefits: ["Bez omezení výkonu", "Technika ovládání", "Reálný provoz"],
    includes: ["Teorii", "Cvičiště", "Jízdy v provozu", "Přípravu na zkoušku"],
    faq: [["Trénuje se i na cvičišti?", "Ano. Ovládání motorky je důležitou částí výcviku."]],
    offerings: [
      { branchId: "strizkov", priceCzk: 24_900 },
      { branchId: "kladno", priceCzk: 24_900 },
    ],
  },
  {
    id: "b96",
    slug: "b96",
    category: "trailer",
    group: "B96",
    title: "Rozšíření B96",
    shortDescription: "Souprava do 4 250 kg",
    description:
      "Praktický výcvik pro řidiče skupiny B, kteří potřebují tahat karavan, vozík nebo jiný přívěs v rozšířeném rozsahu B96.",
    image: "/assets/vehicles/trailer-bubu.jpeg",
    icon: "/assets/icons/car_trailer_teal.svg",
    benefits: ["Souprava do 4 250 kg", "Couvání", "Praktický výcvik"],
    includes: [
      "Výcvik se soupravou",
      "Couvání a manipulaci",
      "Kontrolu přívěsu",
      "Jízdu v provozu",
    ],
    faq: [
      [
        "Kdy stačí B96?",
        "B96 je určené pro soupravu do 4 250 kg. Správnou skupinu vždy ověřte podle technických údajů auta a přívěsu.",
      ],
    ],
    offerings: [
      { branchId: "strizkov", priceCzk: 8_000 },
      { branchId: "kladno", priceCzk: 6_000 },
    ],
  },
  {
    id: "be",
    slug: "be",
    category: "trailer",
    group: "B+E",
    title: "Rozšíření B+E",
    shortDescription: "Větší přívěsy a soupravy",
    description:
      "Kurz pro řidiče skupiny B, kteří potřebují ovládat větší přívěsy a soupravy nad možnosti B96.",
    image: "/assets/vehicles/trailer-bubu.jpeg",
    icon: "/assets/icons/trailer_teal.svg",
    benefits: ["Větší přívěsy", "Couvání a manipulace", "Příprava na zkoušku"],
    includes: ["Výcvik se soupravou", "Couvání", "Kontrolu a zapojení přívěsu", "Jízdu v provozu"],
    faq: [
      [
        "Jaký je rozdíl mezi B96 a B+E?",
        "Rozhodují technické údaje celé soupravy. Pokud si nejste jistí, pobočka vám pomůže správnou variantu ověřit.",
      ],
    ],
    offerings: [
      { branchId: "strizkov", priceCzk: 10_500 },
      { branchId: "kladno", priceCzk: 10_500 },
    ],
  },
  {
    id: "kondicni",
    slug: "kondicni-jizdy",
    category: "practice",
    group: "Kondiční jízdy",
    title: "Kondiční jízdy",
    shortDescription: "Návrat jistoty za volantem",
    description:
      "Pro řidiče po delší pauze nebo pro ty, kteří chtějí v klidu procvičit parkování, město, dálnici či konkrétní trasu.",
    image: "/assets/vehicles/car-skoda-white.jpeg",
    icon: "/assets/icons/steering_wheel_teal.svg",
    benefits: ["Individuální cíl", "Parkování", "Město nebo dálnice"],
    includes: ["Krátkou domluvu cíle", "Jízdu v reálném provozu", "Klidnou zpětnou vazbu"],
    faq: [["Co můžeme trénovat?", "Parkování, město, dálnici nebo konkrétní trasu."]],
    offerings: [
      { branchId: "strizkov", priceCzk: null },
      { branchId: "kladno", priceCzk: null },
      { branchId: "statenice", priceCzk: null },
    ],
  },
] as const satisfies readonly Course[];

export type CourseId = (typeof courses)[number]["id"];
export type CatalogCourse = (typeof courses)[number];

export const categoryLabels: Record<CourseCategory, string> = {
  auto: "Auta",
  moto: "Motorky",
  trailer: "Přívěsy",
  practice: "Kondiční jízdy",
};

export function isBranchId(value: string): value is BranchId {
  return Object.hasOwn(branches, value);
}

export function getBranch(branchId: string) {
  return isBranchId(branchId) ? branches[branchId] : undefined;
}

export function getCourse(courseId: string) {
  return courses.find((course) => course.id === courseId);
}

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getOffering(courseId: string, branchId: string) {
  const course = getCourse(courseId);
  const branch = getBranch(branchId);
  const offering = course?.offerings.find((item) => item.branchId === branchId);

  if (!course || !branch || !offering) return undefined;

  return { course, branch, offering };
}

export function formatPrice(priceCzk: number | null) {
  if (priceCzk === null) return "dle domluveného rozsahu";
  return `${new Intl.NumberFormat("cs-CZ").format(priceCzk)} Kč`;
}

export function minimumPrice(course: Course) {
  const prices = course.offerings
    .map((offering) => offering.priceCzk)
    .filter((price): price is number => price !== null);

  return prices.length > 0 ? Math.min(...prices) : null;
}
