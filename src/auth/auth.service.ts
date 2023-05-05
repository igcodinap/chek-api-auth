import { IAuthRepository } from './auth.repository';
import { User, NewUser } from './user.model';
import { PasswordService } from '../services/password.service';
import { JwtService } from '../services/jwt.service';
import AppError from '../errors/AppError';

export interface IAuthService {
    login(email: string, password: string): Promise<User>;
    register(user: NewUser): Promise<User>;
}
export class AuthService implements IAuthService {
    repository: IAuthRepository;
    constructor(repo: IAuthRepository) {
        this.repository = repo;
    }

    async login(email: string, password: string) {
        try {
            const user = await this.repository.getByEmail(email);
            console.log(user, 'user at auth service')
            if (!user) {
                throw new AppError(401 , 'Invalid email');
            }
            const isValid = await PasswordService.comparePasswords(password, user.password);
            console.log(isValid, 'isValid')
            if (!isValid) {
                throw new AppError(401 , 'Invalid email or password');
            }
            user.jwt_token = JwtService.generateToken({ user });
            console.log(user.jwt_token, 'jwt_token')
            return user;
        } catch (error) {
            console.log('an error ocurred at auth service')
            throw error;
        }
    }

    async register(user: NewUser) {
        try {
            const userExists = await this.repository.getByEmail(user.email);
            if (userExists) {
                throw new AppError(409, 'User already exists');
            }
            const hashedPassword = await PasswordService.hashPassword(user.password);
            user.password = hashedPassword;
            await this.repository.insertOne(user);
            const createdUser = await this.repository.getByEmail(user.email);
            if (!createdUser) {
                throw new AppError(500, 'User not created');
            }
            return createdUser;
        } catch (error) {
            console.log('an error ocurred at auth service')
            throw error;
        }
    }
}