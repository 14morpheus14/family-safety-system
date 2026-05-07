import { EventEmitter } from "events";
export declare class EventBus extends EventEmitter {
    emitThreatDetected(message: string): void;
    onThreatDetected(listener: (message: string) => void): void;
}
