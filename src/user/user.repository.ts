import { PoolConnection } from 'mysql2/promise';
import { pool } from '../config/database';
import { User } from './user.model';

export interface UserRepository {
    getById(id: string): Promise<User>;
    insert(user: User): Promise<User>;
}


export class UserRepositoryDB {
    private readonly getByIdQuery = "SELECT id, name, lastname, email, password, jwt_token FROM users WHERE id = ?";

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

    async insert(user: User): Promise<User> {
        // WIP
        return user;
    }
}