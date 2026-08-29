import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obchodní podmínky",
  alternates: { canonical: "/obchodni-podminky" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <section className="section">
      <div className="inner legal-placeholder">
        <p className="eyebrow">Právní dokument</p>
        <h1>Obchodní podmínky</h1>
        <div className="legal-notice">
          <strong>Dokument vyžaduje před produkčním spuštěním právní doplnění.</strong>
          <p>
            V dostupných podkladech není spolehlivě ověřena úplná identifikace provozovatele ani
            schválené znění obchodních podmínek. Tyto údaje záměrně nevymýšlíme.
          </p>
        </div>
        <h2>Rozsah webové přihlášky</h2>
        <p>
          Web slouží k odeslání žádosti o kontakt ohledně vybraného kurzu a pobočky. Nejde o e-shop,
          nedochází zde k online platbě ani automatickému uzavření smlouvy. Konkrétní podmínky výuky
          a dostupnost potvrdí vybraná pobočka.
        </p>
        <h2>Kontakt</h2>
        <p>
          Kontakty jednotlivých poboček jsou uvedené na stránce Kontakt. Před produkčním nasazením
          musí provozovatel doplnit své úplné zákonné identifikační údaje a schválené znění tohoto
          dokumentu.
        </p>
      </div>
    </section>
  );
}
