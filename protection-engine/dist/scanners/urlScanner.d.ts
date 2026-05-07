export interface UrlScanMatch {
    type: string;
    value: string;
    score: number;
}
export declare class UrlScanner {
    private readonly suspiciousDomains;
    private readonly suspiciousExtensions;
    private readonly urlRegex;
    private readonly ipUrlRegex;
    private readonly punycodeRegex;
    extractUrls(content: string): string[];
    private calculateEntropyScore;
    scan(content: string): string[];
    evaluate(content: string): UrlScanMatch[];
    hasSuspiciousUrl(content: string): boolean;
}
