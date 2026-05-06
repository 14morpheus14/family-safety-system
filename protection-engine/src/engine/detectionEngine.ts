import {
  BasicRules,
  RuleMatch
} from "../rules/basicRules";

import {
  UrlScanner,
  UrlScanMatch
} from "../scanners/urlScanner";

import { EventBus } from "../events/eventBus";
import { Logger } from "../utils/logger";

export interface DetectionResult {
  isSuspicious: boolean;
  matchedPatterns: string[];
  riskScore: number;
  categories: string[];
}

export class DetectionEngine {
  private readonly rules: BasicRules;
  private readonly scanner: UrlScanner;
  private readonly eventBus: EventBus;
  private readonly logger: Logger;

  private readonly suspiciousThreshold: number = 40;

  constructor() {
    this.rules = new BasicRules();
    this.scanner = new UrlScanner();
    this.eventBus = new EventBus();
    this.logger = new Logger();
  }

  public analyze(content: string): DetectionResult {
    const normalizedContent =
      this.normalizeContent(content);

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

    const ruleScore =
      this.rules.calculateRiskScore(
        ruleMatches
      );

    const urlScore =
      urlMatches.reduce(
        (total, match) =>
          total + match.score,
        0
      );

    const riskScore =
      ruleScore + urlScore;

    const isSuspicious =
      riskScore >=
      this.suspiciousThreshold;

    if (isSuspicious) {
      this.logger.info(
        `Suspicious content detected with score ${riskScore}`
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
        uniqueCategories
    };
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
        .replace(/0/g, "o")
        .replace(/1/g, "i")
        .replace(/3/g, "e")
        .replace(/4/g, "a")
        .replace(/5/g, "s")
        .replace(/7/g, "t")
        .replace(/\$/g, "s")
        .replace(/@/g, "a");

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

    return normalized.trim();
  }

  public getEventBus(): EventBus {
    return this.eventBus;
  }
}
