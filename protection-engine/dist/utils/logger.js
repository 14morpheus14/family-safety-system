"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    info(message) {
        console.log(`[INFO] ${message}`);
    }
    error(message) {
        console.error(`[ERROR] ${message}`);
    }
}
exports.Logger = Logger;
