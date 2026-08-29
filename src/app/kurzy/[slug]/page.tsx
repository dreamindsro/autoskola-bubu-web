import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { OrderLink } from "@/components/order-link";
import { branches, courses, formatPrice, getCourseBySlug, minimumPrice } from "@/data/catalog";
import { absoluteUrl, site } from "@/data/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.description,
    alternates: { canonical: `/kurzy/${course.slug}` },
    openGraph: {
      title: course.title,
      description: course.description,
      url: `/kurzy/${course.slug}`,
      images: [course.image],
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  const price = minimumPrice(course);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: absoluteUrl(`/kurzy/${course.slug}`),
    provider: { "@type": "DrivingSchool", name: site.name, url: site.canonicalUrl },
  };

  return (
    <>
      <section className="course-detail-hero">
        <div className="inner course-detail-grid">
          <div>
            <p className="hero-pill">Skupina {course.group}</p>
            <h1>{course.title}</h1>
            <p className="lead">{course.description}</p>
            <strong className="course-detail-price">
              {price === null ? "Cena dle domluveného rozsahu" : `od ${formatPrice(price)}`}
            </strong>
            <div className="hero-actions">
              <OrderLink courseId={course.id}>Přihlásit se →</OrderLink>
              <a className="btn btn-secondary" href="#ceny">
                Ceny podle pobočky
              </a>
            </div>
          </div>
          <div className="course-detail-image">
            <Image
              src={course.image}
              alt={course.title}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 55vw"
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="inner two-column">
          <article className="content-card">
            <p className="eyebrow">Co získáte</p>
            <h2>Kurz v kostce</h2>
            <ul className="check-list">
              {course.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>
          <article className="content-card">
            <p className="eyebrow">V ceně kurzu</p>
            <h2>Součást výuky</h2>
            <ul className="check-list">
              {course.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
      <section className="section section-soft" id="ceny">
        <div className="inner">
          <div className="section-heading">
            <p className="eyebrow">Pobočky</p>
            <h2>Cena kurzu</h2>
            <p>Dostupné kombinace vycházejí z aktuální veřejné nabídky Autoškoly BuBu.</p>
          </div>
          <div className="course-branch-prices">
            {course.offerings.map((offering) => (
              <article className="course-branch-price" key={offering.branchId}>
                <small>{branches[offering.branchId].area}</small>
                <h3>{branches[offering.branchId].shortName}</h3>
                <strong>{formatPrice(offering.priceCzk)}</strong>
                <OrderLink
                  courseId={course.id}
                  branchId={offering.branchId}
                  className="btn btn-primary btn-small"
                >
                  Vybrat pobočku
                </OrderLink>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="inner">
          <div className="section-heading">
            <p className="eyebrow">Časté dotazy</p>
            <h2>{course.title}</h2>
          </div>
          <FaqList items={course.faq} />
        </div>
      </section>
      <FinalCta />
      <JsonLd data={productJsonLd} />
    </>
  );
}
