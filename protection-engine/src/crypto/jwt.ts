import jwt, { JwtPayload } from "jsonwebtoken";

export class JwtService {
  public verifyToken(token: string, secret: string): JwtPayload | string {
    return jwt.verify(token, secret);
  }

  public decodeToken(token: string): JwtPayload | string | null {
    return jwt.decode(token);
  }
}
