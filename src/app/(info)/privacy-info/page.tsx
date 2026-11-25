import type { Metadata } from "next";
import { Code, InfoPage, InfoSection, SeedList } from "@/components/shared/info-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Check it yourself",
  description: "How to confirm in your own browser that your Grok export never leaves your device.",
};

export default function PrivacyInfoPage() {
  return (
    <InfoPage
      label="help / verify"
      title="Don't take our word for it"
      intro="The app says your export stays on your device. These three checks take about two minutes and need nothing but your browser."
    >
      <InfoSection title="How it is built">
        <p>
          The site is a set of static files. Once they are loaded, your browser does all the work:
          one Web Worker parses the export, a second one computes topics and statistics, IndexedDB
          stores the result, and WebGL draws the brain on your graphics card. There is no backend
          that could receive your chats.
        </p>
      </InfoSection>

      <InfoSection title="Check 1: watch the network">
        <SeedList
          items={[
            <>
              Open the developer tools (<Code>F12</Code>, or <Code>Cmd+Option+I</Code> on a Mac) and
              switch to the Network tab.
            </>,
            "Clear the list, then load your export.",
            "You will see no request carrying your file. At most the browser fetches app code it had not needed yet.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Check 2: go offline">
        <p>
          Open the start page, switch off Wi-Fi or pull the cable, then load your export. Parsing,
          analysis and the 3D view all keep working, which would be impossible if anything had to
          reach a server.
        </p>
      </InfoSection>

      <InfoSection title="Check 3: look at the storage">
        <p>
          In the developer tools, open Application (Storage in Firefox) and expand IndexedDB. The
          database <Code>GrokBrainDB</Code> holds the conversations and messages you loaded, on this
          device only. The cookie list for this site stays empty.
        </p>
      </InfoSection>

      <InfoSection title="Reading the code">
        <p>
          Everything is open source. Search the repository for <Code>fetch(</Code> or{" "}
          <Code>XMLHttpRequest</Code> and you will find nothing that sends data out.{" "}
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-seed"
          >
            Source on GitHub
          </a>
        </p>
      </InfoSection>

      <InfoSection title="Removing your data">
        <p>
          Press &quot;Delete data&quot; in the app header, or clear this site&apos;s data in your
          browser settings. Both remove the database completely.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
