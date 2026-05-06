import { EventEmitter } from "events";

export class EventBus extends EventEmitter {
  public emitThreatDetected(message: string): void {
    this.emit("threatDetected", message);
  }

  public onThreatDetected(listener: (message: string) => void): void {
    this.on("threatDetected", listener);
  }
}
