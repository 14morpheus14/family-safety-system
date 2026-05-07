"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    verifyToken(token, secret) {
        return jsonwebtoken_1.default.verify(token, secret, {
            algorithms: ["HS256"]
        });
    }
    decodeToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.JwtService = JwtService;
