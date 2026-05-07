"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallAnalyzer = void 0;
const behavioralCallMemory_1 = require("./behavioralCallMemory");
const callerReputation_1 = require("./callerReputation");
const coercionDetector_1 = require("./coercionDetector");
const robocallDetector_1 = require("./robocallDetector");
const telecomFraudRules_1 = require("./telecomFraudRules");
class CallAnalyzer {
    constructor() {
        this.memory =
            new behavioralCallMemory_1.BehavioralCallMemory();
        this.reputation =
            new callerReputation_1.CallerReputation();
        this.telecomFraudRules =
            new telecomFraudRules_1.TelecomFraudRules();
        this.robocallDetector =
            new robocallDetector_1.RobocallDetector();
        this.coercionDetector =
            new coercionDetector_1.CoercionDetector();
    }
    analyzeCall(call) {
        const historicalCalls = this.memory.getAllCalls();
        const signals = [];
        signals.push(...this
            .telecomFraudRules
            .evaluateCallPattern(call, historicalCalls));
        signals.push(...this
            .robocallDetector
            .analyze(call, historicalCalls));
        signals.push(...this
            .coercionDetector
            .analyze(call, historicalCalls));
        const reputationEntry = this.reputation
            .updateReputation(call.phoneNumber, signals, call
            .userTaggedCategories);
        this.memory.recordCall(call);
        const categories = [...new Set(signals.map((signal) => signal.category))];
        const explanations = [];
        const evidence = [];
        const correlations = [];
        let riskScore = 0;
        for (const signal of signals) {
            riskScore +=
                signal.score;
            explanations.push({
                source: signal.category,
                reason: signal.reason,
                score: signal.score
            });
            evidence.push({
                type: signal.category,
                value: signal.reason,
                confidence: signal.confidence,
                score: signal.score
            });
        }
        if (reputationEntry
            .reputationScore >= 300) {
            riskScore += 60;
            correlations.push({
                source: "local-reputation-engine",
                reason: "Locally established malicious behavioral reputation detected",
                score: 60
            });
        }
        if (reputationEntry.labels.includes("trusted") ||
            reputationEntry.labels.includes("family")) {
            riskScore -= 80;
            correlations.push({
                source: "local-legitimacy-engine",
                reason: "Trusted local caller suppression activated",
                score: -80
            });
        }
        if (riskScore < 0) {
            riskScore = 0;
        }
        const severity = this.calculateSeverity(riskScore);
        const summary = this.generateSummary(severity, categories);
        return {
            isSuspicious: severity !== "safe",
            riskScore,
            severity,
            categories,
            explanations,
            forensic: {
                evidence,
                correlations,
                verdict: {
                    severity,
                    summary
                }
            }
        };
    }
    calculateSeverity(score) {
        if (score >= 250) {
            return "critical";
        }
        if (score >= 160) {
            return "high-risk";
        }
        if (score >= 90) {
            return "suspicious";
        }
        if (score >= 40) {
            return "caution";
        }
        return "safe";
    }
    generateSummary(severity, categories) {
        if (categories.includes("government-impersonation")) {
            return (severity +
                " government impersonation pattern detected");
        }
        if (categories.includes("remote-access-scam")) {
            return (severity +
                " remote access fraud pattern detected");
        }
        if (categories.includes("robocall-burst-pattern")) {
            return (severity +
                " robocall activity detected");
        }
        return (severity +
            " suspicious call behavior detected");
    }
}
exports.CallAnalyzer = CallAnalyzer;
