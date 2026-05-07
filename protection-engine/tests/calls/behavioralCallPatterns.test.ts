import {
  CallAnalyzer
} from "../../src/calls/callAnalyzer";

describe(
  "Behavioral Call Pattern Detection",
  () => {
    test(
      "detects robocall burst behavior",
      () => {
        const analyzer =
          new CallAnalyzer();

        const baseTimestamp =
          Date.now();

        for (
          let i = 0;
          i < 10;
          i++
        ) {
          analyzer.analyzeCall({
            phoneNumber:
              "+911234567890",
            timestamp:
              baseTimestamp +
              i * 10000,
            durationSeconds: 2,
            wasRejected: true,
            wasAnswered: false
          });
        }

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+911234567890",
            timestamp:
              baseTimestamp +
              120000,
            durationSeconds: 2,
            wasRejected: true,
            wasAnswered: false
          });

        expect(
          result.isSuspicious
        ).toBe(true);

        expect(
          result.categories
        ).toContain(
          "robocall-burst-pattern"
        );

        expect(
          result.riskScore
        ).toBeGreaterThan(100);
      }
    );

    test(
      "detects coercive retry escalation",
      () => {
        const analyzer =
          new CallAnalyzer();

        const baseTimestamp =
          Date.now();

        for (
          let i = 0;
          i < 8;
          i++
        ) {
          analyzer.analyzeCall({
            phoneNumber:
              "+919876543210",
            timestamp:
              baseTimestamp +
              i * 15000,
            durationSeconds: 4,
            wasRejected: true,
            wasAnswered: false
          });
        }

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+919876543210",
            timestamp:
              baseTimestamp +
              150000,
            durationSeconds: 3,
            wasRejected: true,
            wasAnswered: false
          });

        expect(
          result.categories
        ).toContain(
          "post-rejection-escalation"
        );

        expect(
          result.severity
        ).not.toBe("safe");
      }
    );

    test(
      "suppresses trusted family caller",
      () => {
        const analyzer =
          new CallAnalyzer();

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+919999999999",
            timestamp:
              Date.now(),
            durationSeconds: 120,
            wasRejected: false,
            wasAnswered: true,
            userTaggedCategories: [
              "family"
            ]
          });

        expect(
          result.riskScore
        ).toBe(0);

        expect(
          result.severity
        ).toBe("safe");
      }
    );
  }
);
