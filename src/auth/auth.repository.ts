import { PoolConnection } from 'mysql2/promise';
import { pool } from '../config/database';
import { User } from './user.model';

export interface IAuthRepository {
    getById(id: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    insert(user: User): Promise<User>;
}


export class AuthRepositoryDB implements IAuthRepository{
    private readonly getByIdQuery = "SELECT id, name, lastname, email, password, jwt_token FROM users WHERE id = ?";
    private readonly getByEmailQuery = "SELECT id, name, lastname, email, password FROM users WHERE email = ?";

    constructor() {
        this.getById = this.getById.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
        this.insert = this.insert.bind(this);
    }

    async getById(id: string): Promise<User> {
        let connection: PoolConnection | undefined;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(this.getByIdQuery, [id]);
            const users = rows as User[];
            const user = users[0];
            console.log(user)
            return user;
        } catch (error) {
            console.log(error)
            throw error;
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
            console.log(user)
            return user;
        } catch (error) {
            console.log(error)
            throw error;
        } finally {
            if (connection) connection.release();
        }
    }

    async insert(user: User): Promise<User> {
        // WIP
        return user;
    }
}