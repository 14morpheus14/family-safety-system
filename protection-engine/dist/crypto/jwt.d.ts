import { JwtPayload } from "jsonwebtoken";
export declare class JwtService {
    verifyToken(token: string, secret: string): JwtPayload | string;
    decodeToken(token: string): JwtPayload | string | null;
}
