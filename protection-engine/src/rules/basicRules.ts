export interface RuleMatch {
  ruleId: string;
  category: string;
  severity: string;
  score: number;
  matchedText: string;
}

interface DetectionRule {
  ruleId: string;
  category: string;
  severity: string;
  score: number;
  pattern: RegExp;
}

export class BasicRules {
  private readonly rules: DetectionRule[] = [
    {
      ruleId: "FINANCIAL_001",
      category: "financial",
      severity: "high",
      score: 25,
      pattern: /\bloan\b/i
    },
    {
      ruleId: "FINANCIAL_002",
      category: "financial",
      severity: "medium",
      score: 20,
      pattern: /\bcredit\b/i
    },
    {
      ruleId: "PHISHING_001",
      category: "phishing",
      severity: "high",
      score: 30,
      pattern: /\bverify\b/i
    },
    {
      ruleId: "PHISHING_002",
      category: "phishing",
      severity: "high",
      score: 30,
      pattern: /\botp\b/i
    },
    {
      ruleId: "PHISHING_003",
      category: "phishing",
      severity: "high",
      score: 35,
      pattern: /\bpassword\b/i
    },
    {
      ruleId: "SCAM_001",
      category: "scam",
      severity: "high",
      score: 30,
      pattern: /\bwin(?:ner|nings)?\b/i
    },
    {
      ruleId: "SCAM_002",
      category: "scam",
      severity: "medium",
      score: 20,
      pattern: /\bprize\b/i
    },
    {
      ruleId: "SCAM_003",
      category: "scam",
      severity: "medium",
      score: 15,
      pattern: /\bfree\b/i
    },
    {
      ruleId: "SCAM_004",
      category: "scam",
      severity: "high",
      score: 25,
      pattern: /\burgent\b/i
    },
    {
      ruleId: "SCAM_005",
      category: "scam",
      severity: "high",
      score: 25,
      pattern: /\bclick\b/i
    },
    {
      ruleId: "BANKING_001",
      category: "banking",
      severity: "high",
      score: 30,
      pattern: /\bkcy\b/i
    },
    {
      ruleId: "BANKING_002",
      category: "banking",
      severity: "high",
      score: 25,
      pattern: /\baccount\b/i
    },
    {
      ruleId: "BANKING_003",
      category: "banking",
      severity: "high",
      score: 25,
      pattern: /\bsuspended\b/i
    },
    {
      ruleId: "CRYPTO_001",
      category: "crypto",
      severity: "medium",
      score: 20,
      pattern: /\bcrypto\b/i
    },
    {
      ruleId: "CRYPTO_002",
      category: "crypto",
      severity: "medium",
      score: 20,
      pattern: /\bbtc\b/i
    }
  ];

  public evaluate(content: string): RuleMatch[] {
    const matches: RuleMatch[] = [];

    for (const rule of this.rules) {
      const result = content.match(rule.pattern);

      if (result) {
        matches.push({
          ruleId: rule.ruleId,
          category: rule.category,
          severity: rule.severity,
          score: rule.score,
          matchedText: result[0]
        });
      }
    }

    return matches;
  }

  public calculateRiskScore(matches: RuleMatch[]): number {
    return matches.reduce(
      (total, match) => total + match.score,
      0
    );
  }

  public containsBlockedKeyword(content: string): boolean {
    return this.evaluate(content).length > 0;
  }
}
