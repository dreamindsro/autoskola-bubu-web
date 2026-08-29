import type { Metadata } from "next";
import { FinalCta } from "@/components/final-cta";
import { OrderLink } from "@/components/order-link";
import { PageHero } from "@/components/page-hero";
import { branches } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakty na pobočky Autoškoly BuBu ve Střížkově, Kladně a Statenicích.",
  alternates: { canonical: "/kontakt" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Jsme tu pro vás"
        title="Kontaktujte Autoškolu BuBu"
        lead="Vyberte pobočku podle lokality nebo kurzu. Přihlášku odešlete online, na ostatní dotazy odpoví pobočka telefonicky či e-mailem."
      />
      <section className="section section-soft">
        <div className="inner contact-grid">
          {Object.values(branches).map((branch) => (
            <article className="contact-card" key={branch.id}>
              <p className="eyebrow">{branch.area}</p>
              <h2>{branch.shortName}</h2>
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
              <OrderLink courseId="b" branchId={branch.id}>
                Přihlásit se
              </OrderLink>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="inner two-column">
          <article className="content-card">
            <h2>Chcete se přihlásit?</h2>
            <p>
              Online formulář pošle potvrzení vám a zároveň souhrn správné pobočce. Cena i zvolený
              kurz se ověřují na serveru.
            </p>
            <OrderLink>Vyplnit přihlášku</OrderLink>
          </article>
          <article className="content-card">
            <h2>Potřebujete poradit?</h2>
            <p>
              Pokud si nejste jistí skupinou nebo pobočkou, zavolejte na nejbližší pobočku. Pomůže
              vám vybrat odpovídající variantu.
            </p>
            <a className="btn btn-secondary" href={`tel:${branches.strizkov.phoneHref}`}>
              Zavolat na Střížkov
            </a>
          </article>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
