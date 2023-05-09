import { IAuthRepository } from './auth.repository';
import { User, NewUser } from './user.model';
import { AuthService } from './auth.service';
import { PasswordService } from '../services/password.service';
import { JwtService } from '../services/jwt.service';
import AppError from '../errors/AppError';

jest.mock('../services/password.service');
jest.mock('../services/jwt.service');

describe('AuthService', () => {
    let authRepository: IAuthRepository;
    let authService: AuthService;

    beforeEach(() => {
        authRepository = {
            getById: jest.fn(),
            getByEmail: jest.fn(),
            insertOne: jest.fn(),
        };
        authService = new AuthService(authRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should log in a user with valid email and password', async () => {
            const email = 'user@mail.com';
            const password = '123456';
            const hashedPassword = 'hashedPassword123456';
            const jwtToken = 'jwtToken';
        
            const expectedUser: User = {
                id: 1,
                name: 'testname',
                lastname: 'testlastname',
                email,
                password: hashedPassword,
            };
        
            (authRepository.getByEmail as jest.Mock).mockResolvedValue(expectedUser);
            (PasswordService.comparePasswords as jest.Mock).mockResolvedValue(true);
            (JwtService.generateToken as jest.Mock).mockReturnValue(jwtToken);
        
            const user = await authService.login(email, password);
        
            expect(authRepository.getByEmail).toHaveBeenCalledWith(email);
            expect(PasswordService.comparePasswords).toHaveBeenCalledWith(password, hashedPassword);
            expect(JwtService.generateToken).toHaveBeenCalled();
            expect(user.jwt_token).toBe(jwtToken);
        });
        //pending fail flow
    })

    describe('register', () => {
        it('should register a new user with valid data', async () => {
            const newUser: NewUser = {
                name: 'testname',
                lastname: 'testlastname',
                email: 'user@mail.com',
                password: '123456',
            };
            const hashedPassword = 'hashedPassword123456';
        
            const expectedUser: User = {
                id: 1,
                ...newUser,
                password: hashedPassword,
            };
        
            (authRepository.getByEmail as jest.Mock).mockResolvedValueOnce(null).mockResolvedValueOnce(expectedUser);
            (PasswordService.hashPassword as jest.Mock).mockResolvedValue(hashedPassword);
        
            const createdUser = await authService.register(newUser);
        
            expect(authRepository.getByEmail).toHaveBeenCalledWith(newUser.email);
            expect(authRepository.insertOne).toHaveBeenCalledWith({ ...newUser, password: hashedPassword });
            expect(createdUser).toEqual(expectedUser);
        });
        
        it('should throw an AppError if the user already exists', async () => {
            const newUser: NewUser = {
                name: 'testname',
                lastname: 'testlastname',
                email: 'user@mail.com',
                password: '123456',
            };
        
            const existingUser: User = {
                id: 1,
                name: 'testname',
                lastname: 'testlastname',
                email: 'user@mail.com',
                password: 'hashedPassword123456',
            };
        
            (authRepository.getByEmail as jest.Mock).mockResolvedValue(existingUser);
        
            await expect(authService.register(newUser)).rejects.toThrow(AppError);
        
            expect(authRepository.getByEmail).toHaveBeenCalledWith(newUser.email);
        });        
    })
});
