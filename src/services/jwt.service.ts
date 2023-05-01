import jwt from 'jsonwebtoken';

const JWT_SECRET = 'irrelevant-secret-wip';

export class JwtService {
  static generateToken(payload: Record<string, number>): string {
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
  }

  static verifyToken(token: string): string | jwt.JwtPayload {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  }
}