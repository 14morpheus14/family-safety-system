import {
  CallAnalyzer
} from "../../src/calls/callAnalyzer";

describe(
  "Robocall Corpus",
  () => {
    test(
      "detects deterministic robocall cadence",
      () => {
        const analyzer =
          new CallAnalyzer();

        const baseTimestamp =
          Date.now();

        for (
          let i = 0;
          i < 12;
          i++
        ) {
          analyzer.analyzeCall({
            phoneNumber:
              "+918888888888",
            timestamp:
              baseTimestamp +
              i * 30000,
            durationSeconds: 2,
            wasRejected: true,
            wasAnswered: false
          });
        }

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+918888888888",
            timestamp:
              baseTimestamp +
              360000,
            durationSeconds: 2,
            wasRejected: true,
            wasAnswered: false
          });

        expect(
          result.categories
        ).toContain(
          "automated-cadence-pattern"
        );

        expect(
          result.severity
        ).not.toBe("safe");
      }
    );

    test(
      "detects unanswered persistence escalation",
      () => {
        const analyzer =
          new CallAnalyzer();

        const baseTimestamp =
          Date.now();

        for (
          let i = 0;
          i < 9;
          i++
        ) {
          analyzer.analyzeCall({
            phoneNumber:
              "+917777777777",
            timestamp:
              baseTimestamp +
              i * 15000,
            durationSeconds: 3,
            wasRejected: false,
            wasAnswered: false
          });
        }

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+917777777777",
            timestamp:
              baseTimestamp +
              200000,
            durationSeconds: 2,
            wasRejected: false,
            wasAnswered: false
          });

        expect(
          result.categories
        ).toContain(
          "persistent-unanswered-calling"
        );

        expect(
          result.riskScore
        ).toBeGreaterThan(80);
      }
    );

    test(
      "detects repeated retry cadence",
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
              "+916666666666",
            timestamp:
              baseTimestamp +
              i * 12000,
            durationSeconds: 1,
            wasRejected: true,
            wasAnswered: false
          });
        }

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+916666666666",
            timestamp:
              baseTimestamp +
              180000,
            durationSeconds: 1,
            wasRejected: true,
            wasAnswered: false
          });

        expect(
          result.categories
        ).toContain(
          "repeated-retry-cadence"
        );

        expect(
          result.categories
        ).toContain(
          "robocall-burst-pattern"
        );
      }
    );

    test(
      "produces forensic explanations",
      () => {
        const analyzer =
          new CallAnalyzer();

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+915555555555",
            timestamp:
              Date.now(),
            durationSeconds: 2,
            wasRejected: true,
            wasAnswered: false,
            userTaggedCategories: [
              "suspicious"
            ]
          });

        expect(
          result.explanations
            .length
        ).toBeGreaterThan(0);

        expect(
          result.forensic
            .evidence.length
        ).toBeGreaterThan(0);

        expect(
          result.forensic
            .verdict.summary
        ).toContain(
          "suspicious"
        );
      }
    );
  }
);
