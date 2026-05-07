import {
  BasicRules,
  RuleMatch,
  EvidenceConfidence
} from "../rules/basicRules";

import {
  UrlScanner,
  UrlScanMatch
} from "../scanners/urlScanner";

import { EventBus } from "../events/eventBus";
import { Logger } from "../utils/logger";

export interface DetectionExplanation {
  engine?: string;
  source: string;
  reason: string;
  score: number;
}

export interface ForensicEvidence {
  type: string;
  value: string;
  confidence: string;
  score: number;
}

export interface ForensicSignal {
  category: string;
  reason: string;
  confidence: string;
}

export interface ForensicCorrelation {
  source: string;
  reason: string;
  score: number;
}

export interface ForensicSuppression {
  source: string;
  reason: string;
  scoreAdjustment: number;
}

export interface ForensicVerdict {
  severity: string;
  summary: string;
}

export interface ForensicAnalysis {
  rawEvidence: ForensicEvidence[];
  interpretedSignals: ForensicSignal[];
  correlations: ForensicCorrelation[];
  suppressions: ForensicSuppression[];
  verdict: ForensicVerdict;
}

export interface DetectionResult {
  isSuspicious: boolean;
  matchedPatterns: string[];
  riskScore: number;
  categories: string[];
  severity: string;
  explanations: DetectionExplanation[];
  forensic: ForensicAnalysis;
}

interface CorrelationRule {
  categories: string[];
  score: number;
  reason: string;
}

interface BehavioralEvent {
  timestamp: number;
  sender?: string;
  categories: string[];
  score: number;
}

interface ConversationState {
  sender: string;
  stages: string[];
  lastUpdated: number;
}

interface AnalyzeOptions {
  sender?: string;
}

export class DetectionEngine {
  private readonly rules: BasicRules;
  private readonly scanner: UrlScanner;
  private readonly eventBus: EventBus;
  private readonly logger: Logger;

  private readonly suspiciousThreshold: number = 40;

  private readonly behavioralWindowMs =
    10 * 60 * 1000;

  private readonly conversationWindowMs =
    30 * 60 * 1000;

  private readonly behavioralEvents:
    BehavioralEvent[] = [];

  private readonly conversationStates:
    ConversationState[] = [];

  private readonly trustedSenders:
    string[] = [
    "uber",
    "zomato",
    "swiggy",
    "amazon",
    "hdfc",
    "icici",
    "sbi",
    "axisbank",
    "flipkart"
  ];

  private readonly confidenceWeights:
    Record<
      EvidenceConfidence,
      number
    > = {
      "low-confidence": 0.5,
      "medium-confidence": 1,
      "high-confidence": 1.5,
      "critical-confidence": 2
    };

  private readonly maliciousImperatives:
    RegExp[] = [
    /\bshare\s+otp\b/i,
    /\bverify\s+account\b/i,
    /\binstall\s+apk\b/i,
    /\bclick\s+link\b/i,
    /\blogin\s+now\b/i,
    /\bact\s+now\b/i
  ];

  private readonly compoundThreatRules: {
  patterns: RegExp[];
  bonus: number;
  reason: string;
}[] = [
  {
    patterns: [
      /\botp\b/i,
      /\bcvv\b/i
    ],
    bonus: 60,
    reason:
      "Credential theft compound pattern"
  },
  {
    patterns: [
      /\bapk\b/i,
      /\binstall\b/i
    ],
    bonus: 70,
    reason:
      "APK installation compound threat"
  },
  {
    patterns: [
      /\bcrypto\b/i,
      /\btransfer\b/i
    ],
    bonus: 55,
    reason:
      "Crypto transfer scam pattern"
  },
  {
    patterns: [
      /\bverify\b/i,
      /\baccount\b/i
    ],
    bonus: 45,
    reason:
      "Account verification phishing pattern"
  },
  {
    patterns: [
      /\burgent\b/i,
      /\bclick\b/i
    ],
    bonus: 40,
    reason:
      "Urgent click coercion pattern"
  },
  {
    patterns: [
      /\bpassword\b/i,
      /\breset\b/i
    ],
    bonus: 50,
    reason:
      "Password reset phishing pattern"
  },
  {
    patterns: [
      /\bremote\b/i,
      /\baccess\b/i
    ],
    bonus: 80,
    reason:
      "Remote access takeover pattern"
  },
  {
  patterns: [
    /\bcrypto\b/i,
    /\b(giveaway|free|reward|bonus)\b/i
  ],
  bonus: 55,
  reason:
    "Crypto giveaway scam pattern"
},
{
  patterns: [
    /\b(win|winner|prize)\b/i,
    /\b(free|claim|reward)\b/i
  ],
  bonus: 45,
  reason:
    "Prize scam compound pattern"
},
{
  patterns: [
    /\bverify\b/i,
    /\b(password|otp|account)\b/i
  ],
  bonus: 60,
  reason:
    "Credential phishing compound pattern"
}
];

  private readonly protectiveAdvisories:
    RegExp[] = [
    /\bnever\s+share\s+otp\b/i,
    /\bdo\s+not\s+share\s+otp\b/i,
    /\bavoid\s+suspicious\s+links\b/i,
    /\bdo\s+not\s+install\s+apk\b/i,
    /\bignore\s+scam\b/i,
    /\bdo\s+not\s+click\b/i
  ];

  private readonly correlationRules:
    CorrelationRule[] = [
    {
      categories: [
        "phishing",
        "banking"
      ],
      score: 40,
      reason:
        "Banking credential phishing correlation detected"
    },
    {
      categories: [
        "phishing",
        "social-engineering"
      ],
      score: 35,
      reason:
        "Urgency-based phishing correlation detected"
    },
    {
      categories: [
        "apk-threat",
        "social-engineering"
      ],
      score: 45,
      reason:
        "APK social-engineering attack correlation detected"
    }
  ];

  private readonly escalationPatterns:
    {
      pattern: RegExp;
      score: number;
    }[] = [
    {
      pattern:
        /\b(account|bank|verify|otp)\b/i,
      score: 20
    },
    {
      pattern:
        /\b(click|urgent|immediately)\b/i,
      score: 15
    },
    {
      pattern:
        /\b(refund|cashback|reward)\b/i,
      score: 20
    },
    {
      pattern:
        /\b(apk|install|download)\b/i,
      score: 25
    },
    {
      pattern:
        /\b(police|arrest|legal)\b/i,
      score: 30
    },
    {
      pattern:
        /\b(parcel|delivery|shipment)\b/i,
      score: 15
    },
    {
  pattern:
    /\b(win|prize|reward)\b/i,
  score: 25
},
{
  pattern:
    /\b(otp|password|verify)\b/i,
  score: 30
},
{
  pattern:
    /\b(bit\.ly|tinyurl|goo\.gl)\b/i,
  score: 35
},
{
  pattern:
    /\b(suspended|blocked|deactivated)\b/i,
  score: 25
},
{
  pattern:
    /\bapk\b/i,
  score: 45
},
{
  pattern:
    /\bcvv\b/i,
  score: 45
},
{
  pattern:
    /\btransfer\b/i,
  score: 30
}
  ];

  constructor() {
    this.rules = new BasicRules();
    this.scanner = new UrlScanner();
    this.eventBus = new EventBus();
    this.logger = new Logger();
  }

  public analyze(
    content: string,
    options?: AnalyzeOptions
  ): DetectionResult {
    const normalizedContent =
      this.normalizeContent(content);

const trustedSender = Boolean(
  options?.sender &&
  this.trustedSenders.some(
    (entry) =>
      options.sender!
        .toLowerCase()
        .includes(entry)
  )
);

const trustedOperationalMessage =
  trustedSender &&
  (
    /\botp\b/i.test(content) ||
    /\bauthentication\b/i.test(content) ||
    /\blogin\b/i.test(content) ||
    /\bverification\s+code\b/i.test(content)
  )
  &&
  !/\bclick\b/i.test(content)
  &&
  !/\bhttp\b/i.test(content)
  &&
  !/\binstall\b/i.test(content)
  &&
  !/\bapk\b/i.test(content)
  &&
  !/\bremote\b/i.test(content)
  &&
  !/\bpassword\b/i.test(content)
  &&
  !/\bcvv\b/i.test(content)
  &&
  !/\bscreen\s*share\b/i.test(content)
  &&
  !/\bverify\s+account\b/i.test(content);

const benignOtpMessage =
  /\botp\b/i.test(content)
  &&
  /\blogin\b/i.test(content)
  &&
  !/\bshare\b/i.test(content)
  &&
  !/\bverify\b/i.test(content)
  &&
  !/\bclick\b/i.test(content)
  &&
  !/\bhttp\b/i.test(content)
  &&
  !/\binstall\b/i.test(content)
  &&
  !/\bapk\b/i.test(content)
  &&
  !/\bcvv\b/i.test(content);


console.log({
  trustedSender,
  trustedOperationalMessage,
  content
});

if (trustedOperationalMessage) {
  return {
    isSuspicious: false,
    matchedPatterns: [],
    riskScore: 0,
    categories: [],
    severity: "safe",
    explanations: [
      {
        source:
          "trusted-operational-engine",
        reason:
          "Trusted operational authentication message",
        score: -999
      }
    ],
    forensic: {
      rawEvidence: [],
      interpretedSignals: [
        {
          category:
            "trusted-operational",
          reason:
            "Trusted sender authentication workflow detected",
          confidence:
            "high-confidence"
        }
      ],
      correlations: [],
      suppressions: [
        {
          source:
            "trusted-operational-engine",
          reason:
            "Operational OTP suppression activated",
          scoreAdjustment:
            -999
        }
      ],
      verdict: {
        severity: "safe",
        summary:
          "Trusted operational message"
      }
    }
  };
}

const ruleMatches: RuleMatch[] =
  this.rules.evaluate(normalizedContent);

    const urlMatches: UrlScanMatch[] =
      this.scanner.evaluate(content);

    const matchedPatterns: string[] = [
      ...ruleMatches.map(
        (match) => match.matchedText
      ),
      ...urlMatches.map(
        (match) => match.value
      )
    ];

    const categories: string[] = [
      ...ruleMatches.map(
        (match) => match.category
      ),
      ...urlMatches.map(
        (match) => match.type
      )
    ];

    const uniqueCategories =
      [...new Set(categories)];

    const explanations:
      DetectionExplanation[] = [];

    const rawEvidence:
      ForensicEvidence[] = [];

    const interpretedSignals:
      ForensicSignal[] = [];

    const correlations:
      ForensicCorrelation[] = [];

    const suppressions:
      ForensicSuppression[] = [];

    for (const match of ruleMatches) {
      explanations.push({
        source: match.ruleId,
        reason:
          `Detected ${match.category} keyword: ${match.matchedText}`,
        score: match.score
      });

      rawEvidence.push({
        type: "rule-match",
        value: match.matchedText,
        confidence:
          match.confidence,
        score: match.score
      });

      interpretedSignals.push({
        category: match.category,
        reason:
          `Detected ${match.category} behavior`,
        confidence:
          match.confidence
      });
    }

    for (const match of urlMatches) {
      explanations.push({
        source: match.type,
        reason:
          `Detected ${match.type} indicator`,
        score: match.score
      });

      rawEvidence.push({
        type: "url-indicator",
        value: match.value,
        confidence:
          "high-confidence",
        score: match.score
      });

      interpretedSignals.push({
        category: match.type,
        reason:
          `Detected ${match.type} infrastructure`,
        confidence:
          "high-confidence"
      });
    }

    let confidenceDominantScore = 0;

    for (const match of ruleMatches) {
      const weightedScore =
        match.score *
        this.confidenceWeights[
          match.confidence
        ];

      confidenceDominantScore +=
        weightedScore;
    }

    for (const match of urlMatches) {
      confidenceDominantScore +=
        match.score;
    }

    let riskScore =
      Math.round(
        confidenceDominantScore
      );

        let escalationScore = 0;

    for (
      const escalation of
      this.escalationPatterns
    ) {
      if (
        escalation.pattern.test(
          normalizedContent
        )
      ) {
        escalationScore +=
          escalation.score;
      }
    }

    if (
  escalationScore > 0 &&
  !trustedOperationalMessage &&
  !benignOtpMessage
 ){
      riskScore +=
        escalationScore;

      correlations.push({
        source:
          "semantic-escalation-engine",
        reason:
          "Deterministic semantic escalation triggered",
        score:
          escalationScore
      });
    }

    for (
      const compoundRule of
      this.compoundThreatRules
    ) {
      const matched =
        compoundRule.patterns.every(
          (pattern) =>
            pattern.test(
              normalizedContent
            )
        );

      if (
  matched &&
  !trustedOperationalMessage
) {
        riskScore +=
          compoundRule.bonus;

        correlations.push({
          source:
            "compound-threat-engine",
          reason:
           compoundRule.reason,
          score:
            compoundRule.bonus
        });
      }
    }

    const semanticAdjustment =
      this.calculateSemanticPolarityAdjustment(
        normalizedContent,
        suppressions,
        correlations
      );

    riskScore +=
      semanticAdjustment;
    
    const benignAdjustment =
  this.calculateBenignContextAdjustment(
    normalizedContent
  );

riskScore +=
  benignAdjustment;

if (benignAdjustment < 0) {
  suppressions.push({
    source:
      "benign-context-engine",
    reason:
      "Benign contextual language detected",
    scoreAdjustment:
      benignAdjustment
  });

  explanations.push({
    engine:
      "benign-context-engine",
    source:
      "benign-context-engine",
    reason:
      "Benign contextual language detected",
    score:
      benignAdjustment
  });
}

    for (
      const correlationRule of
      this.correlationRules
    ) {
      const matched =
        correlationRule.categories.every(
          (category) =>
            uniqueCategories.includes(
              category
            )
        );

      if (matched) {
        riskScore +=
          correlationRule.score;

        correlations.push({
          source: "correlation-engine",
          reason:
            correlationRule.reason,
          score:
            correlationRule.score
        });
      }
    }

    const sequencingScore =
      this.calculateSequencingScore(
        normalizedContent,
        uniqueCategories,
        options?.sender
      );

    if (sequencingScore > 0) {
      riskScore +=
        sequencingScore;

      correlations.push({
          source: "correlation-engine",
        reason:
          "Adversarial multi-stage sequencing detected",
        score:
          sequencingScore
      });
    }

    const behavioralScore =
      this.calculateBehavioralScore(
        uniqueCategories,
        riskScore
      );

    if (
  behavioralScore > 0 &&
  !trustedOperationalMessage
) {
      riskScore +=
        behavioralScore;

      correlations.push({
        source: "behavioral-engine",
        reason:
          "Repeated suspicious behavioral pattern detected",
        score:
          behavioralScore
      });

      explanations.push({
        engine: "behavioral-engine",
        source:
          "behavioral-engine",
        reason:
          "Repeated suspicious behavioral pattern detected",
        score:
          behavioralScore
      });
    }

    const senderAdjustment =
      this.calculateSenderTrustAdjustment(
  options?.sender,
  uniqueCategories,
  trustedOperationalMessage
);

    if (senderAdjustment !== 0) {
      riskScore +=
        senderAdjustment;

      suppressions.push({
        source: "sender-trust-engine",
        reason:
          "Trusted sender legitimacy adjustment applied",
        scoreAdjustment:
          senderAdjustment
      });

      explanations.push({
        engine: "sender-trust-engine",
        source:
          "sender-trust-engine",
        reason:
          "Trusted sender legitimacy adjustment applied",
        score:
          senderAdjustment
      });
    }

    if (riskScore < 0) {
      riskScore = 0;
    }

    if (!trustedOperationalMessage) {
  this.recordBehavioralEvent(
    uniqueCategories,
    riskScore
  );
}


let severity =
  this.calculateSeverity(
    riskScore
  );


    const verdictSummary =
      this.generateVerdictSummary(
        severity,
        uniqueCategories
      );

    const forensic:
      ForensicAnalysis = {
      rawEvidence,
      interpretedSignals,
      correlations,
      suppressions,
      verdict: {
        severity,
        summary:
          verdictSummary
      }
    };

    const isSuspicious =
      severity !== "safe";

    if (isSuspicious) {
      this.logger.info(
        `Suspicious content detected with severity ${severity} and score ${riskScore}`
      );

      this.eventBus.emitThreatDetected(
        content
      );
    }

    return {
      isSuspicious,
      matchedPatterns:
        [...new Set(matchedPatterns)],
      riskScore,
      categories:
        uniqueCategories,
      severity,
      explanations,
      forensic
    };
  }

  private calculateBenignContextAdjustment(
  content: string
): number {
  const benignPatterns = [
    /updated successfully/i,
    /processed successfully/i,
    /generated successfully/i,
    /created successfully/i,
    /completed successfully/i,
    /salary credited/i,
    /bank statement/i,
    /meeting attendance/i,
    /lecture notes/i,
    /conference registration/i,
    /invoice for groceries/i,
    /travel itinerary/i,
    /gym membership/i,
    /presentation uploaded/i,
    /photos uploaded/i,
    /movie tonight/i,
    /family dinner/i,
    /class starts/i,
    /exam results/i,
    /electricity bill paid/i,
    /package shipped/i,
    /appointment confirmed/i,
    /research paper/i,
    /market analysis/i,
    /vacation starts/i
  ];

  let adjustment = 0;

  for (const pattern of benignPatterns) {
    if (pattern.test(content)) {
      adjustment -= 60;
    }
  }

  return adjustment;
}

  private calculateSemanticPolarityAdjustment(
    content: string,
    suppressions:
      ForensicSuppression[],
    correlations:
      ForensicCorrelation[]
  ): number {
    for (
      const advisory of
      this.protectiveAdvisories
    ) {
      if (
        advisory.test(content)
      ) {
        suppressions.push({
        source: "semantic-polarity-engine",
          reason:
            "Protective security advisory detected",
          scoreAdjustment:
            -60
        });

        return -30;
      }
    }

    for (
      const imperative of
      this.maliciousImperatives
    ) {
      if (
        imperative.test(content)
      ) {
        correlations.push({
          source: "correlation-engine",
          reason:
            "Malicious imperative instruction detected",
          score: 40
        });

        return 40;
      }
    }

    return 0;
  }

  private calculateSequencingScore(
    content: string,
    categories: string[],
    sender?: string
  ): number {
    if (!sender) {
      return 0;
    }

    const normalizedSender =
      sender.toLowerCase();

    const now = Date.now();

    const existingState =
      this.conversationStates.find(
        (state) =>
          state.sender ===
            normalizedSender &&
          now -
            state.lastUpdated <=
            this.conversationWindowMs
      );

    const stages: string[] = [];

    if (
      /\bhello\b|\bhi\b|\bdear\b/i.test(
        content
      )
    ) {
      stages.push(
        "trust-building"
      );
    }

    if (
      categories.includes(
        "social-engineering"
      )
    ) {
      stages.push("urgency");
    }

    if (
      categories.includes(
        "phishing"
      ) ||
      categories.includes(
        "banking"
      )
    ) {
      stages.push(
        "credential-targeting"
      );
    }

    if (
      categories.includes(
        "apk-threat"
      ) ||
      categories.includes(
        "dangerous-file"
      )
    ) {
      stages.push("payload-delivery");
    }

    if (!existingState) {
      this.conversationStates.push({
        sender:
          normalizedSender,
        stages,
        lastUpdated: now
      });

      return 0;
    }

    for (const stage of stages) {
      if (
        !existingState.stages.includes(
          stage
        )
      ) {
        existingState.stages.push(
          stage
        );
      }
    }

    existingState.lastUpdated =
      now;

    const progression =
      existingState.stages;

    if (
      progression.includes(
        "trust-building"
      ) &&
      progression.includes(
        "urgency"
      ) &&
      progression.includes(
        "credential-targeting"
      ) &&
      progression.includes(
        "payload-delivery"
      )
    ) {
      return 80;
    }

    if (
      progression.includes(
        "urgency"
      ) &&
      progression.includes(
        "credential-targeting"
      ) &&
      progression.includes(
        "payload-delivery"
      )
    ) {
      return 60;
    }

    if (
      progression.includes(
        "urgency"
      ) &&
      progression.includes(
        "credential-targeting"
      )
    ) {
      return 35;
    }

    return 0;
  }

  private generateVerdictSummary(
    severity: string,
    categories: string[]
  ): string {
    if (
      categories.includes(
        "apk-threat"
      )
    ) {
      return `${severity} APK delivery threat detected`;
    }

    if (
      categories.includes(
        "phishing"
      )
    ) {
      return `${severity} phishing activity detected`;
    }

    return `${severity} suspicious activity detected`;
  }

  private calculateSenderTrustAdjustment(
  sender: string | undefined,
  categories: string[],
  trustedOperationalMessage: boolean
): number {
    if (!sender) {
      return 0;
    }

    const normalizedSender =
      sender.toLowerCase();

    const trusted =
      this.trustedSenders.some(
        (entry) =>
          normalizedSender.includes(
            entry
          )
      );

    if (!trusted) {
      return 0;
    }

    const severeThreat =
      categories.includes(
        "apk-threat"
      ) ||
      categories.includes(
        "dangerous-file"
      );

    if (trustedOperationalMessage) {
  return 0;
}

if (severeThreat) {
  return 0;
}

return -80;
  }

  private calculateBehavioralScore(
    categories: string[],
    currentScore: number
  ): number {
    const now = Date.now();

    const recentEvents =
      this.behavioralEvents.filter(
        (event) =>
          now - event.timestamp <=
          this.behavioralWindowMs
      );

    let repeatedMatches = 0;

    for (const event of recentEvents) {
      const overlap =
        event.categories.some(
          (category) =>
            categories.includes(
              category
            )
        );

      if (overlap) {
        repeatedMatches++;
      }
    }

    if (
      repeatedMatches >= 5 &&
      currentScore >= 80
    ) {
      return 60;
    }

    if (
      repeatedMatches >= 3 &&
      currentScore >= 50
    ) {
      return 35;
    }

    return 0;
  }

  private recordBehavioralEvent(
    categories: string[],
    score: number
  ): void {
    const now = Date.now();

    this.behavioralEvents.push({
      timestamp: now,
      categories,
      score
    });

    const validEvents =
      this.behavioralEvents.filter(
        (event) =>
          now - event.timestamp <=
          this.behavioralWindowMs
      );

    this.behavioralEvents.length = 0;

    this.behavioralEvents.push(
      ...validEvents
    );
  }

  private calculateSeverity(
    score: number
  ): string {
    if (score >= 180) {
      return "critical";
    }

    if (score >= 120) {
      return "high-risk";
    }

    if (score >= 70) {
      return "suspicious";
    }

    if (score >= 40) {
      return "caution";
    }

    return "safe";
  }

  private normalizeContent(
    content: string
  ): string {
    let normalized =
      content.normalize("NFKC");

    normalized =
      normalized.toLowerCase();

    normalized =
      normalized
        .replace(/hxxp/gi, "http")
        .replace(/b1t/gi, "bit")
        .replace(/cvv/gi, "cvv")
        .replace(/0tp/gi, "otp")
        .replace(/crypt0/gi, "crypto")
        .replace(/tr4nsfer/gi, "transfer")
        .replace(/rew4rd/gi, "reward")
        .replace(/apk/gi, "apk")
        .replace(/cl1ck/gi, "click")
        .replace(/ver1fy/gi, "verify")
        .replace(/acc0unt/gi, "account")
        .replace(/pr1z3/gi, "prize")
        .replace(/crypt0/gi, "crypto")
        .replace(/\[dot\]/gi, ".")
        .replace(/\(dot\)/gi, ".")
        .replace(/\s*\.\s*/g, ".")
        .replace(/\s*\/\s*/g, "/");

    normalized =
      normalized
        .replace(/\bw1n\b/g, "win")
        .replace(/\bfr33\b/g, "free")
        .replace(/\bpr1z3\b/g, "prize")
        .replace(/\bcl1ck\b/g, "click")
        .replace(/\bv3r1fy\b/g, "verify")
        .replace(/\bacc0unt\b/g, "account")
        .replace(/\bcrypt0\b/g, "crypto")
        .replace(/\binst4ll\b/g, "install")
        .replace(/\bn0w\b/g, "now")
        .replace(/\b0tp\b/g, "otp");

    normalized =
      normalized
        .replace(/0/g, "o")
        .replace(/1/g, "i")
        .replace(/2/g, "z")
        .replace(/3/g, "e")
        .replace(/4/g, "a")
        .replace(/5/g, "s")
        .replace(/6/g, "g")
        .replace(/7/g, "t")
        .replace(/8/g, "b")
        .replace(/9/g, "g")
        .replace(/\$/g, "s")
        .replace(/@/g, "a")
        .replace(/!/g, "i");

    normalized =
      normalized.replace(
        /(.)\1{2,}/g,
        "$1"
      );

    normalized =
      normalized.replace(
        /\s+/g,
        " "
      );

    normalized =
      normalized.replace(
        /[^a-z0-9.:/\s]/gi,
        ""
      );
      
    return normalized.trim();
  }

  public getEventBus(): EventBus {
    return this.eventBus;
  }
}
