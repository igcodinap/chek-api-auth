import jwt from 'jsonwebtoken';
import { User } from '../auth/user.model';

const JWT_SECRET = 'irrelevant-secret-wip';

export class JwtService {
  static generateToken(payload: Record<string, User>): string {
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
  }

  static verifyToken(token: string): string | jwt.JwtPayload {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  }
}