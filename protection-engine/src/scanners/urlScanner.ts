export class UrlScanner {
  private readonly suspiciousPatterns: string[] = [
    "http",
    "bit.ly",
    "loan",
    "win"
  ];

  public scan(content: string): string[] {
    const normalizedContent = content.toLowerCase();

    return this.suspiciousPatterns.filter((pattern) =>
      normalizedContent.includes(pattern)
    );
  }

  public hasSuspiciousUrl(content: string): boolean {
    return this.scan(content).length > 0;
  }
}
