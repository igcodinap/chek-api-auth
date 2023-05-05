import { PoolConnection } from 'mysql2/promise';
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

    async getById(id: string): Promise<User> {
        let connection: PoolConnection | undefined;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(this.getByIdQuery, [id]);
            const users = rows as User[];
            const user = users[0];
            if (!user) throw new AppError(404, 'User not found');
            return user;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, 'Internal Server Error');
        } finally {
            if (connection) connection.release();
        }
    }

    async getByEmail(email: string): Promise<User> {
        let connection: PoolConnection | undefined;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(this.getByEmailQuery, [email]);
            const users = rows as User[];
            const user = users[0];
            if (!user) throw new AppError(404, 'User not found');
            console.log(user, 'user at auth repository')
            return user;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, 'Internal Server Error');
        } finally {
            if (connection) connection.release();
        }
    }

    async insertOne(user: NewUser): Promise<void> {
        let connection: PoolConnection | undefined;
        try {
            connection = await pool.getConnection();
            const insertOneQuery = "INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)";
            await connection.execute(insertOneQuery, [user.name, user.lastname, user.email, user.password]);
            return
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(500, 'Internal Server Error');
        } finally {
            if (connection) connection.release();
        }
    }
}