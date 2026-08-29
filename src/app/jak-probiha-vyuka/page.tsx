import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { FinalCta } from "@/components/final-cta";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Jak probíhá výuka",
  description: "Jak probíhá kurz v Autoškole BuBu od přihlášky po závěrečnou zkoušku.",
  alternates: { canonical: "/jak-probiha-vyuka" },
};

const steps = [
  ["Přihláška", "Vyberete kurz a pobočku a vyplníte základní kontaktní údaje."],
  ["Potvrzení pobočkou", "Pobočka ověří dostupnost, ozve se vám a vysvětlí další potřebné kroky."],
  [
    "Teoretická výuka",
    "Proberete pravidla provozu, zásady bezpečné jízdy a řešení běžných situací.",
  ],
  [
    "Praktický výcvik",
    "Od základního ovládání vozidla postupujete k samostatnějším jízdám v provozu.",
  ],
  [
    "Příprava na zkoušku",
    "Procvičíte testy, kontrolu vozidla a situace, které mohou přijít při jízdě.",
  ],
  [
    "Závěrečná zkouška",
    "Zkouška má teoretickou a praktickou část podle pravidel pro zvolenou skupinu.",
  ],
] as const;

const faq = [
  [
    "Jak rychle kurz dokončím?",
    "Délka závisí na zvolené skupině, vašich časových možnostech, kapacitě pobočky a termínech zkoušek. Konkrétní odhad vám dá pobočka.",
  ],
  [
    "Musím mít vlastní auto nebo motorku?",
    "Ne. Výcvik probíhá na vozidlech Autoškoly BuBu určených pro danou skupinu.",
  ],
  [
    "Co když potřebuji více jízd?",
    "Další postup a případné doplňovací jízdy domluvíte přímo s pobočkou podle svých potřeb.",
  ],
] as const;

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Krok za krokem"
        title="Jak probíhá kurz"
        lead="Od první přihlášky po závěrečnou zkoušku víte, co následuje. Konkrétní rozvržení vždy domluví vybraná pobočka."
      />
      <section className="section section-soft">
        <div className="inner">
          <div className="process-shell">
            <div className="process-grid process-grid-wide">
              {steps.map(([title, text]) => (
                <article className="process-step" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="inner two-column">
          <article className="content-card">
            <p className="eyebrow">Teorie</p>
            <h2>Srozumitelné souvislosti</h2>
            <p>
              Nejde o mechanické memorování. Pravidla propojujeme se situacemi, které skutečně
              potkáte v provozu, a připravujeme vás také na testovou část zkoušky.
            </p>
            <ul className="check-list">
              <li>Pravidla silničního provozu</li>
              <li>Bezpečné chování a předvídání</li>
              <li>Základní péče o vozidlo</li>
              <li>Příprava na test</li>
            </ul>
          </article>
          <article className="content-card">
            <p className="eyebrow">Praxe</p>
            <h2>Jistota za volantem</h2>
            <p>
              Začnete ovládáním vozidla a postupně přidáte město, složitější křižovatky i další
              situace podle skupiny a pobočky.
            </p>
            <ul className="check-list">
              <li>Rozjezdy, řazení a brzdění</li>
              <li>Parkování a manévrování</li>
              <li>Jízda v reálném provozu</li>
              <li>Průběžná zpětná vazba</li>
            </ul>
          </article>
        </div>
      </section>
      <section className="section section-soft">
        <div className="inner">
          <div className="section-heading">
            <p className="eyebrow">Časté dotazy</p>
            <h2>Organizace kurzu</h2>
          </div>
          <FaqList items={faq} />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
