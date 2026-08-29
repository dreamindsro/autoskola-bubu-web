import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div>
        <p className="eyebrow">404</p>
        <h1>Tahle cesta nikam nevede</h1>
        <p className="lead muted">
          Stránka mohla změnit adresu. Kurzy, ceník a kontakty jsou pořád na svém místě.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/">
            Zpět na hlavní stránku
          </Link>
          <Link className="btn btn-secondary" href="/cenik">
            Zobrazit ceník
          </Link>
        </div>
      </div>
    </section>
  );
}
