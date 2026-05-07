import {
  ThreatVerdict
} from "../contracts/threat.contract";

const suspiciousKeywords = [
  "loan",
  "win",
  "free",
  "bit.ly",
  "http"
];

export const scanText = (
  text: string
): ThreatVerdict => {
  const reasons: string[] = [];

  const lowerText = text.toLowerCase();

  suspiciousKeywords.forEach((keyword) => {
    if (lowerText.includes(keyword)) {
      reasons.push(
        `Detected keyword: ${keyword}`
      );
    }
  });

  return {
    threat: reasons.length > 0,

    severity:
      reasons.length >= 3
        ? "high"
        : reasons.length > 0
        ? "medium"
        : "low",

    reasons,

    timestamp: new Date().toISOString()
  };
};
