/**
 * Imprint and privacy policy in English and German.
 * Operator details come from the LEGAL secret at runtime; nothing personal lives in this repository.
 */

export type Legal = {
  name: string;
  business?: string;
  street: string;
  city: string;
  country: { en: string; de: string };
  email: string;
  phone?: string;
  vatId?: string;
  /** Data protection supervisory authority responsible for the operator, name and address. */
  authority: string;
};

export type LegalKind = "privacy" | "datenschutz" | "imprint" | "impressum";

export const LEGAL_PATHS: Record<string, LegalKind> = {
  "/privacy": "privacy",
  "/datenschutz": "datenschutz",
  "/imprint": "imprint",
  "/impressum": "impressum",
};

const UPDATED = { en: "Last updated 25 November 2026", de: "Stand: 25. November 2026" };

export function parseLegal(raw: string | undefined): Legal | null {
  if (!raw) return null;
  try {
    const l = JSON.parse(raw) as Legal;
    if (
      !l.name ||
      !l.street ||
      !l.city ||
      !l.email ||
      !l.authority ||
      !l.country?.en ||
      !l.country?.de
    ) {
      return null;
    }
    return l;
  } catch {
    return null;
  }
}

export function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export function legalPage(kind: LegalKind, l: Legal): string {
  const de = kind === "datenschutz" || kind === "impressum";
  const lang = de ? "de" : "en";
  const isPrivacy = kind === "privacy" || kind === "datenschutz";
  const title = {
    privacy: "Privacy policy",
    datenschutz: "Datenschutzerklärung",
    imprint: "Imprint",
    impressum: "Impressum",
  }[kind];
  const other = {
    privacy: "/datenschutz",
    datenschutz: "/privacy",
    imprint: "/impressum",
    impressum: "/imprint",
  }[kind];
  const mail = `<a href="mailto:${esc(l.email)}">${esc(l.email)}</a>`;
  const address = `<address>${esc(l.name)}<br>${l.business ? `${esc(l.business)}<br>` : ""}${esc(l.street)}<br>${esc(l.city)}<br>${esc(l.country[lang])}</address>`;
  const body = isPrivacy
    ? de
      ? privacyDe(address, mail, l)
      : privacyEn(address, mail, l)
    : imprint(de, address, mail, l);

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title} · what does grok know?</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/fonts/brand.css">
<style>
:root{--ink:#1a1216;--ink60:#6b5f65;--red:#ff2e52;--root:#c81040;--line:#ece3df;--panel:#faf6f4}
*{box-sizing:border-box}
body{margin:0;background:#fff;color:var(--ink);font:16px/1.65 "General Sans",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
a{color:var(--root);text-underline-offset:3px}
.wrap{max-width:46rem;margin:0 auto;padding:0 20px}
header{border-bottom:1px solid var(--line)}
header .wrap{display:flex;justify-content:space-between;align-items:center;padding-top:16px;padding-bottom:16px}
.brand{font:600 18px/1 "Clash Display","General Sans",ui-sans-serif,sans-serif;color:var(--ink);text-decoration:none}
.brand span{color:var(--red)}
.back{color:var(--ink60);font-size:14px;text-decoration:none}
main.wrap{padding-top:48px;padding-bottom:64px}
.label{font:12px/1 "JetBrains Mono",ui-monospace,Menlo,monospace;letter-spacing:.16em;color:var(--ink60)}
h1{font:600 clamp(34px,5vw,48px)/1.05 "Clash Display","General Sans",ui-sans-serif,sans-serif;margin:14px 0 0;letter-spacing:-.01em}
h2{font:500 22px/1.3 "Clash Display","General Sans",ui-sans-serif,sans-serif;margin:36px 0 10px}
p,address{margin:0 0 14px;font-style:normal}
.meta{display:flex;gap:16px;flex-wrap:wrap;margin:14px 0 32px;font-size:14px;color:var(--ink60)}
footer{border-top:1px solid var(--line);padding:24px 0 40px;font-size:14px;color:var(--ink60)}
footer a{color:var(--ink60);margin-right:16px}
</style>
</head>
<body>
<header><div class="wrap"><a class="brand" href="/">what does grok know<span>?</span></a><a class="back" href="/">${de ? "Zur App" : "Back to the app"}</a></div></header>
<main class="wrap">
<p class="label">${de ? "rechtliches" : "legal"}</p>
<h1>${title}</h1>
<div class="meta">${isPrivacy ? `<span>${UPDATED[lang]}</span>` : ""}<a href="${other}" hreflang="${de ? "en" : "de"}">${de ? "English version" : "Deutsche Fassung"}</a></div>
${body}
</main>
<footer><div class="wrap"><a href="/privacy">Privacy</a><a href="/datenschutz">Datenschutz</a><a href="/imprint">Imprint</a><a href="/impressum">Impressum</a></div></footer>
</body>
</html>`;
}

function imprint(de: boolean, address: string, mail: string, l: Legal): string {
  const phone = l.phone
    ? `<br>${de ? "Telefon" : "Phone"}: <a href="tel:${esc(l.phone.replace(/[^\d+]/g, ""))}">${esc(l.phone)}</a>`
    : "";
  const vat = l.vatId
    ? `<p>${de ? "Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG" : "VAT ID pursuant to § 27a UStG"}: ${esc(l.vatId)}</p>`
    : "";
  return de
    ? `<p>Angaben gemäß § 5 DDG:</p>${address}<p>E-Mail: ${mail}${phone}</p>${vat}
<h2>Verantwortlich für den Inhalt</h2><p>${esc(l.name)}, Anschrift wie oben.</p>
<h2>Verbraucherstreitbeilegung</h2><p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
<h2>Marken</h2><p>Grok ist eine Marke ihres Inhabers. Diese App ist ein unabhängiges Projekt und steht in keiner Verbindung zu xAI oder X.</p>`
    : `<p>Information pursuant to § 5 DDG (German Digital Services Act):</p>${address}<p>Email: ${mail}${phone}</p>${vat}
<h2>Responsible for the content</h2><p>${esc(l.name)}, address as above.</p>
<h2>Consumer dispute resolution</h2><p>We are not willing or obliged to take part in dispute resolution proceedings before a consumer arbitration board.</p>
<h2>Trademarks</h2><p>Grok is a trademark of its owner. This app is an independent project and is not affiliated with xAI or X.</p>`;
}

function privacyEn(address: string, mail: string, l: Legal): string {
  return `<p>what does grok know? has no accounts and sets no cookies. There is no tracking, no advertising and no analytics. The Grok export you load is read and analysed in your browser and never sent to us. This policy explains the little personal data that is processed anyway when you open the site, mainly your IP address.</p>
<h2>Controller</h2>${address}<p>Email: ${mail}</p>
<h2>Hosting and delivery</h2>
<p>Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA, delivers this site on our behalf as a Cloudflare Worker with static files. To do so, Cloudflare processes your IP address, the address of the page you request, the time, and details your browser sends, such as its user agent and the page you came from. Cloudflare's security systems (protection against DDoS attacks, bots and known attack patterns) use the same data to block abusive requests. We don't keep our own request logs.</p>
<p>Fonts are fetched by our Worker and delivered from this domain, so your browser doesn't contact Fontshare or any other font service.</p>
<p>The legal basis is our legitimate interest in delivering the site securely and reliably (Art. 6(1)(f) GDPR). Cloudflare processes the data as our processor under a data processing agreement (Art. 28 GDPR). Cloudflare, Inc. is certified under the EU-U.S. Data Privacy Framework, for which the European Commission has adopted an adequacy decision (Art. 45 GDPR); the agreement also contains the EU standard contractual clauses. More in <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare's privacy policy</a>.</p>
<h2>Your Grok export</h2>
<p>When you load an export, a background thread in your browser (a Web Worker) parses it, and the result is stored in your browser's IndexedDB under the name "GrokBrainDB": conversations, messages and the analysis computed from them (topics, sentiment scores, statistics and the facts the app finds in your messages). None of it is transmitted to us or to anyone else. The site's content security policy only allows network requests to this domain. We have no access to the data and could not hand it out if asked.</p>
<p>The data stays on your device until you remove it with "Delete data" in the app, by loading another export, or by clearing this site's data in your browser. Storing it is strictly necessary for the function you asked for (§ 25(2) no. 2 TDDDG).</p>
<p>Your export may contain information about other people, or special categories of data in the sense of Art. 9 GDPR. Because processing happens only on your device, it is your own private use of your data.</p>
<h2>Email</h2>
<p>If you email us, we use your address and message only to reply (Art. 6(1)(f) GDPR) and delete them once the matter is settled, unless the law requires us to keep them.</p>
<h2>Your rights</h2>
<p>You have the right of access to your personal data (Art. 15 GDPR), to rectification (Art. 16), to erasure (Art. 17), to restriction of processing (Art. 18) and to data portability (Art. 20). To exercise them, email us. You can also lodge a complaint with a data protection supervisory authority (Art. 77 GDPR), for example the one where you live or the one responsible for us: ${esc(l.authority)}.</p>
<h2>Right to object</h2>
<p><strong>You may object at any time, on grounds relating to your particular situation, to the processing of your personal data based on Art. 6(1)(f) GDPR (Art. 21 GDPR).</strong></p>`;
}

function privacyDe(address: string, mail: string, l: Legal): string {
  return `<p>what does grok know? hat keine Benutzerkonten und setzt keine Cookies. Es gibt kein Tracking, keine Werbung und keine Reichweitenmessung. Den Grok-Export, den du lädst, liest und analysiert dein Browser, er wird nie an uns gesendet. Diese Erklärung beschreibt die wenigen personenbezogenen Daten, die trotzdem verarbeitet werden, wenn du die Seite aufrufst, vor allem deine IP-Adresse.</p>
<h2>Verantwortlicher</h2>${address}<p>E-Mail: ${mail}</p>
<h2>Hosting und Auslieferung</h2>
<p>Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA, liefert diese Seite in unserem Auftrag als Cloudflare Worker mit statischen Dateien aus. Dazu verarbeitet Cloudflare deine IP-Adresse, die Adresse der aufgerufenen Seite, den Zeitpunkt und Angaben, die dein Browser mitsendet, etwa den User-Agent und die Seite, von der du kommst. Cloudflares Schutzsysteme (gegen DDoS-Angriffe, Bots und bekannte Angriffsmuster) nutzen dieselben Daten, um missbräuchliche Anfragen abzuweisen. Eigene Zugriffsprotokolle führen wir nicht.</p>
<p>Schriften lädt unser Worker selbst und liefert sie von dieser Domain aus, dein Browser verbindet sich also nicht mit Fontshare oder einem anderen Schriftendienst.</p>
<p>Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und zuverlässigen Auslieferung der Seite (Art. 6 Abs. 1 lit. f DSGVO). Cloudflare verarbeitet die Daten als unser Auftragsverarbeiter auf Grundlage eines Auftragsverarbeitungsvertrags (Art. 28 DSGVO). Cloudflare, Inc. ist nach dem EU-U.S. Data Privacy Framework zertifiziert, für das ein Angemessenheitsbeschluss der Europäischen Kommission besteht (Art. 45 DSGVO); der Vertrag enthält zusätzlich die EU-Standardvertragsklauseln. Mehr dazu in der <a href="https://www.cloudflare.com/de-de/privacypolicy/">Datenschutzerklärung von Cloudflare</a>.</p>
<h2>Dein Grok-Export</h2>
<p>Wenn du einen Export lädst, verarbeitet ihn ein Hintergrund-Thread in deinem Browser (ein Web Worker), und das Ergebnis landet in der IndexedDB deines Browsers unter dem Namen „GrokBrainDB“: Unterhaltungen, Nachrichten und die daraus berechnete Auswertung (Themen, Stimmungswerte, Statistiken und die Fakten, die die App in deinen Nachrichten findet). Nichts davon wird an uns oder an Dritte übertragen. Die Content Security Policy der Seite erlaubt Netzwerkanfragen nur an diese Domain. Wir haben keinen Zugriff auf die Daten und könnten sie auch auf Anfrage nicht herausgeben.</p>
<p>Die Daten bleiben auf deinem Gerät, bis du sie mit „Delete data“ in der App entfernst, einen anderen Export lädst oder die Websitedaten in deinem Browser löschst. Das Speichern ist für die von dir gewünschte Funktion unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG).</p>
<p>Dein Export kann Angaben über andere Personen oder besondere Kategorien personenbezogener Daten im Sinne von Art. 9 DSGVO enthalten. Weil die Verarbeitung nur auf deinem Gerät stattfindet, handelt es sich um deine eigene, private Nutzung deiner Daten.</p>
<h2>E-Mail</h2>
<p>Wenn du uns schreibst, nutzen wir deine Adresse und Nachricht nur, um dir zu antworten (Art. 6 Abs. 1 lit. f DSGVO), und löschen sie, sobald die Sache erledigt ist, es sei denn, das Gesetz verpflichtet uns zur Aufbewahrung.</p>
<h2>Deine Rechte</h2>
<p>Du hast das Recht auf Auskunft über deine personenbezogenen Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18) und Datenübertragbarkeit (Art. 20). Schreib uns dazu eine E-Mail. Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO), etwa bei der an deinem Wohnort oder bei der für uns zuständigen: ${esc(l.authority)}.</p>
<h2>Widerspruchsrecht</h2>
<p><strong>Du kannst der Verarbeitung deiner personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO jederzeit aus Gründen widersprechen, die sich aus deiner besonderen Situation ergeben (Art. 21 DSGVO).</strong></p>`;
}
