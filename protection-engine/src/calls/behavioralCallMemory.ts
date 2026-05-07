import {
  CallMetadata
} from "./telecomFraudRules";

export class BehavioralCallMemory {
  private readonly calls:
    CallMetadata[] = [];

  private readonly retentionWindowMs =
    7 * 24 * 60 * 60 * 1000;

  public recordCall(
    call: CallMetadata
  ): void {
    this.calls.push(call);

    this.pruneExpiredCalls();
  }

  public getCallsForNumber(
    phoneNumber: string
  ): CallMetadata[] {
    this.pruneExpiredCalls();

    return this.calls.filter(
      (call) =>
        call.phoneNumber ===
        phoneNumber
    );
  }

  public getRecentCalls(
    windowMs: number
  ): CallMetadata[] {
    this.pruneExpiredCalls();

    const now = Date.now();

    return this.calls.filter(
      (call) =>
        now - call.timestamp <=
        windowMs
    );
  }

  public getAllCalls():
    CallMetadata[] {
    this.pruneExpiredCalls();

    return [...this.calls];
  }

  public getCallsByPrefix(
    prefix: string
  ): CallMetadata[] {
    this.pruneExpiredCalls();

    return this.calls.filter(
      (call) =>
        call.phoneNumber.startsWith(
          prefix
        )
    );
  }

  public getRejectedCallsForNumber(
    phoneNumber: string
  ): CallMetadata[] {
    this.pruneExpiredCalls();

    return this.calls.filter(
      (call) =>
        call.phoneNumber ===
          phoneNumber &&
        call.wasRejected
    );
  }

  public getShortDurationCalls(
    maxDurationSeconds: number
  ): CallMetadata[] {
    this.pruneExpiredCalls();

    return this.calls.filter(
      (call) =>
        call.durationSeconds <=
        maxDurationSeconds
    );
  }

  public getBurstCalls(
    phoneNumber: string,
    burstWindowMs: number
  ): CallMetadata[] {
    this.pruneExpiredCalls();

    const now = Date.now();

    return this.calls.filter(
      (call) =>
        call.phoneNumber ===
          phoneNumber &&
        now - call.timestamp <=
          burstWindowMs
    );
  }

  public clear(): void {
    this.calls.length = 0;
  }

  private pruneExpiredCalls():
    void {
    const now = Date.now();

    const retainedCalls =
      this.calls.filter(
        (call) =>
          now - call.timestamp <=
          this.retentionWindowMs
      );

    this.calls.length = 0;

    this.calls.push(
      ...retainedCalls
    );
  }
}
