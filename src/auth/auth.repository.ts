import { pool } from '../config/database';
import { User, NewUser } from './user.model';
import AppError from '../errors/AppError';

export interface IAuthRepository {
    getById(id: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    insertOne(user: NewUser): Promise<void>;
}


export class AuthRepositoryDB implements IAuthRepository{
    private readonly getByIdQuery = "SELECT id, name, lastname, email, password, jwt_token FROM users WHERE id = ?";
    private readonly getByEmailQuery = "SELECT id, name, lastname, email, password FROM users WHERE email = ?";
    private readonly insertOneQuery = "INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)";

    async getById(id: string): Promise<User> {
        try {
            const [rows] = await pool.execute(this.getByIdQuery, [id]);
            const users = rows as User[];
            const user = users[0];
            if (!user) throw new AppError(404, 'User not found');
            return user;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, 'Internal Server Error');
        }
    }

    async getByEmail(email: string): Promise<User> {
        try {
            const [rows] = await pool.execute(this.getByEmailQuery, [email]);
            const users = rows as User[];
            const user = users[0];
            if (!user) throw new AppError(404, 'User not found');
            console.log(user, 'user at auth repository')
            return user;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, 'Internal Server Error');
        }
    }

    async insertOne(user: NewUser): Promise<void> {
        try {
            await pool.execute(this.insertOneQuery, [user.name, user.lastname, user.email, user.password]);
            return
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, 'Internal Server Error');
        }
    }
}