import type { Metadata } from "next";
import Link from "next/link";
import { Code, InfoPage, InfoSection, SeedList } from "@/components/shared/info-page";

export const metadata: Metadata = {
  alternates: { canonical: "/how-to" },
  title: "Get your Grok export",
  description: "Where to request your Grok data from xAI and which file to load into the app.",
};

export default function HowToPage() {
  return (
    <InfoPage
      label="help / export"
      title="Getting your Grok export"
      intro="xAI hands out a copy of your Grok history on request. It usually takes a few minutes, sometimes up to a day."
    >
      <InfoSection title="1. Ask xAI for your data">
        <p>
          Sign in at{" "}
          <a
            href="https://accounts.x.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="link-seed"
          >
            accounts.x.ai
          </a>{" "}
          with the account you use for Grok, open the data section and request a download. xAI sends
          you an email with a link once the archive is ready.
        </p>
        <p>
          If you only ever used Grok inside X, the X archive (Settings, Your account, Download an
          archive of your data) is the other route. It can take 24 to 48 hours.
        </p>
      </InfoSection>

      <InfoSection title="2. Find the conversations file">
        <p>
          Unzip the archive. The file you want is a JSON file with your conversations and their
          responses in it, often named <Code>grok-chats.json</Code> or similar. If you are not sure,
          it is almost always the largest <Code>.json</Code> file in the folder.
        </p>
      </InfoSection>

      <InfoSection title="3. Load it">
        <p>
          Go to the{" "}
          <Link href="/" className="link-seed">
            start page
          </Link>{" "}
          and drop the file onto the box, or click the box and pick it. Your browser reads the file
          in a background thread, stores the result on this device and opens the brain view.
        </p>
        <SeedList
          items={[
            "Files up to 200 MB work. Larger exports may run out of memory on phones.",
            "Nothing is uploaded. You can switch off Wi-Fi after the page has loaded and it still works.",
            "Loading another export replaces the one stored before.",
          ]}
        />
      </InfoSection>
    </InfoPage>
  );
}
