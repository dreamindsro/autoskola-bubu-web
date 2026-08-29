import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FinalCta } from "@/components/final-cta";
import { OrderLink } from "@/components/order-link";
import {
  branches,
  categoryLabels,
  courses,
  formatPrice,
  type CourseCategory,
} from "@/data/catalog";

export const metadata: Metadata = {
  title: "Ceník kurzů",
  description: "Ceník kurzů Autoškoly BuBu pro Střížkov, Kladno a Statenice.",
  alternates: { canonical: "/cenik" },
};

const categories = [
  "auto",
  "moto",
  "trailer",
  "practice",
] as const satisfies readonly CourseCategory[];

export default function PricingPage() {
  return (
    <>
      <section className="centered-hero">
        <div className="inner">
          <p className="eyebrow">Přehledně a bez překvapení</p>
          <h1>Ceník kurzů Autoškoly BuBu</h1>
          <p className="lead">
            Cena se může lišit podle pobočky. Vyberte kurz a zobrazíme vám dostupné varianty.
          </p>
          <div className="filter-bar">
            <div className="filter-row">
              {categories.map((category, index) => (
                <a
                  className={`filter-chip ${index === 0 ? "active" : ""}`}
                  href={`#${category}`}
                  key={category}
                >
                  {categoryLabels[category]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="inner">
          {categories.map((category) => {
            const items = courses.filter((course) => course.category === category);
            return (
              <section className="pricing-category" id={category} key={category}>
                <div className="pricing-category-head">
                  <div>
                    <p className="eyebrow">Kurzy</p>
                    <h2>{categoryLabels[category]}</h2>
                  </div>
                  <p className="muted">
                    Přesnou organizaci kurzu a dostupnost jízd potvrdí zvolená pobočka.
                  </p>
                </div>
                <div className="course-grid">
                  {items.map((course) => (
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
                      <div className="offering-list">
                        {course.offerings.map((offering) => (
                          <div className="offering-row" key={offering.branchId}>
                            <span>{branches[offering.branchId].shortName}</span>
                            <strong>{formatPrice(offering.priceCzk)}</strong>
                          </div>
                        ))}
                      </div>
                      <div className="course-card-actions">
                        <OrderLink courseId={course.id}>Vybrat kurz</OrderLink>
                        <Link className="text-link" href={`/kurzy/${course.slug}`}>
                          Detail kurzu →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
