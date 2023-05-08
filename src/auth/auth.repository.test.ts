import { AuthRepositoryDB } from "./auth.repository";
import { pool } from "../config/database";
import { User } from "./user.model";
import AppError from "../errors/AppError";

jest.mock('../config/database');

describe('AuthRepositoryDB', () => {
    let authRepository: AuthRepositoryDB;

    beforeEach(() => {
        authRepository = new AuthRepositoryDB();
        (pool.execute as jest.Mock).mockClear();
    });

    describe('getById', () => {
        it('should return a user', async () => {
            const id = 1;
            const user: User = {
                id,
                name: 'John',
                lastname: 'Doe',
                password: '123456',
                email: 'user@mail.com',
            };
            (pool.execute as jest.Mock).mockResolvedValueOnce([[user]]);

            const strId = id.toString();
            const result = await authRepository.getById(strId);

            expect(result).toEqual(user);
            expect(pool.execute).toHaveBeenCalledTimes(1);
            expect(pool.execute).toHaveBeenCalledWith(
                'SELECT id, name, lastname, email, password, jwt_token FROM users WHERE id = ?',
                [strId]
            );
        });
        it('should throw an AppError if the user is not found', async () => {
            const id = '1';
      
            (pool.execute as jest.Mock).mockResolvedValue([[]]);
      
            await expect(authRepository.getById(id)).rejects.toThrow(AppError);
      
            expect(pool.execute).toHaveBeenCalledWith(authRepository.getByIdQuery, [id]);
          });
    });
});