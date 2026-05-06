import { DetectionEngine } from "../src/engine/detectionEngine";

describe("DetectionEngine", () => {
  let engine: DetectionEngine;

  beforeEach(() => {
    engine = new DetectionEngine();
  });

  test("should detect suspicious http link", () => {
    const result = engine.analyze(
      "Visit http://malicious-site.com now"
    );

    expect(result.isSuspicious).toBe(true);
    expect(result.matchedPatterns).toContain("http");
  });

  test("should detect bit.ly link", () => {
    const result = engine.analyze(
      "Click bit.ly/free-money"
    );

    expect(result.isSuspicious).toBe(true);
    expect(result.matchedPatterns).toContain("bit.ly");
  });

  test("should detect loan keyword", () => {
    const result = engine.analyze(
      "Get instant loan approval"
    );

    expect(result.isSuspicious).toBe(true);
    expect(result.matchedPatterns).toContain("loan");
  });

  test("should detect win keyword", () => {
    const result = engine.analyze(
      "You win a free prize"
    );

    expect(result.isSuspicious).toBe(true);
    expect(result.matchedPatterns).toContain("win");
  });

  test("should allow safe content", () => {
    const result = engine.analyze(
      "Family dinner at 8 PM"
    );

    expect(result.isSuspicious).toBe(false);
    expect(result.matchedPatterns).toEqual([]);
  });
});
