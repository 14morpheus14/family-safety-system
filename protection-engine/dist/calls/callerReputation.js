"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallerReputation = void 0;
class CallerReputation {
    constructor() {
        this.entries = [];
        this.minimumScore = 0;
        this.maximumScore = 1000;
    }
    updateReputation(phoneNumber, signals, userLabels) {
        let entry = this.entries.find((existing) => existing.phoneNumber ===
            phoneNumber);
        if (!entry) {
            entry = {
                phoneNumber,
                reputationScore: 0,
                labels: [],
                suspiciousCallCount: 0,
                benignCallCount: 0,
                lastUpdated: Date.now()
            };
            this.entries.push(entry);
        }
        let adjustment = 0;
        for (const signal of signals) {
            adjustment += signal.score;
        }
        if (signals.length > 0) {
            entry.suspiciousCallCount += 1;
        }
        else {
            entry.benignCallCount += 1;
            adjustment -= 15;
        }
        if (userLabels) {
            for (const label of userLabels) {
                if (!entry.labels.includes(label)) {
                    entry.labels.push(label);
                }
                if (label === "trusted") {
                    adjustment -= 80;
                }
                if (label === "family") {
                    adjustment -= 100;
                }
                if (label === "delivery") {
                    adjustment -= 40;
                }
                if (label === "spam") {
                    adjustment += 80;
                }
                if (label ===
                    "robocall") {
                    adjustment += 90;
                }
                if (label ===
                    "otp-scam") {
                    adjustment += 120;
                }
                if (label ===
                    "government-impersonation") {
                    adjustment += 140;
                }
            }
        }
        entry.reputationScore +=
            adjustment;
        if (entry.reputationScore <
            this.minimumScore) {
            entry.reputationScore =
                this.minimumScore;
        }
        if (entry.reputationScore >
            this.maximumScore) {
            entry.reputationScore =
                this.maximumScore;
        }
        entry.lastUpdated =
            Date.now();
        return {
            ...entry
        };
    }
    getReputation(phoneNumber) {
        const entry = this.entries.find((existing) => existing.phoneNumber ===
            phoneNumber);
        if (!entry) {
            return null;
        }
        return {
            ...entry
        };
    }
    isKnownThreat(phoneNumber) {
        const entry = this.getReputation(phoneNumber);
        if (!entry) {
            return false;
        }
        return (entry.reputationScore >=
            300);
    }
    isKnownBenign(phoneNumber) {
        const entry = this.getReputation(phoneNumber);
        if (!entry) {
            return false;
        }
        return (entry.reputationScore <=
            20 &&
            entry.benignCallCount >= 3);
    }
    clear() {
        this.entries.length = 0;
    }
}
exports.CallerReputation = CallerReputation;
