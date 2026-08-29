import type { Metadata } from "next";
import Image from "next/image";
import { BranchCards } from "@/components/branch-cards";
import { FinalCta } from "@/components/final-cta";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "O nás",
  description:
    "Autoškola BuBu učí řidiče v Praze 8, Kladně a Statenicích klidně, srozumitelně a prakticky.",
  alternates: { canonical: "/o-nas" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Autoškola BuBu"
        title="Učíme řídit s klidem a respektem"
        lead="Naším cílem není jen zvládnutá zkouška. Chceme, abyste si odnesli bezpečné návyky, jistotu a schopnost samostatně přemýšlet v provozu."
      />
      <section className="section">
        <div className="inner benefit-split">
          <div>
            <p className="eyebrow">Náš přístup</p>
            <h2>Řidičák bez stresu</h2>
            <p className="lead muted">
              Výuku vedeme srozumitelně, v postupných krocích a s průběžnou zpětnou vazbou. Každý
              student začíná jinde, proto má domluva s instruktorem v kurzu důležité místo.
            </p>
            <ul className="check-list">
              <li>Trpělivá a věcná komunikace</li>
              <li>Důraz na bezpečné rozhodování</li>
              <li>Praktická příprava na skutečný provoz</li>
              <li>Jasná domluva s pobočkou</li>
            </ul>
          </div>
          <div className="course-detail-image">
            <Image
              src="/assets/vehicles/car-skoda-white.jpeg"
              alt="Vůz Autoškoly BuBu"
              fill
              sizes="(max-width: 980px) 100vw, 55vw"
            />
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="inner">
          <div className="section-heading">
            <p className="eyebrow">Tři lokality</p>
            <h2>Kde nás najdete</h2>
            <p>Praha 8 – Střížkov, Kladno a Statenice.</p>
          </div>
          <BranchCards />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
