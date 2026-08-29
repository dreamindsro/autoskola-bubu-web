import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  alternates: { canonical: "/ochrana-osobnich-udaju" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="inner legal-placeholder">
        <p className="eyebrow">Právní dokument</p>
        <h1>Ochrana osobních údajů</h1>
        <div className="legal-notice">
          <strong>
            Dokument vyžaduje před produkčním spuštěním právní kontrolu a identifikaci správce.
          </strong>
          <p>
            Úplná a ověřená identita provozovatele nebyla v dostupných podkladech nalezena. Proto ji
            web nedoplňuje odhadem.
          </p>
        </div>
        <h2>Údaje z přihlášky</h2>
        <p>
          Formulář zpracovává jméno, příjmení, e-mail, telefon, zvolený kurz a pobočku a případnou
          poznámku. Údaje slouží k potvrzení přihlášky a navazující komunikaci vybrané pobočky.
        </p>
        <h2>Příjemci a přenos</h2>
        <p>
          Potvrzení je odesíláno e-mailovým poskytovatelem Resend studentovi a na adresu vybrané
          pobočky. Osobní údaje nejsou vkládány do URL ani záměrně zapisovány do aplikačních logů.
        </p>
        <h2>Doba uchování a práva</h2>
        <p>
          Před produkčním spuštěním musí správce doplnit právní titul, dobu uchování, kontaktní
          údaje správce, informace o zpracovateli a přesný postup pro uplatnění práv subjektu údajů.
        </p>
      </div>
    </section>
  );
}
