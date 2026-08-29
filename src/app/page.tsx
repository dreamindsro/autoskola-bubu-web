import Image from "next/image";
import Link from "next/link";
import { BranchCards } from "@/components/branch-cards";
import { CourseCard } from "@/components/course-card";
import { FaqList } from "@/components/faq-list";
import { FinalCta } from "@/components/final-cta";
import { Icon } from "@/components/icon";
import { OrderLink } from "@/components/order-link";
import { courses } from "@/data/catalog";

const process = [
  ["Vyberete si kurz", "Kurz a pobočku si zvolíte podle toho, co vám vyhovuje."],
  ["Ozveme se vám", "Potvrdíme přihlášku a domluvíme další praktické kroky."],
  ["Teorie", "Pravidla vysvětlujeme srozumitelně a v souvislostech."],
  ["Jízdy", "Od základů postupujete do skutečného provozu vlastním tempem."],
  ["Zkouška", "Připravíme vás na test i praktickou část závěrečné zkoušky."],
] as const;

const benefits = [
  [
    "/assets/icons/smile_teal.svg",
    "V klidu a bez stresu",
    "Výuku stavíme na respektu, trpělivosti a srozumitelné zpětné vazbě.",
  ],
  [
    "/assets/icons/steering_wheel_teal.svg",
    "Skutečný provoz",
    "Trénujete situace, které budete řešit i po získání řidičáku.",
  ],
  [
    "/assets/icons/calendar_teal.svg",
    "Domluva s pobočkou",
    "Konkrétní organizaci teorie a jízd s vámi domluví vybraná pobočka.",
  ],
  [
    "/assets/icons/shield_check_teal.svg",
    "Bezpečné návyky",
    "Nejde jen o zkoušku. Cílem je jistota a odpovědné rozhodování.",
  ],
] as const;

const faq = [
  ["Kde Autoškola BuBu působí?", "Najdete nás na Střížkově v Praze 8, v Kladně a ve Statenicích."],
  [
    "Jaký kurz si mohu vybrat?",
    "Nabízíme skupinu B, L17, automat, motocyklové skupiny, B96, B+E a kondiční jízdy. Dostupnost se liší podle pobočky.",
  ],
  [
    "Mohu se přihlásit jako úplný začátečník?",
    "Ano. Výcvik začíná od základů a navazuje postupně podle vašich dovedností.",
  ],
  [
    "Jak zjistím aktuální organizaci kurzu?",
    "Po odeslání přihlášky se vám ozve vybraná pobočka a domluví s vámi konkrétní postup.",
  ],
] as const;

export default function HomePage() {
  const popular = ["l17", "b", "a"].flatMap((id) => {
    const course = courses.find((item) => item.id === id);
    return course ? [course] : [];
  });

  return (
    <>
      <section className="home-hero">
        <div className="inner home-hero-grid">
          <div className="home-hero-copy">
            <p className="hero-pill">Řidičák bez stresu</p>
            <h1>
              Řidičák <span>bez stresu</span>
            </h1>
            <p className="lead">
              Trpěliví instruktoři, žádný křik a jasný plán od první jízdy až po komisaře. V Praze
              8, Kladně a Statenicích vás kurzem provedeme lidsky a srozumitelně.
            </p>
            <div className="hero-actions">
              <OrderLink className="btn btn-teal">Přihlásit se do kurzu →</OrderLink>
              <Link className="btn btn-outline" href="/jak-probiha-vyuka">
                Jak probíhá výuka →
              </Link>
            </div>
            <div className="hero-trust-row" aria-label="Výhody Autoškoly BuBu">
              {[
                ["smile_teal.svg", "Klidný přístup"],
                ["steering_wheel_teal.svg", "Reálný provoz"],
                ["location_pin_teal.svg", "3 pobočky"],
                ["shield_check_teal.svg", "Bezpečné návyky"],
              ].map(([icon, label]) => (
                <span key={label}>
                  <Icon src={`/assets/icons/${icon}`} size={29} />
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-media">
            <Image
              src="/assets/vehicles/fabia-bubu-hero.jpg"
              alt="Výcvikový vůz Autoškoly BuBu"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 55vw"
            />
            <div className="hero-floating-card">
              <strong>Výuka v okolí vaší pobočky</strong>
              <span>Praha 8 – Střížkov, Kladno a Statenice.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-heading">
            <p className="eyebrow">Nejoblíbenější kurzy</p>
            <h2>Začněte kurzem, který vám sedne.</h2>
            <p>
              Nejoblíbenější volby studentů Autoškoly BuBu. Další varianty najdete v kompletním
              ceníku.
            </p>
          </div>
          <div className="popular-grid">
            {popular.map((course) => (
              <CourseCard course={course} featured={course.id === "b"} key={course.id} />
            ))}
          </div>
          <div className="section-center-action">
            <Link className="btn btn-outline" href="/cenik">
              Zobrazit všechny kurzy a ceny
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="inner">
          <div className="section-heading">
            <p className="eyebrow">Jak to funguje</p>
            <h2>Od přihlášky k řidičáku</h2>
            <p>Jednoduchý postup a jasná domluva s vybranou pobočkou.</p>
          </div>
          <div className="process-shell">
            <div className="process-grid">
              {process.map(([title, text]) => (
                <article className="process-step" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="section-center-action">
            <Link className="text-link" href="/jak-probiha-vyuka">
              Podrobný průběh výuky →
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="inner benefit-split">
          <div>
            <p className="eyebrow">Proč BuBu</p>
            <h2>Dobré řízení začíná v pohodě</h2>
            <p className="lead muted">
              Chceme, abyste se za volantem cítili jistě i dlouho po zkoušce. Proto učíme prakticky,
              trpělivě a srozumitelně.
            </p>
            <OrderLink className="btn btn-primary">Vybrat kurz</OrderLink>
          </div>
          <div className="benefit-grid">
            {benefits.map(([icon, title, text]) => (
              <article className="benefit-card" key={title}>
                <span className="round-icon">
                  <Icon src={icon} size={29} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="inner">
          <div className="section-heading">
            <p className="eyebrow">Jsme blízko</p>
            <h2>Vyberte si pobočku</h2>
            <p>
              Střížkov, Kladno nebo Statenice. Každá pobočka potvrdí dostupnost vybraného kurzu.
            </p>
          </div>
          <BranchCards />
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-heading">
            <p className="eyebrow">Časté dotazy</p>
            <h2>Co je dobré vědět</h2>
          </div>
          <FaqList items={faq} />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
