import bcrypt from 'bcrypt';

export class PasswordService {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    console.log('comparing passwords')
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  }
}