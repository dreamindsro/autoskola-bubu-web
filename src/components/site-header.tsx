import Image from "next/image";
import Link from "next/link";
import { courses } from "@/data/catalog";
import { OrderLink } from "@/components/order-link";
import { Icon } from "@/components/icon";

const featuredCourses = courses.filter((course) =>
  ["b", "l17", "ba", "a", "a2", "b96", "be"].includes(course.id),
);

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="main-header inner">
        <Link className="header-brand" href="/" aria-label="Autoškola BuBu domů">
          <Image
            src="/assets/brand/logo-autoskola-bubu.png"
            alt="Autoškola BuBu"
            width={134}
            height={64}
            priority
          />
        </Link>

        <nav className="desktop-nav" aria-label="Hlavní navigace">
          <div className="desktop-dropdown">
            <Link href="/kurzy">
              Kurzy <span aria-hidden="true">⌄</span>
            </Link>
            <div className="mega-menu">
              <div className="mega-course-list">
                {featuredCourses.map((course) => (
                  <Link key={course.id} href={`/kurzy/${course.slug}`}>
                    <Icon src={course.icon} size={27} />
                    <span>
                      {course.title}
                      <small>{course.shortDescription}</small>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mega-menu-side">
                <strong>Nejoblíbenější</strong>
                <Link href="/kurzy/ridicak-skupina-b">Skupina B</Link>
                <OrderLink courseId="b" className="btn btn-primary btn-small">
                  Přihlásit se na B
                </OrderLink>
                <Link href="/cenik">Zobrazit ceník</Link>
              </div>
            </div>
          </div>
          <Link href="/jak-probiha-vyuka">Jak probíhá kurz</Link>
          <Link href="/cenik">Ceník</Link>
          <div className="desktop-dropdown location-dropdown">
            <Link href="/strizkov">
              Pobočky <span aria-hidden="true">⌄</span>
            </Link>
            <div className="mega-menu mega-menu-branches">
              <Link href="/strizkov">
                Praha 8 – Střížkov<small>Prosek, Kobylisy, Letňany</small>
              </Link>
              <Link href="/kladno">
                Kladno<small>Kročehlavy, Rozdělov, Sítná</small>
              </Link>
              <Link href="/statenice">
                Statenice<small>Horoměřice, Suchdol, Praha-západ</small>
              </Link>
            </div>
          </div>
        </nav>

        <div className="header-actions">
          <a className="header-phone" href="tel:+420725717755">
            <Icon src="/assets/icons/phone_teal.svg" size={24} />
            <span>725 717 755</span>
          </a>
          <OrderLink className="btn btn-primary header-cta">Přihlásit se do kurzu →</OrderLink>
        </div>

        <div className="mobile-actions">
          <a
            className="mobile-icon-button"
            href="tel:+420725717755"
            aria-label="Zavolat Autoškole BuBu"
          >
            <Icon src="/assets/icons/phone_teal.svg" size={23} />
          </a>
          <details className="mobile-menu">
            <summary aria-label="Otevřít navigaci">
              <span />
              <span />
              <span />
            </summary>
            <nav aria-label="Mobilní navigace">
              <Link href="/kurzy">Kurzy</Link>
              <Link href="/jak-probiha-vyuka">Jak probíhá kurz</Link>
              <Link href="/cenik">Ceník</Link>
              <Link href="/strizkov">Praha 8 – Střížkov</Link>
              <Link href="/kladno">Kladno</Link>
              <Link href="/statenice">Statenice</Link>
              <Link href="/kontakt">Kontakt</Link>
              <OrderLink>Přihlásit se do kurzu</OrderLink>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
