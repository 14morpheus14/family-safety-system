import { BasicRules } from "../rules/basicRules";
import { UrlScanner } from "../scanners/urlScanner";
import { EventBus } from "../events/eventBus";
import { Logger } from "../utils/logger";

export interface DetectionResult {
  isSuspicious: boolean;
  matchedPatterns: string[];
}

export class DetectionEngine {
  private readonly rules: BasicRules;
  private readonly scanner: UrlScanner;
  private readonly eventBus: EventBus;
  private readonly logger: Logger;

  constructor() {
    this.rules = new BasicRules();
    this.scanner = new UrlScanner();
    this.eventBus = new EventBus();
    this.logger = new Logger();
  }

  public analyze(content: string): DetectionResult {
    const matchedPatterns = this.scanner.scan(content);

    const keywordDetected =
      this.rules.containsBlockedKeyword(content);

    const isSuspicious =
      matchedPatterns.length > 0 || keywordDetected;

    if (isSuspicious) {
      this.logger.info("Suspicious content detected");
      this.eventBus.emitThreatDetected(content);
    }

    return {
      isSuspicious,
      matchedPatterns
    };
  }

  public getEventBus(): EventBus {
    return this.eventBus;
  }
}
