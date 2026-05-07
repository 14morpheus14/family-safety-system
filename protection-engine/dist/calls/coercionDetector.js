"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoercionDetector = void 0;
class CoercionDetector {
    constructor() {
        this.coerciveBurstWindowMs = 5 * 60 * 1000;
        this.aggressiveRetryThreshold = 7;
        this.lateNightThreshold = 3;
    }
    analyze(currentCall, historicalCalls) {
        const signals = [];
        const relatedCalls = historicalCalls.filter((call) => call.phoneNumber ===
            currentCall.phoneNumber);
        const recentCalls = relatedCalls.filter((call) => currentCall.timestamp -
            call.timestamp <=
            this.coerciveBurstWindowMs);
        if (recentCalls.length >=
            this.aggressiveRetryThreshold) {
            signals.push({
                category: "aggressive-persistence",
                reason: "Aggressive repeated call persistence detected",
                score: 55,
                confidence: "high-confidence"
            });
        }
        const rejectedCalls = recentCalls.filter((call) => call.wasRejected);
        if (rejectedCalls.length >= 5) {
            signals.push({
                category: "post-rejection-escalation",
                reason: "Repeated retry escalation after rejection detected",
                score: 65,
                confidence: "critical-confidence"
            });
        }
        const unansweredCalls = recentCalls.filter((call) => !call.wasAnswered);
        if (unansweredCalls.length >= 6) {
            signals.push({
                category: "unanswered-pressure-pattern",
                reason: "Repeated unanswered pressure-calling behavior detected",
                score: 45,
                confidence: "high-confidence"
            });
        }
        const lateNightCalls = recentCalls.filter((call) => {
            const hour = new Date(call.timestamp).getHours();
            return (hour >= 0 &&
                hour <= 5);
        });
        if (lateNightCalls.length >=
            this.lateNightThreshold) {
            signals.push({
                category: "late-night-coercion",
                reason: "Late-night coercive retry behavior detected",
                score: 60,
                confidence: "high-confidence"
            });
        }
        const userLabels = currentCall
            .userTaggedCategories ||
            [];
        if (userLabels.includes("otp-coercion")) {
            signals.push({
                category: "otp-coercion",
                reason: "User-local OTP coercion label detected",
                score: 90,
                confidence: "critical-confidence"
            });
        }
        if (userLabels.includes("bank-impersonation")) {
            signals.push({
                category: "bank-impersonation",
                reason: "User-local bank impersonation label detected",
                score: 80,
                confidence: "critical-confidence"
            });
        }
        if (userLabels.includes("government-impersonation")) {
            signals.push({
                category: "government-impersonation",
                reason: "User-local authority impersonation label detected",
                score: 95,
                confidence: "critical-confidence"
            });
        }
        if (userLabels.includes("refund-scam")) {
            signals.push({
                category: "refund-scam",
                reason: "User-local refund scam label detected",
                score: 75,
                confidence: "high-confidence"
            });
        }
        if (userLabels.includes("remote-access-scam")) {
            signals.push({
                category: "remote-access-scam",
                reason: "User-local remote access scam label detected",
                score: 100,
                confidence: "critical-confidence"
            });
        }
        return signals;
    }
}
exports.CoercionDetector = CoercionDetector;
