import { DetectionEngine } from "../src/engine/detectionEngine";

describe("DetectionEngine", () => {
  let engine: DetectionEngine;

  beforeEach(() => {
    engine = new DetectionEngine();
  });

  test("should detect insecure http phishing link", () => {
    const result = engine.analyze(
      "URGENT verify your account at http://bit.ly/reset-password"
    );

    expect(result.isSuspicious).toBe(true);

    expect(result.riskScore).toBeGreaterThanOrEqual(40);

    expect(result.matchedPatterns).toContain(
      "bit.ly"
    );

    expect(result.categories).toContain(
      "phishing"
    );
  });

  test("should detect dangerous executable download", () => {
    const result = engine.analyze(
      "Download update from http://malware-site.com/update.exe"
    );

    expect(result.isSuspicious).toBe(true);

    expect(result.matchedPatterns).toContain(
      ".exe"
    );

    expect(result.categories).toContain(
      "dangerous-file"
    );
  });

  test("should detect financial scam keywords", () => {
    const result = engine.analyze(
      "Win free crypto loan now"
    );

    expect(result.isSuspicious).toBe(true);

    expect(result.riskScore).toBeGreaterThanOrEqual(40);

    expect(result.categories).toContain(
      "financial"
    );

    expect(result.categories).toContain(
      "crypto"
    );
  });

  test("should detect obfuscated phishing keywords", () => {
    const result = engine.analyze(
      "W1N fr33 cr3dit cl1ck now"
    );

    expect(result.isSuspicious).toBe(true);

    expect(result.riskScore).toBeGreaterThanOrEqual(40);
  });

  test("should normalize repeated character spam", () => {
    const result = engine.analyze(
      "WIIIIIIIN FREEEEEE PRIZEEEE"
    );

    expect(result.isSuspicious).toBe(true);

    expect(result.categories).toContain(
      "scam"
    );
  });

  test("should detect punycode phishing domain", () => {
    const result = engine.analyze(
      "Visit http://xn--paypal-security.com/login"
    );

    expect(result.isSuspicious).toBe(true);

    expect(result.categories).toContain(
      "domain-obfuscation"
    );
  });

  test("should detect IP address phishing URL", () => {
    const result = engine.analyze(
      "Login at http://192.168.1.20/verify"
    );

    expect(result.isSuspicious).toBe(true);

    expect(result.categories).toContain(
      "network-risk"
    );
  });

  test("should detect unicode obfuscation", () => {
    const result = engine.analyze(
      "Verify bіt.ly account"
    );

    expect(result.isSuspicious).toBe(true);

    expect(result.categories).toContain(
      "unicode-obfuscation"
    );
  });

  test("should detect excessive caps and symbol spam", () => {
    const result = engine.analyze(
      "URGENT!!!!! VERIFY ACCOUNT NOW!!!!!"
    );

    expect(result.isSuspicious).toBe(true);

    expect(result.categories).toContain(
      "spam-pattern"
    );

    expect(result.categories).toContain(
      "social-engineering"
    );
  });

  test("should not trigger on safe conversation", () => {
    const result = engine.analyze(
      "Family dinner tonight at home"
    );

    expect(result.isSuspicious).toBe(false);

    expect(result.riskScore).toBe(0);

    expect(result.matchedPatterns).toEqual([]);
  });

  test("should avoid false positive for winter", () => {
    const result = engine.analyze(
      "Winter vacation starts tomorrow"
    );

    expect(result.isSuspicious).toBe(false);

    expect(result.matchedPatterns).not.toContain(
      "win"
    );
  });

  test("should detect banking phishing attempt", () => {
    const result = engine.analyze(
      "Verify your bank account password immediately"
    );

    expect(result.isSuspicious).toBe(true);

    expect(result.categories).toContain(
      "banking"
    );

    expect(result.categories).toContain(
      "phishing"
    );
  });
});
