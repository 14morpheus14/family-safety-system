export interface UrlScanMatch {
  type: string;
  value: string;
  score: number;
}

export class UrlScanner {
  private readonly suspiciousDomains: string[] = [
    "bit.ly",
    "tinyurl.com",
    "goo.gl",
    "t.co",
    "is.gd",
    "rebrand.ly"
  ];

  private readonly suspiciousExtensions: string[] = [
    ".exe",
    ".apk",
    ".bat",
    ".scr",
    ".js",
    ".vbs"
  ];

  private readonly urlRegex: RegExp =
    /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;

  private readonly ipUrlRegex: RegExp =
    /(?:https?:\/\/)?(?:\d{1,3}\.){3}\d{1,3}/i;

  private readonly punycodeRegex: RegExp =
    /\bxn--[a-z0-9-]+\b/i;

  public extractUrls(content: string): string[] {
    const matches = content.match(this.urlRegex);

    if (!matches) {
      return [];
    }

    return matches;
  }

  private calculateEntropyScore(
    value: string
  ): number {
    const uniqueCharacters =
      new Set(value).size;

    return (
      uniqueCharacters /
      value.length
    );
  }

  public scan(content: string): string[] {
    const findings: string[] = [];

    const normalizedContent =
      content.toLowerCase();

    const urls =
      this.extractUrls(content);

    for (const url of urls) {
      const normalizedUrl =
        url.toLowerCase();

      for (const domain of this.suspiciousDomains) {
        if (normalizedUrl.includes(domain)) {
          findings.push(domain);
        }
      }

      for (const extension of this.suspiciousExtensions) {
        if (normalizedUrl.includes(extension)) {
          findings.push(extension);
        }
      }

      if (normalizedUrl.includes("@")) {
        findings.push("credential-pattern");
      }

      if (normalizedUrl.includes("http://")) {
        findings.push("insecure-http");
      }

      if (this.ipUrlRegex.test(normalizedUrl)) {
        findings.push("ip-address-url");
      }

      if (this.punycodeRegex.test(normalizedUrl)) {
        findings.push("punycode-domain");
      }

      const entropy =
        this.calculateEntropyScore(
          normalizedUrl
        );

      if (entropy > 0.6) {
        findings.push(
          "high-entropy-url"
        );
      }

      const subdomainCount =
        (
          normalizedUrl.match(/\./g) || []
        ).length;

      if (subdomainCount >= 4) {
        findings.push(
          "excessive-subdomains"
        );
      }

      const queryParameterCount =
        (
          normalizedUrl.match(/=/g) || []
        ).length;

      if (queryParameterCount >= 3) {
        findings.push(
          "parameter-obfuscation"
        );
      }

      if (
        /paypal|bank|upi|account/.test(
          normalizedUrl
        ) &&
        /secure|verify|login|update/.test(
          normalizedUrl
        )
      ) {
        findings.push(
          "brand-impersonation"
        );
      }
    }

    if (this.ipUrlRegex.test(content)) {
      findings.push("ip-address-url");
    }

    if (/\bloan\b/i.test(normalizedContent)) {
      findings.push("loan");
    }

    if (/\bwin(?:ner|nings)?\b/i.test(normalizedContent)) {
      findings.push("win");
    }

    if (/[^\x00-\x7F]/.test(content)) {
      findings.push("mixed-unicode");
    }

    const symbolMatches =
      content.match(/[!@#$%^&*]/g);

    if (symbolMatches && symbolMatches.length >= 4) {
      findings.push("symbol-spam");
    }

    const uppercaseCharacters =
      content.replace(/[^A-Z]/g, "").length;

    const alphabeticCharacters =
      content.replace(/[^a-zA-Z]/g, "").length;

    if (
      alphabeticCharacters > 0 &&
      uppercaseCharacters /
        alphabeticCharacters >
        0.7
    ) {
      findings.push("excessive-caps");
    }

    return [...new Set(findings)];
  }

  public evaluate(content: string): UrlScanMatch[] {
    const matches: UrlScanMatch[] = [];

    const findings = this.scan(content);

    for (const finding of findings) {
      if (finding === "bit.ly") {
        matches.push({
          type: "shortened-url",
          value: finding,
          score: 40
        });
      } else if (finding === "insecure-http") {
        matches.push({
          type: "insecure-protocol",
          value: finding,
          score: 25
        });
      } else if (
        this.suspiciousExtensions.includes(finding)
      ) {
        matches.push({
          type: "dangerous-file",
          value: finding,
          score: 50
        });
      } else if (finding === "credential-pattern") {
        matches.push({
          type: "credential-risk",
          value: finding,
          score: 35
        });
      } else if (finding === "ip-address-url") {
        matches.push({
          type: "network-risk",
          value: finding,
          score: 40
        });
      } else if (finding === "punycode-domain") {
        matches.push({
          type: "domain-obfuscation",
          value: finding,
          score: 45
        });
      } else if (finding === "mixed-unicode") {
        matches.push({
          type: "unicode-obfuscation",
          value: finding,
          score: 35
        });
      } else if (finding === "symbol-spam") {
        matches.push({
          type: "spam-pattern",
          value: finding,
          score: 20
        });
      } else if (finding === "excessive-caps") {
        matches.push({
          type: "social-engineering",
          value: finding,
          score: 20
        });
      } else if (finding === "high-entropy-url") {
        matches.push({
          type: "url-obfuscation",
          value: finding,
          score: 35
        });
      } else if (finding === "excessive-subdomains") {
        matches.push({
          type: "domain-obfuscation",
          value: finding,
          score: 35
        });
      } else if (finding === "parameter-obfuscation") {
        matches.push({
          type: "parameter-obfuscation",
          value: finding,
          score: 35
        });
      } else if (finding === "brand-impersonation") {
        matches.push({
          type: "brand-impersonation",
          value: finding,
          score: 50
        });
      } else {
        matches.push({
          type: "suspicious-keyword",
          value: finding,
          score: 20
        });
      }
    }

    return matches;
  }

  public hasSuspiciousUrl(content: string): boolean {
    return this.scan(content).length > 0;
  }
}
