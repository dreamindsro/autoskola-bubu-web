import type { Metadata } from "next";
import { OrderForm } from "@/components/order-form";
import { branches, courses, formatPrice } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Přihláška do kurzu",
  description: "Jednoduchá přihláška do kurzu Autoškoly BuBu.",
  alternates: { canonical: "/objednavka" },
  robots: { index: false, follow: true },
};

export default function OrderPage() {
  const initialCourse = courses[0];
  const initialBranchId = initialCourse?.offerings[0]?.branchId ?? "strizkov";
  const publicCourses = courses.map((course) => ({
    id: course.id,
    title: course.title,
    group: course.group,
    offerings: course.offerings.map((offering) => ({
      branchId: offering.branchId,
      price: formatPrice(offering.priceCzk),
    })),
  }));
  const publicBranches = Object.values(branches).map((branch) => ({
    id: branch.id,
    name: branch.name,
  }));

  return (
    <section className="order-page">
      <div className="inner order-layout">
        <div className="order-intro">
          <p className="hero-pill">Začněte u BuBu</p>
          <h1>Přihláška do kurzu</h1>
          <p className="lead">
            Pár údajů stačí. Vybraná pobočka se vám ozve a domluví s vámi konkrétní průběh.
          </p>
          <ul className="check-list">
            <li>Žádná online platba</li>
            <li>Žádný uživatelský účet</li>
            <li>Cena se ověřuje na serveru</li>
            <li>Kontakty neposíláme v URL</li>
          </ul>
        </div>
        <OrderForm
          courses={publicCourses}
          branches={publicBranches}
          initialCourseId={initialCourse?.id ?? "b"}
          initialBranchId={initialBranchId}
        />
      </div>
    </section>
  );
}
