"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehavioralCallMemory = void 0;
class BehavioralCallMemory {
    constructor() {
        this.calls = [];
        this.retentionWindowMs = 7 * 24 * 60 * 60 * 1000;
    }
    recordCall(call) {
        this.calls.push(call);
        this.pruneExpiredCalls();
    }
    getCallsForNumber(phoneNumber) {
        this.pruneExpiredCalls();
        return this.calls.filter((call) => call.phoneNumber ===
            phoneNumber);
    }
    getRecentCalls(windowMs) {
        this.pruneExpiredCalls();
        const now = Date.now();
        return this.calls.filter((call) => now - call.timestamp <=
            windowMs);
    }
    getAllCalls() {
        this.pruneExpiredCalls();
        return [...this.calls];
    }
    getCallsByPrefix(prefix) {
        this.pruneExpiredCalls();
        return this.calls.filter((call) => call.phoneNumber.startsWith(prefix));
    }
    getRejectedCallsForNumber(phoneNumber) {
        this.pruneExpiredCalls();
        return this.calls.filter((call) => call.phoneNumber ===
            phoneNumber &&
            call.wasRejected);
    }
    getShortDurationCalls(maxDurationSeconds) {
        this.pruneExpiredCalls();
        return this.calls.filter((call) => call.durationSeconds <=
            maxDurationSeconds);
    }
    getBurstCalls(phoneNumber, burstWindowMs) {
        this.pruneExpiredCalls();
        const now = Date.now();
        return this.calls.filter((call) => call.phoneNumber ===
            phoneNumber &&
            now - call.timestamp <=
                burstWindowMs);
    }
    clear() {
        this.calls.length = 0;
    }
    pruneExpiredCalls() {
        const now = Date.now();
        const retainedCalls = this.calls.filter((call) => now - call.timestamp <=
            this.retentionWindowMs);
        this.calls.length = 0;
        this.calls.push(...retainedCalls);
    }
}
exports.BehavioralCallMemory = BehavioralCallMemory;
