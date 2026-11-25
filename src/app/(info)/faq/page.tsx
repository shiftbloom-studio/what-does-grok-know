import type { Metadata } from "next";
import { InfoPage } from "@/components/shared/info-page";
import { faqs } from "@/config/faq";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "FAQ",
  description:
    "Short answers about what does grok know?: privacy, file format, analysis, deleting your data.",
};

export default function FaqPage() {
  return (
    <InfoPage label="help / faq" title="Questions people ask">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <dl className="divide-y divide-brand-border border-y border-brand-border">
        {faqs.map((faq) => (
          <div
            key={faq.q}
            className="grid gap-2 py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8"
          >
            <dt className="font-display text-xl font-medium">{faq.q}</dt>
            <dd className="text-brand-text/85">{faq.a}</dd>
          </div>
        ))}
      </dl>
    </InfoPage>
  );
}
