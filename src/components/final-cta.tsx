import { OrderLink } from "@/components/order-link";

export function FinalCta() {
  return (
    <section className="section final-cta">
      <div className="inner final-cta-grid">
        <div>
          <p className="eyebrow">Připravení začít?</p>
          <h2>Řidičák bez stresu začíná jednoduchou přihláškou.</h2>
          <p>Vyberte kurz a pobočku. Ozveme se vám s dalšími kroky a domluvíme konkrétní průběh.</p>
        </div>
        <div className="hero-actions">
          <OrderLink className="btn btn-light">Vybrat kurz →</OrderLink>
        </div>
      </div>
    </section>
  );
}
