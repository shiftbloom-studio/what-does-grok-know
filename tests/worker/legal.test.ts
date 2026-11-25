import { describe, expect, it } from "vitest";
import { esc, LEGAL_PATHS, legalPage, parseLegal } from "../../worker/legal";

const sample = {
  name: "Jane Doe",
  street: "Example Street 1",
  city: "12345 Example Town",
  country: { en: "Germany", de: "Deutschland" },
  email: "hello@example.com",
  authority: "Example authority",
};

describe("parseLegal", () => {
  it("returns null when unset, invalid or incomplete", () => {
    expect(parseLegal(undefined)).toBeNull();
    expect(parseLegal("not json")).toBeNull();
    expect(parseLegal(JSON.stringify({ ...sample, street: "" }))).toBeNull();
  });

  it("accepts a complete config", () => {
    expect(parseLegal(JSON.stringify(sample))?.name).toBe("Jane Doe");
  });
});

describe("legalPage", () => {
  it("renders all four pages in the right language", () => {
    for (const kind of Object.values(LEGAL_PATHS)) {
      const html = legalPage(kind, sample);
      const de = kind === "datenschutz" || kind === "impressum";
      expect(html).toContain(`<html lang="${de ? "de" : "en"}">`);
      expect(html).toContain("Example Street 1");
      expect(html).toContain("hello@example.com");
    }
  });

  it("escapes operator data", () => {
    const html = legalPage("imprint", { ...sample, name: '<script>alert("x")</script>' });
    expect(html).not.toContain("<script>alert");
    expect(esc("<a>")).toBe("&#60;a&#62;");
  });

  it("only shows a phone number when one is configured", () => {
    expect(legalPage("impressum", sample)).not.toContain("Telefon");
    expect(legalPage("impressum", { ...sample, phone: "+49 30 1234567" })).toContain(
      "tel:+49301234567",
    );
  });
});
