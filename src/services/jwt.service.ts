import jwt from 'jsonwebtoken';
import { User } from '../auth/user.model';

export class JwtService {
  static jwtSecret:string = process.env.JWT_SECRET || '';

  static generateToken(payload: Record<string, User>): string {
    const token = jwt.sign(payload, this.jwtSecret);
    return token;
  }

  static verifyToken(token: string): string | jwt.JwtPayload {
    const decoded = jwt.verify(token, this.jwtSecret);
    return decoded;
  }
}