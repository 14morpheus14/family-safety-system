import {
  CallAnalyzer
} from "../../src/calls/callAnalyzer";

describe(
  "Integrated Call Analyzer",
  () => {
    test(
      "escalates repeated malicious behavior",
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
              "+919191919191",
            timestamp:
              baseTimestamp +
              i * 10000,
            durationSeconds: 2,
            wasRejected: true,
            wasAnswered: false,
            userTaggedCategories: [
              "otp-coercion"
            ]
          });
        }

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+919191919191",
            timestamp:
              baseTimestamp +
              180000,
            durationSeconds: 2,
            wasRejected: true,
            wasAnswered: false,
            userTaggedCategories: [
              "otp-coercion"
            ]
          });

        expect(
          result.riskScore
        ).toBeGreaterThan(200);

        expect(
          result.severity
        ).toBe("critical");
      }
    );

    test(
      "maintains trusted caller suppression",
      () => {
        const analyzer =
          new CallAnalyzer();

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+918181818181",
            timestamp:
              Date.now(),
            durationSeconds: 180,
            wasRejected: false,
            wasAnswered: true,
            userTaggedCategories: [
              "family",
              "trusted"
            ]
          });

        expect(
          result.isSuspicious
        ).toBe(false);

        expect(
          result.riskScore
        ).toBe(0);
      }
    );

    test(
      "produces deterministic forensic correlations",
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
              "+917171717171",
            timestamp:
              baseTimestamp +
              i * 12000,
            durationSeconds: 2,
            wasRejected: true,
            wasAnswered: false,
            userTaggedCategories: [
              "remote-access-scam"
            ]
          });
        }

        const result =
          analyzer.analyzeCall({
            phoneNumber:
              "+917171717171",
            timestamp:
              baseTimestamp +
              200000,
            durationSeconds: 2,
            wasRejected: true,
            wasAnswered: false,
            userTaggedCategories: [
              "remote-access-scam"
            ]
          });

        expect(
          result.forensic
            .correlations.length
        ).toBeGreaterThan(0);

        expect(
          result.forensic
            .evidence.length
        ).toBeGreaterThan(0);

        expect(
          result.categories
        ).toContain(
          "remote-access-scam"
        );
      }
    );

    test(
      "detects spoof rotation escalation",
      () => {
        const analyzer =
          new CallAnalyzer();

        const baseTimestamp =
          Date.now();

        const numbers = [
          "+914444440001",
          "+914444440002",
          "+914444440003",
          "+914444440004",
          "+914444440005"
        ];

        for (
          let i = 0;
          i < numbers.length;
          i++
        ) {
          analyzer.analyzeCall({
            phoneNumber:
              numbers[i],
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
              "+914444440099",
            timestamp:
              baseTimestamp +
              120000,
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
          result.severity
        ).not.toBe("safe");
      }
    );
  }
);
