export type EvidenceConfidence =
  | "low-confidence"
  | "medium-confidence"
  | "high-confidence"
  | "critical-confidence";

export interface RuleMatch {
  ruleId: string;
  category: string;
  severity: string;
  score: number;
  confidence: EvidenceConfidence;
  matchedText: string;
}

interface DetectionRule {
  ruleId: string;
  category: string;
  severity: string;
  score: number;
  confidence: EvidenceConfidence;
  pattern: RegExp;
}

interface AllowlistRule {
  ruleId: string;
  pattern: RegExp;
}

export class BasicRules {
  private readonly rules: DetectionRule[] = [
    {
      ruleId: "FINANCIAL_001",
      category: "financial",
      severity: "high",
      score: 25,
      confidence: "medium-confidence",
      pattern: /\bloan\b/i
    },
    {
      ruleId: "FINANCIAL_002",
      category: "financial",
      severity: "medium",
      score: 20,
      confidence: "low-confidence",
      pattern: /\bcredit\b/i
    },
    {
      ruleId: "PHISHING_001",
      category: "phishing",
      severity: "high",
      score: 30,
      confidence: "medium-confidence",
      pattern: /\bverify\b/i
    },
    {
      ruleId: "PHISHING_002",
      category: "phishing",
      severity: "high",
      score: 40,
      confidence: "high-confidence",
      pattern: /\botp\b/i
    },
    {
      ruleId: "PHISHING_003",
      category: "phishing",
      severity: "high",
      score: 35,
      confidence: "high-confidence",
      pattern: /\bpassword\b/i
    },
    {
      ruleId: "PHISHING_004",
      category: "phishing",
      severity: "critical",
      score: 50,
      confidence: "critical-confidence",
      pattern:
        /\bshare\s+otp\b/i
    },
    {
      ruleId: "PHISHING_005",
      category: "phishing",
      severity: "critical",
      score: 50,
      confidence: "critical-confidence",
      pattern:
        /\bverify\s+otp\b/i
    },
    {
      ruleId: "SCAM_001",
      category: "scam",
      severity: "high",
      score: 30,
      confidence: "medium-confidence",
      pattern: /\bwin(?:ner|nings)?\b/i
    },
    {
      ruleId: "SCAM_002",
      category: "scam",
      severity: "medium",
      score: 20,
      confidence: "low-confidence",
      pattern: /\bprize\b/i
    },
    {
      ruleId: "SCAM_003",
      category: "scam",
      severity: "medium",
      score: 25,
      confidence: "medium-confidence",
      pattern: /\bfree\b/i
    },
    {
      ruleId: "SCAM_004",
      category: "scam",
      severity: "high",
      score: 25,
      confidence: "medium-confidence",
      pattern: /\burgent\b/i
    },
    {
      ruleId: "SCAM_005",
      category: "scam",
      severity: "high",
      score: 25,
      confidence: "medium-confidence",
      pattern: /\bclick\b/i
    },
    {
      ruleId: "SCAM_008",
      category: "scam",
      severity: "high",
      score: 35,
      confidence: "high-confidence",
      pattern:
        /\bgiveaway\b/i
    },
    {
      ruleId: "BANKING_001",
      category: "banking",
      severity: "high",
      score: 25,
      confidence: "medium-confidence",
      pattern: /\baccount\b/i
    },
    {
      ruleId: "BANKING_002",
      category: "banking",
      severity: "high",
      score: 25,
      confidence: "high-confidence",
      pattern: /\bsuspended\b/i
    },
    {
      ruleId: "BANKING_003",
      category: "banking",
      severity: "high",
      score: 35,
      confidence: "high-confidence",
      pattern:
        /\bverify\s+your\s+account\b/i
    },
    {
      ruleId: "BANKING_004",
      category: "banking",
      severity: "high",
      score: 35,
      confidence: "high-confidence",
      pattern:
        /\baccount\s+password\b/i
    },
    {
      ruleId: "CRYPTO_001",
      category: "crypto",
      severity: "medium",
      score: 20,
      confidence: "medium-confidence",
      pattern: /\bcrypto\b/i
    },
    {
      ruleId: "CRYPTO_002",
      category: "crypto",
      severity: "medium",
      score: 20,
      confidence: "medium-confidence",
      pattern: /\bbtc\b/i
    },
    {
      ruleId: "SOCIAL_001",
      category: "social-engineering",
      severity: "high",
      score: 35,
      confidence: "high-confidence",
      pattern:
        /\bimmediately\b/i
    },
    {
      ruleId: "SOCIAL_002",
      category: "social-engineering",
      severity: "high",
      score: 35,
      confidence: "high-confidence",
      pattern:
        /\baction\s+required\b/i
    },
    {
      ruleId: "SOCIAL_003",
      category: "social-engineering",
      severity: "high",
      score: 30,
      confidence: "medium-confidence",
      pattern:
        /\bwithin\s+24\s+hours\b/i
    },
    {
      ruleId: "SOCIAL_004",
      category: "social-engineering",
      severity: "high",
      score: 30,
      confidence: "medium-confidence",
      pattern:
        /\bact\s+now\b/i
    },
    {
      ruleId: "APK_001",
      category: "apk-threat",
      severity: "critical",
      score: 60,
      confidence: "critical-confidence",
      pattern:
        /\binstall\s+apk\b/i
    },
    {
      ruleId: "APK_002",
      category: "apk-threat",
      severity: "critical",
      score: 60,
      confidence: "critical-confidence",
      pattern:
        /\bunknown\s+sources\b/i
    },
    {
      ruleId: "APK_003",
      category: "apk-threat",
      severity: "critical",
      score: 50,
      confidence: "high-confidence",
      pattern:
        /\bsideload\b/i
    },
    {
      ruleId: "PHONE_001",
      category: "phone-scam",
      severity: "high",
      score: 35,
      confidence: "high-confidence",
      pattern:
        /\bcall\s+now\b/i
    },
    {
      ruleId: "PHONE_002",
      category: "phone-scam",
      severity: "high",
      score: 35,
      confidence: "high-confidence",
      pattern:
        /\bwhatsapp\s+now\b/i
    },
    {
      ruleId: "PHONE_003",
      category: "phone-scam",
      severity: "high",
      score: 40,
      confidence: "high-confidence",
      pattern:
        /\bcontact\s+immediately\b/i
    },
{
  ruleId: "LOGISTICS_001",
  category: "logistics",
  severity: "high",
  score: 25,
  confidence: "medium-confidence",
  pattern: /\bparcel\b/i
},
{
  ruleId: "LOGISTICS_002",
  category: "logistics",
  severity: "high",
  score: 25,
  confidence: "medium-confidence",
  pattern: /\bshipment\b/i
},
{
  ruleId: "LOGISTICS_003",
  category: "logistics",
  severity: "high",
  score: 25,
  confidence: "medium-confidence",
  pattern: /\bdelivery\b/i
},
{
  ruleId: "REFUND_001",
  category: "refund",
  severity: "high",
  score: 30,
  confidence: "medium-confidence",
  pattern: /\brefund\b/i
},
{
  ruleId: "REFUND_002",
  category: "refund",
  severity: "medium",
  score: 20,
  confidence: "low-confidence",
  pattern: /\bcashback\b/i
},
{
  ruleId: "REFUND_003",
  category: "refund",
  severity: "medium",
  score: 20,
  confidence: "low-confidence",
  pattern: /\breimbursement\b/i
},
{
  ruleId: "TELECOM_001",
  category: "telecom",
  severity: "high",
  score: 30,
  confidence: "medium-confidence",
  pattern: /\bsim\b/i
},
{
  ruleId: "TELECOM_002",
  category: "telecom",
  severity: "high",
  score: 25,
  confidence: "medium-confidence",
  pattern: /\btelecom\b/i
},
{
  ruleId: "TELECOM_003",
  category: "telecom",
  severity: "high",
  score: 25,
  confidence: "medium-confidence",
  pattern: /\bdeactivate\b/i
},
{
  ruleId: "AUTHORITY_001",
  category: "authority",
  severity: "critical",
  score: 35,
  confidence: "critical-confidence",
  pattern: /\bpolice\b/i
},
{
  ruleId: "AUTHORITY_002",
  category: "authority",
  severity: "critical",
  score: 35,
  confidence: "critical-confidence",
  pattern: /\barrest\b/i
},
{
  ruleId: "AUTHORITY_003",
  category: "authority",
  severity: "critical",
  score: 35,
  confidence: "critical-confidence",
  pattern: /\blegal action\b/i
},
{
  ruleId: "PAYMENT_001",
  category: "payment",
  severity: "high",
  score: 25,
  confidence: "high-confidence",
  pattern: /\bpayment failed\b/i
},
{
  ruleId: "PAYMENT_002",
  category: "payment",
  severity: "high",
  score: 25,
  confidence: "high-confidence",
  pattern: /\bpending payment\b/i
},
{
  ruleId: "REMOTE_001",
  category: "remote-access",
  severity: "critical",
  score: 40,
  confidence: "critical-confidence",
  pattern: /\bremote access\b/i
},
{
  ruleId: "REMOTE_002",
  category: "remote-access",
  severity: "critical",
  score: 40,
  confidence: "critical-confidence",
  pattern: /\bscreen share\b/i
},
{
  ruleId: "REMOTE_003",
  category: "remote-access",
  severity: "critical",
  score: 40,
  confidence: "critical-confidence",
  pattern: /\banydesk\b/i
},
{
  ruleId: "REMOTE_004",
  category: "remote-access",
  severity: "critical",
  score: 40,
  confidence: "critical-confidence",
  pattern: /\bteamviewer\b/i
},
{
  ruleId: "IMPERSONATION_001",
  category: "impersonation",
  severity: "high",
  score: 30,
  confidence: "high-confidence",
  pattern: /\brbi\b/i
},
{
  ruleId: "IMPERSONATION_002",
  category: "impersonation",
  severity: "high",
  score: 30,
  confidence: "high-confidence",
  pattern: /\bgov(?:ernment)? subsidy\b/i
},
{
  ruleId: "SCAM_006",
  category: "scam",
  severity: "high",
  score: 35,
  confidence: "high-confidence",
  pattern:
    /\bclaim\s+now\b/i
},
{
  ruleId: "SCAM_007",
  category: "scam",
  severity: "high",
  score: 35,
  confidence: "high-confidence",
  pattern:
    /\bwinner\s+selected\b/i
},
{
  ruleId: "PHISHING_006",
  category: "phishing",
  severity: "critical",
  score: 45,
  confidence: "critical-confidence",
  pattern:
    /\baccount\s+blocked\b/i
},
{
  ruleId: "PHISHING_007",
  category: "phishing",
  severity: "critical",
  score: 45,
  confidence: "critical-confidence",
  pattern:
    /\baccount\s+frozen\b/i
},
{
  ruleId: "PHISHING_008",
  category: "phishing",
  severity: "critical",
  score: 45,
  confidence: "critical-confidence",
  pattern:
    /\bverify\s+kyc\b/i
},
{
  ruleId: "APK_004",
  category: "apk-threat",
  severity: "critical",
  score: 70,
  confidence: "critical-confidence",
  pattern:
    /\binstall\s+.*apk\b/i
},
{
  ruleId: "IDENTITY_001",
  category: "identity-threat",
  severity: "high",
  score: 40,
  confidence: "high-confidence",
  pattern:
    /\bverification\s+required\b/i
},
{
  ruleId: "IDENTITY_002",
  category: "identity-threat",
  severity: "high",
  score: 45,
  confidence: "high-confidence",
  pattern:
    /\bconfirm\s+identity\b/i
},
{
  ruleId: "IDENTITY_003",
  category: "identity-threat",
  severity: "critical",
  score: 55,
  confidence: "critical-confidence",
  pattern:
    /\bupdate\s+pan\b/i
},
{
  ruleId: "IDENTITY_004",
  category: "identity-threat",
  severity: "critical",
  score: 60,
  confidence: "critical-confidence",
  pattern:
    /\bkyc\s+expired\b/i
},
{
  ruleId: "IDENTITY_005",
  category: "identity-threat",
  severity: "critical",
  score: 55,
  confidence: "critical-confidence",
  pattern:
    /\bbanking\s+verification\b/i
},
{
  ruleId: "IDENTITY_006",
  category: "identity-threat",
  severity: "high",
  score: 45,
  confidence: "high-confidence",
  pattern:
    /\bverification\s+pending\b/i
},
{
  ruleId: "REMOTE_001",
  category: "remote-access-threat",
  severity: "critical",
  score: 70,
  confidence: "critical-confidence",
  pattern:
    /\bshare\s+screen\b/i
},
{
  ruleId: "REMOTE_002",
  category: "remote-access-threat",
  severity: "critical",
  score: 75,
  confidence: "critical-confidence",
  pattern:
    /\baccessibility\s+permissions\b/i
},
{
  ruleId: "REMOTE_003",
  category: "remote-access-threat",
  severity: "critical",
  score: 65,
  confidence: "critical-confidence",
  pattern:
    /\bunknown\s+source\b/i
},
{
  ruleId: "REMOTE_004",
  category: "remote-access-threat",
  severity: "critical",
  score: 65,
  confidence: "critical-confidence",
  pattern:
    /\bremote\s+support\b/i
},
{
  ruleId: "WALLET_001",
  category: "wallet-threat",
  severity: "critical",
  score: 80,
  confidence: "critical-confidence",
  pattern:
    /\bseed\s+phrase\b/i
},
{
  ruleId: "WALLET_002",
  category: "wallet-threat",
  severity: "critical",
  score: 80,
  confidence: "critical-confidence",
  pattern:
    /\brecovery\s+phrase\b/i
},
{
  ruleId: "WALLET_003",
  category: "wallet-threat",
  severity: "critical",
  score: 70,
  confidence: "critical-confidence",
  pattern:
    /\bwallet\s+compromised\b/i
},
{
  ruleId: "WALLET_004",
  category: "wallet-threat",
  severity: "critical",
  score: 65,
  confidence: "critical-confidence",
  pattern:
    /\bwallet\s+synchronization\b/i
},
{
  ruleId: "WALLET_005",
  category: "wallet-threat",
  severity: "critical",
  score: 85,
  confidence: "critical-confidence",
  pattern:
    /\bimport\s+crypto\s+wallet\b/i
},
{
  ruleId: "MALWARE_001",
  category: "malware-threat",
  severity: "critical",
  score: 70,
  confidence: "critical-confidence",
  pattern:
    /\bopen\s+attachment\b/i
},
{
  ruleId: "MALWARE_002",
  category: "malware-threat",
  severity: "critical",
  score: 75,
  confidence: "critical-confidence",
  pattern:
    /\bsecurity\s+patch\b/i
},
{
  ruleId: "MALWARE_003",
  category: "malware-threat",
  severity: "critical",
  score: 75,
  confidence: "critical-confidence",
  pattern:
    /\banti-virus\s+setup\b/i
},
{
  ruleId: "MALWARE_004",
  category: "malware-threat",
  severity: "critical",
  score: 70,
  confidence: "critical-confidence",
  pattern:
    /\binstall\s+cleaner\b/i
},
{
  ruleId: "PAYMENT_003",
  category: "payment-threat",
  severity: "high",
  score: 50,
  confidence: "high-confidence",
  pattern:
    /\bcustoms\s+fee\b/i
},
{
  ruleId: "PAYMENT_004",
  category: "payment-threat",
  severity: "high",
  score: 50,
  confidence: "high-confidence",
  pattern:
    /\bemi\s+overdue\b/i
},
{
  ruleId: "PAYMENT_005",
  category: "payment-threat",
  severity: "high",
  score: 45,
  confidence: "medium-confidence",
  pattern:
    /\brecharge\s+available\b/i
},
{
  ruleId: "VERIFY_001",
  category: "verification-threat",
  severity: "high",
  score: 55,
  confidence: "high-confidence",
  pattern:
    /\bsend\s+verification\s+code\b/i
},
{
  ruleId: "VERIFY_002",
  category: "verification-threat",
  severity: "critical",
  score: 70,
  confidence: "critical-confidence",
  pattern:
    /\bcomplete\s+verification\b/i
},
{
  ruleId: "VERIFY_003",
  category: "verification-threat",
  severity: "critical",
  score: 65,
  confidence: "critical-confidence",
  pattern:
    /\bmandatory\s+telecom\s+verification\b/i
},
{
  ruleId: "VERIFY_004",
  category: "verification-threat",
  severity: "critical",
  score: 70,
  confidence: "critical-confidence",
  pattern:
    /\bupdate\s+mobile\s+banking\s+credentials\b/i
},
{
  ruleId: "VERIFY_005",
  category: "verification-threat",
  severity: "critical",
  score: 65,
  confidence: "critical-confidence",
  pattern:
    /\breset\s+transaction\s+pin\b/i
},
{
  ruleId: "CRYPTO_010",
  category: "crypto-threat",
  severity: "critical",
  score: 75,
  confidence: "critical-confidence",
  pattern:
    /\bcrypto\s+investment\b/i
},
{
  ruleId: "CRYPTO_011",
  category: "crypto-threat",
  severity: "critical",
  score: 80,
  confidence: "critical-confidence",
  pattern:
    /\bguaranteed\s+returns\b/i
},
{
  ruleId: "CRYPTO_012",
  category: "crypto-threat",
  severity: "critical",
  score: 80,
  confidence: "critical-confidence",
  pattern:
    /\bfree\s+nft\s+mint\b/i
},
{
  ruleId: "CRYPTO_013",
  category: "crypto-threat",
  severity: "critical",
  score: 75,
  confidence: "critical-confidence",
  pattern:
    /\bwallet\s+breach\s+detected\b/i
},
{
  ruleId: "MALWARE_010",
  category: "malware-threat",
  severity: "critical",
  score: 80,
  confidence: "critical-confidence",
  pattern:
    /\bdownload\s+invoice\.js\b/i
},
{
  ruleId: "MALWARE_011",
  category: "malware-threat",
  severity: "critical",
  score: 80,
  confidence: "critical-confidence",
  pattern:
    /\bdownload\s+secure\s+patch\.bat\b/i
},
{
  ruleId: "MALWARE_012",
  category: "malware-threat",
  severity: "critical",
  score: 80,
  confidence: "critical-confidence",
  pattern:
    /\banti-virus\s+setup\.exe\b/i
},
{
  ruleId: "MALWARE_013",
  category: "malware-threat",
  severity: "critical",
  score: 75,
  confidence: "critical-confidence",
  pattern:
    /\bupdate\s+browser\s+extension\b/i
},
{
  ruleId: "MALWARE_014",
  category: "malware-threat",
  severity: "critical",
  score: 75,
  confidence: "critical-confidence",
  pattern:
    /\bchrome\s+security\s+update\b/i
},
{
  ruleId: "REMOTE_010",
  category: "remote-access-threat",
  severity: "critical",
  score: 85,
  confidence: "critical-confidence",
  pattern:
    /\binstall\s+accessibility\s+helper\b/i
},
{
  ruleId: "SOCIAL_001",
  category: "social-engineering",
  severity: "high",
  score: 60,
  confidence: "high-confidence",
  pattern:
    /\bclaim\s+educational\s+subsidy\b/i
},
{
  ruleId: "SOCIAL_002",
  category: "social-engineering",
  severity: "high",
  score: 60,
  confidence: "high-confidence",
  pattern:
    /\bcovid\s+relief\s+fund\b/i
},
{
  ruleId: "SOCIAL_003",
  category: "social-engineering",
  severity: "high",
  score: 65,
  confidence: "high-confidence",
  pattern:
    /\bmedical\s+insurance\s+activation\b/i
},
{
  ruleId: "SOCIAL_004",
  category: "social-engineering",
  severity: "high",
  score: 60,
  confidence: "high-confidence",
  pattern:
    /\bimmigration\s+issue\b/i
},
{
  ruleId: "MALWARE_020",
  category: "dangerous-file",
  severity: "critical",
  score: 85,
  confidence: "critical-confidence",
  pattern:
    /\banti-?virus\s+setup\.exe\b/i
},
{
  ruleId: "BANK_020",
  category: "banking",
  severity: "high",
  score: 65,
  confidence: "high-confidence",
  pattern:
    /\bsecure\s+banking\s+shield\b/i
}
  ];

  private readonly allowlistRules:
    AllowlistRule[] = [
    {
      ruleId: "ALLOWLIST_001",
      pattern:
        /\baccount\s+statement\b/i
    },
    {
      ruleId: "ALLOWLIST_002",
      pattern:
        /\bmonthly\s+statement\b/i
    },
    {
      ruleId: "ALLOWLIST_003",
      pattern:
        /\bfamily\s+dinner\b/i
    },
    {
      ruleId: "ALLOWLIST_004",
      pattern:
        /\bvacation\b/i
    },
    {
      ruleId: "ALLOWLIST_005",
      pattern:
        /\byour\s+otp\s+for\s+swiggy\b/i
    },
    {
      ruleId: "ALLOWLIST_006",
      pattern:
        /\byour\s+otp\s+for\s+zomato\b/i
    },
    {
      ruleId: "ALLOWLIST_007",
      pattern:
        /\byour\s+otp\s+for\s+uber\b/i
    },
    {
      ruleId: "ALLOWLIST_008",
      pattern:
        /\blogin\s+otp\b/i
    },
    {
      ruleId: "ALLOWLIST_009",
      pattern:
        /\bdelivery\s+partner\b/i
    },
    {
      ruleId: "ALLOWLIST_010",
      pattern:
        /\border\s+confirmation\b/i
    }
  ];

  public evaluate(
    content: string
  ): RuleMatch[] {
    if (
      this.isAllowlisted(content)
    ) {
      return [];
    }

    const matches: RuleMatch[] = [];

    for (const rule of this.rules) {
      const result =
        content.match(rule.pattern);

      if (result) {
        matches.push({
          ruleId: rule.ruleId,
          category: rule.category,
          severity: rule.severity,
          score: rule.score,
          confidence:
            rule.confidence,
          matchedText: result[0]
        });
      }
    }

    return matches;
  }

  private isAllowlisted(
    content: string
  ): boolean {
    for (const rule of this.allowlistRules) {
      if (
        rule.pattern.test(content)
      ) {
        return true;
      }
    }

    return false;
  }

  public calculateRiskScore(
    matches: RuleMatch[]
  ): number {
    return matches.reduce(
      (total, match) =>
        total + match.score,
      0
    );
  }

  public containsBlockedKeyword(
    content: string
  ): boolean {
    return (
      this.evaluate(content)
        .length > 0
    );
  }
}
