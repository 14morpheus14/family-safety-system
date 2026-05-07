"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelecomFraudRules = void 0;
class TelecomFraudRules {
    constructor() {
        this.shortCallThreshold = 5;
        this.burstWindowMs = 3 * 60 * 1000;
        this.lateNightStartHour = 0;
        this.lateNightEndHour = 5;
        this.suspiciousRetryThreshold = 5;
        this.highBurstThreshold = 10;
        this.spoofRotationPrefixLength = 6;
    }
    evaluateCallPattern(currentCall, historicalCalls) {
        const signals = [];
        const relatedCalls = historicalCalls.filter((call) => call.phoneNumber ===
            currentCall.phoneNumber);
        const recentBurstCalls = relatedCalls.filter((call) => currentCall.timestamp -
            call.timestamp <=
            this.burstWindowMs);
        if (currentCall.durationSeconds > 0 &&
            currentCall.durationSeconds <=
                this.shortCallThreshold) {
            signals.push({
                category: "robocall-pattern",
                reason: "Repeated short-duration call behavior detected",
                score: 25,
                confidence: "medium-confidence"
            });
        }
        if (recentBurstCalls.length >=
            this.highBurstThreshold) {
            signals.push({
                category: "burst-calling",
                reason: "High-frequency burst calling behavior detected",
                score: 60,
                confidence: "critical-confidence"
            });
        }
        const rejectedRetryCalls = recentBurstCalls.filter((call) => call.wasRejected);
        if (rejectedRetryCalls.length >=
            this.suspiciousRetryThreshold) {
            signals.push({
                category: "coercive-retry-pattern",
                reason: "Persistent retry behavior after rejection detected",
                score: 50,
                confidence: "high-confidence"
            });
        }
        const callHour = new Date(currentCall.timestamp).getHours();
        if (callHour >=
            this.lateNightStartHour &&
            callHour <=
                this.lateNightEndHour &&
            recentBurstCalls.length >= 3) {
            signals.push({
                category: "late-night-persistence",
                reason: "Repeated late-night calling behavior detected",
                score: 45,
                confidence: "high-confidence"
            });
        }
        const rotatingPrefixCalls = historicalCalls.filter((call) => call.phoneNumber.slice(0, this
            .spoofRotationPrefixLength) ===
            currentCall.phoneNumber.slice(0, this
                .spoofRotationPrefixLength) &&
            call.phoneNumber !==
                currentCall.phoneNumber);
        if (rotatingPrefixCalls.length >= 4) {
            signals.push({
                category: "spoof-like-rotation",
                reason: "Rotating number-prefix behavior detected",
                score: 55,
                confidence: "high-confidence"
            });
        }
        if (currentCall.userTaggedCategories) {
            for (const tag of currentCall
                .userTaggedCategories) {
                if (tag ===
                    "remote-access-scam") {
                    signals.push({
                        category: "remote-access-scam",
                        reason: "User-local remote access scam label detected",
                        score: 80,
                        confidence: "critical-confidence"
                    });
                }
                if (tag ===
                    "otp-coercion") {
                    signals.push({
                        category: "otp-coercion",
                        reason: "User-local OTP coercion label detected",
                        score: 85,
                        confidence: "critical-confidence"
                    });
                }
                if (tag ===
                    "government-impersonation") {
                    signals.push({
                        category: "government-impersonation",
                        reason: "User-local authority impersonation label detected",
                        score: 90,
                        confidence: "critical-confidence"
                    });
                }
                if (tag ===
                    "robocall") {
                    signals.push({
                        category: "robocall",
                        reason: "User-local robocall label detected",
                        score: 65,
                        confidence: "high-confidence"
                    });
                }
            }
        }
        return signals;
    }
}
exports.TelecomFraudRules = TelecomFraudRules;
