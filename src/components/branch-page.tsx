import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { FinalCta } from "@/components/final-cta";
import { Icon } from "@/components/icon";
import { OrderLink } from "@/components/order-link";
import { branches, courses, formatPrice, type BranchId } from "@/data/catalog";

export function branchMetadata(branchId: BranchId): Metadata {
  const branch = branches[branchId];
  return {
    title: `Autoškola ${branch.name}`,
    description: `${branch.description} Nabídka kurzů, ceny a kontakt na pobočku Autoškoly BuBu.`,
    alternates: { canonical: `/${branchId}` },
  };
}

export function BranchPage({ branchId }: { branchId: BranchId }) {
  const branch = branches[branchId];
  const available = courses.flatMap((course) => {
    const offering = course.offerings.find((item) => item.branchId === branchId);
    return offering ? [{ course, offering }] : [];
  });
  const faq = [
    ["Kde pobočku najdu?", branch.address],
    [
      "Kdy je možné pobočku navštívit?",
      `Úřední hodiny jsou ${branch.hours}. Před cestou doporučujeme telefonickou domluvu.`,
    ],
    [
      "Jak se přihlásím?",
      "Vyberte kurz v nabídce a odešlete jednoduchou přihlášku. Pobočka se vám ozve s dalším postupem.",
    ],
  ] as const;

  return (
    <>
      <section className="local-hero">
        <div className="inner local-hero-grid">
          <div className="local-hero-copy">
            <p className="hero-pill">Autoškola {branch.area}</p>
            <h1>
              Autoškola <em>{branch.shortName}</em>
            </h1>
            <p className="lead">{branch.description}</p>
            <div className="hero-actions">
              <OrderLink branchId={branchId}>Přihlásit se →</OrderLink>
              <a className="btn btn-secondary" href={`tel:${branch.phoneHref}`}>
                Zavolat na pobočku
              </a>
            </div>
            <div className="local-trust-strip">
              <span>
                <Icon src="/assets/icons/location_pin_teal.svg" size={28} />
                {branch.address}
              </span>
              <span>
                <Icon src="/assets/icons/phone_teal.svg" size={28} />
                {branch.phone}
              </span>
              <span>
                <Icon src="/assets/icons/calendar_teal.svg" size={28} />
                {branch.hours}
              </span>
              <span>
                <Icon src="/assets/icons/steering_wheel_teal.svg" size={28} />
                Výcvik v provozu
              </span>
            </div>
          </div>
          <div className="local-hero-media">
            <Image
              src="/assets/vehicles/fabia-bubu-hero.jpg"
              alt={`Výcvikové auto pobočky ${branch.shortName}`}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 55vw"
            />
            <div className="local-floating-card">
              <strong>{branch.name}</strong>
              <span>{branch.address}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="inner">
          <div className="section-heading">
            <p className="eyebrow">Nabídka pobočky</p>
            <h2>Kurzy a ceny</h2>
            <p>Vyberte si kurz dostupný na pobočce {branch.shortName}.</p>
          </div>
          <div className="course-grid">
            {available.map(({ course, offering }) => (
              <article className="price-card" key={course.id}>
                <div className="price-card-head">
                  <span className="price-card-icon">
                    <Image src={course.icon} alt="" width={42} height={42} />
                  </span>
                  <div>
                    <small>Skupina {course.group}</small>
                    <h3>{course.title}</h3>
                  </div>
                </div>
                <p className="muted">{course.shortDescription}</p>
                <strong className="course-price">{formatPrice(offering.priceCzk)}</strong>
                <div className="course-card-actions">
                  <OrderLink courseId={course.id} branchId={branchId}>
                    Vybrat kurz
                  </OrderLink>
                  <Link className="text-link" href={`/kurzy/${course.slug}`}>
                    Detail kurzu →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="inner two-column">
          <article className="content-card">
            <p className="eyebrow">Kontakt</p>
            <h2>{branch.name}</h2>
            <address>
              <strong>{branch.address}</strong>
              <br />
              Úřední hodiny: {branch.hours}
            </address>
            <p>
              <a href={`tel:${branch.phoneHref}`}>{branch.phone}</a>
              <br />
              <a href={`mailto:${branch.email}`}>{branch.email}</a>
            </p>
          </article>
          <article className="content-card">
            <p className="eyebrow">Okolí</p>
            <h2>Dobře dostupná pobočka</h2>
            <p className="muted">
              Pobočku využívají studenti z oblastí {branch.nearby.join(", ")} a dalšího okolí.
            </p>
            <OrderLink branchId={branchId}>Přihlásit se na pobočku</OrderLink>
          </article>
        </div>
      </section>
      <section className="section">
        <div className="inner">
          <div className="section-heading">
            <p className="eyebrow">Časté dotazy</p>
            <h2>Pobočka {branch.shortName}</h2>
          </div>
          <FaqList items={faq} />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
