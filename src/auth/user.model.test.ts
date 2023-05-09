import { User, NewUser } from './user.model';

describe('User Model', () => {
    it('should create a User instance with correct properties', () => {
        const user = new User(1, 'username', 'userlastname', 'user@mail.com', '123456', 'jwt_token');

        expect(user).toBeInstanceOf(User);
        expect(user.id).toBe(1);
        expect(user.name).toBe('username');
        expect(user.lastname).toBe('userlastname');
        expect(user.email).toBe('user@mail.com');
        expect(user.password).toBe('123456');
        expect(user.jwt_token).toBe('jwt_token');
    });
});

describe('NewUser Model', () => {
    it('should create a NewUser instance with correct properties', () => {
        const newUser = new NewUser('username', 'userlastname', 'user@mail.com', '123456');

        expect(newUser).toBeInstanceOf(NewUser);
        expect(newUser.name).toBe('username');
        expect(newUser.lastname).toBe('userlastname');
        expect(newUser.email).toBe('user@mail.com');
        expect(newUser.password).toBe('123456');
    });
});
