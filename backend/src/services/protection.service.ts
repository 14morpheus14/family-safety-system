export interface ScanResult {
  threat: boolean;
  reasons: string[];
}

const suspiciousKeywords = [
  "loan",
  "win",
  "free",
  "bit.ly",
  "http"
];

export const scanText = (
  text: string
): ScanResult => {
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
    reasons
  };
};
