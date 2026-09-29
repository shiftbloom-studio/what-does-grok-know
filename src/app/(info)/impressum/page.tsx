import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung gem. § 5 DDG",
};

export default function ImpressumPage() {
  return (
    <article className="space-y-8">
      <h1 className="text-3xl font-bold text-brand-text">Impressum</h1>

      <section className="glass-deep rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-brand-text">
          Angaben gem&auml;&szlig; &sect; 5 DDG
        </h2>
        <div className="text-brand-muted space-y-1">
          <p className="font-medium text-brand-text">Fabian Zimber</p>
          <p>shiftbloom studio</p>
          <p>Up de Worth 6a</p>
          <p>22927 Gro&szlig;hansdorf</p>
          <p>Deutschland</p>
        </div>
      </section>

      <section className="glass-deep rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-brand-text">Kontakt</h2>
        <div className="text-brand-muted space-y-1">
          <p>
            E-Mail:{" "}
            <a
              href="mailto:fabian@shiftbloom.studio"
              className="text-brand-primary hover:underline"
            >
              fabian@shiftbloom.studio
            </a>
          </p>
          <p>Telefon: +49 163 8552 708</p>
          <p>
            Website:{" "}
            <a
              href="https://shiftbloom.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline"
            >
              shiftbloom.studio
            </a>
          </p>
        </div>
      </section>

      <section className="glass-deep rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-brand-text">
          Verbraucherstreitbeilegung / Universalschlichtungsstelle
        </h2>
        <p className="text-brand-muted">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </article>
  );
}
