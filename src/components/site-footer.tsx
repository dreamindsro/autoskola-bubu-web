import Image from "next/image";
import Link from "next/link";
import { branches } from "@/data/catalog";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="inner footer-grid">
        <div>
          <Image
            className="footer-logo"
            src="/assets/brand/logo-autoskola-bubu.png"
            alt="Autoškola BuBu"
            width={134}
            height={64}
          />
          <p>
            Autoškola BuBu pro Prahu 8, Kladno a Statenice. Řidičák bez stresu a klidná výuka v
            reálném provozu.
          </p>
        </div>
        <div>
          <h2>Kontakt</h2>
          {Object.values(branches).map((branch) => (
            <a key={branch.id} href={`tel:${branch.phoneHref}`}>
              {branch.shortName}: {branch.phone}
            </a>
          ))}
          <Link className="btn btn-secondary btn-small" href="/kontakt">
            Napsat autoškole
          </Link>
        </div>
        <div>
          <h2>Rychlé odkazy</h2>
          <Link href="/cenik">Ceník a kurzy</Link>
          <Link href="/jak-probiha-vyuka">Jak probíhá kurz</Link>
          <Link href="/o-nas">O nás</Link>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/blog">Blog</Link>
        </div>
        <div>
          <h2>Dokumenty</h2>
          <Link href="/obchodni-podminky">Obchodní podmínky</Link>
          <Link href="/ochrana-osobnich-udaju">Ochrana osobních údajů</Link>
          <Link href="/kontakt">Kontaktní údaje</Link>
        </div>
      </div>
      <div className="inner footer-bottom">
        <span>© {new Date().getFullYear()} Autoškola BuBu</span>
        <span>Řidičák bez stresu</span>
      </div>
    </footer>
  );
}
