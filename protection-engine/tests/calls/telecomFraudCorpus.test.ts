import {
  CallAnalyzer
} from "../../src/calls/callAnalyzer";

describe(
  "Telecom Fraud Corpus",
  () => {
    test(
      "detects government impersonation label",
      () => {
        const analyzer =
          new CallAnalyzer();

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+911100000001",
            timestamp:
              Date.now(),
            durationSeconds: 180,
            wasRejected: false,
            wasAnswered: true,
            userTaggedCategories: [
              "government-impersonation"
            ]
          });

        expect(
          result.categories
        ).toContain(
          "government-impersonation"
        );

        expect(
          result.severity
        ).toBe("high-risk");
      }
    );

    test(
      "detects otp coercion label",
      () => {
        const analyzer =
          new CallAnalyzer();

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+911100000002",
            timestamp:
              Date.now(),
            durationSeconds: 240,
            wasRejected: false,
            wasAnswered: true,
            userTaggedCategories: [
              "otp-coercion"
            ]
          });

        expect(
          result.categories
        ).toContain(
          "otp-coercion"
        );

        expect(
          result.riskScore
        ).toBeGreaterThan(80);
      }
    );

    test(
      "detects remote access scam label",
      () => {
        const analyzer =
          new CallAnalyzer();

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+911100000003",
            timestamp:
              Date.now(),
            durationSeconds: 300,
            wasRejected: false,
            wasAnswered: true,
            userTaggedCategories: [
              "remote-access-scam"
            ]
          });

        expect(
          result.categories
        ).toContain(
          "remote-access-scam"
        );

        expect(
          result.severity
        ).not.toBe("safe");
      }
    );

    test(
      "detects spoof-like rotating prefix behavior",
      () => {
        const analyzer =
          new CallAnalyzer();

        const baseTimestamp =
          Date.now();

        const rotatingNumbers = [
          "+911234560001",
          "+911234560002",
          "+911234560003",
          "+911234560004",
          "+911234560005"
        ];

        for (
          let i = 0;
          i < rotatingNumbers.length;
          i++
        ) {
          analyzer.analyzeCall({
            phoneNumber:
              rotatingNumbers[i],
            timestamp:
              baseTimestamp +
              i * 20000,
            durationSeconds: 3,
            wasRejected: true,
            wasAnswered: false
          });
        }

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+911234560099",
            timestamp:
              baseTimestamp +
              200000,
            durationSeconds: 2,
            wasRejected: true,
            wasAnswered: false
          });

        expect(
          result.categories
        ).toContain(
          "spoof-like-rotation"
        );

        expect(
          result.riskScore
        ).toBeGreaterThan(50);
      }
    );
  }
);
