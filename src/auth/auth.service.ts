import bcrypt from 'bcrypt';
import { IAuthRepository } from './auth.repository';
import { User } from './user.model';

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
            if (!user) {
                throw new Error('Email not found');
            }
            const hashedPassword = bcrypt.hashSync(password, 10);
            if (hashedPassword !== password) {
                throw new Error('Invalid credentials');
            }
            return user;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}