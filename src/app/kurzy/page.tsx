import type { Metadata } from "next";
import { CourseCard } from "@/components/course-card";
import { FinalCta } from "@/components/final-cta";
import { PageHero } from "@/components/page-hero";
import { courses } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Kurzy",
  description: "Kurzy Autoškoly BuBu: auto, L17, automat, motorky, přívěsy a kondiční jízdy.",
  alternates: { canonical: "/kurzy" },
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Kompletní nabídka"
        title="Kurzy pro auto, motorku i přívěs"
        lead="Vyberte si kurz a pobočku, která vám vyhovuje. Dostupné kombinace i ceny jsou vždy uvedené u konkrétního kurzu."
      />
      <section className="section section-soft">
        <div className="inner">
          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard course={course} key={course.id} featured={course.id === "b"} />
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
