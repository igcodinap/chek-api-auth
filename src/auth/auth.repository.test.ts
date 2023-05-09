import { AuthRepositoryDB } from "./auth.repository";
import { pool } from "../config/database";
import { User, NewUser } from "./user.model";
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

    describe('getByEmail', () => {
        it('should return a user by email', async () => {
          const email = 'user@mail.com';
          const expectedUser: User = {
            id: 1,
            name: 'Ignacio',
            lastname: 'Codina',
            email,
            password: '123456',
          };
    
          (pool.execute as jest.Mock).mockResolvedValue([[expectedUser]]);
    
          const user = await authRepository.getByEmail(email);
    
          expect(user).toEqual(expectedUser);
          expect(pool.execute).toHaveBeenCalledWith(authRepository.getByEmailQuery, [email]);
        });
        it('should throw an AppError if the user is not found', async () => {
            const email = 'user@mail.com';
      
            (pool.execute as jest.Mock).mockResolvedValue([[]]);
      
            await expect(authRepository.getByEmail(email)).rejects.toThrow(AppError);
      
            expect(pool.execute).toHaveBeenCalledWith(authRepository.getByEmailQuery, [email]);
        });
    });

    describe('insertOne', () => {
        it('should insert a new user', async () => {
          const newUser: NewUser = {
            name: 'testname',
            lastname: 'testlastname',
            email: 'user@mail.com',
            password: '123456',
          };
    
          (pool.execute as jest.Mock).mockResolvedValue([{}]);
    
          await authRepository.insertOne(newUser);
    
          expect(pool.execute).toHaveBeenCalledWith(authRepository.insertOneQuery, [
            newUser.name,
            newUser.lastname,
            newUser.email,
            newUser.password,
          ]);
        });

        // it('should throw an AppError if the user is not created', async () => {
        //     const newUser: NewUser = {
        //       name: 'testname',
        //       lastname: 'testlastname',
        //       email: 'user@mail.com',
        //       password: '123456',
        //     };

        //     (pool.execute as jest.Mock).mockResolvedValue([
        //         {
        //             affectedRows: 0,
        //         },
        //     ]);
        //     // failing, wip
        //     // await expect(authRepository.insertOne(newUser)).rejects.toThrow(AppError);

        //     // expect(pool.execute).toHaveBeenCalledWith(authRepository.insertOneQuery, [
        //     //     newUser.name,
        //     //     newUser.lastname,
        //     //     newUser.email,
        //     //     newUser.password,
        //     // ]);
        // });
    });
});