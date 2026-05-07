"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
const events_1 = require("events");
class EventBus extends events_1.EventEmitter {
    emitThreatDetected(message) {
        this.emit("threatDetected", message);
    }
    onThreatDetected(listener) {
        this.on("threatDetected", listener);
    }
}
exports.EventBus = EventBus;
