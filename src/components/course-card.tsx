import Image from "next/image";
import Link from "next/link";
import { formatPrice, minimumPrice, type CatalogCourse } from "@/data/catalog";
import { OrderLink } from "@/components/order-link";

type CourseCardProps = {
  course: CatalogCourse;
  featured?: boolean;
};

export function CourseCard({ course, featured = false }: CourseCardProps) {
  const price = minimumPrice(course);

  return (
    <article className={`course-card ${featured ? "featured" : ""}`}>
      {featured ? <mark>Nejoblíbenější</mark> : null}
      <div className="course-card-head">
        <span className="course-card-icon">
          <Image src={course.icon} alt="" width={48} height={48} />
        </span>
        <div>
          <small>Skupina {course.group}</small>
          <h3>{course.title}</h3>
        </div>
      </div>
      <p>{course.shortDescription}</p>
      <strong className="course-price">
        {price === null ? "Cena dle rozsahu" : `od ${formatPrice(price)}`}
      </strong>
      <ul>
        {course.benefits.slice(0, 3).map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
      <div className="course-card-actions">
        <OrderLink courseId={course.id} className={featured ? "btn btn-light" : "btn btn-primary"}>
          Vybrat kurz
        </OrderLink>
        <Link className="text-link" href={`/kurzy/${course.slug}`}>
          Detail kurzu →
        </Link>
      </div>
    </article>
  );
}
