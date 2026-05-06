export class BasicRules {
  private readonly blockedKeywords: string[] = [
    "loan",
    "win",
    "prize",
    "urgent",
    "click"
  ];

  public containsBlockedKeyword(content: string): boolean {
    const normalizedContent = content.toLowerCase();

    return this.blockedKeywords.some((keyword) =>
      normalizedContent.includes(keyword)
    );
  }
}
