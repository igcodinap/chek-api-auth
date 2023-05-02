import { IAuthRepository } from './auth.repository';
import { User } from './user.model';
import { PasswordService } from '../services/password.service';
import { JwtService } from '../services/jwt.service';

export interface IAuthService {
    login(email: string, password: string): Promise<User>;
}
export class AuthService implements IAuthService {
    repository: IAuthRepository;
    constructor(repo: IAuthRepository) {
        this.repository = repo;
    }

    async login(email: string, password: string) {
        try {
            const user = await this.repository.getByEmail(email);
            console.log(user)
            if (!user) {
                throw new Error('Email not found');
            }
            const isValid = PasswordService.comparePasswords(password, user.password);
            if (!isValid) {
                throw new Error('Invalid credentials');
            }
            user.jwt_token = JwtService.generateToken({ user });
            console.log(user.jwt_token, 'jwt_token')
            return user;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}