import { NextFunction, Request, Response } from 'express';
import { AuthMiddleware } from './auth.middleware';
import { IAuthService } from './auth.service';
import { NewUser } from './user.model';

const mockAuthService: jest.Mocked<IAuthService> = {
  login: jest.fn(),
  register: jest.fn(),
};

const mockRequest = (body = {}, params = {}) => ({
  body,
  params,
}) as Request;

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNextFunction = () => {
  const next = {} as NextFunction;
  return next;
};

describe('AuthMiddleware', () => {
  let authMiddleware: AuthMiddleware;

  beforeEach(() => {
    jest.clearAllMocks();
    authMiddleware = new AuthMiddleware(mockAuthService);
  });

  describe('login', () => {
    it('should log in a user and return a 200 status code', async () => {
      const req = mockRequest({ email: 'user@mail.com', password: '123456' });
      const res = mockResponse();
      const next = mockNextFunction();

      const { email, password } = req.body;
      const user = {
        id: 1,
        name: 'username',
        lastname: 'userlastname',
        email,
        password,
        jwt_token: 'fake_token',
      };

      mockAuthService.login.mockResolvedValue(user);

      await authMiddleware.login(req, res, next);

      expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should call next with an error when login fails', async () => {
      const req = mockRequest({ email: 'user@mail.com', password: 'wrong_123456' });
      const res = mockResponse();
      const next = jest.fn();

      const { email, password } = req.body;

      mockAuthService.login.mockRejectedValue(new Error('Invalid email or password'));

      await authMiddleware.login(req, res, next);

      expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
      expect(next).toHaveBeenCalledWith(new Error('Invalid email or password'));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should register a user and return a 200 status code', async () => {
      const req = mockRequest({ name: 'username', lastname: 'userlastname', email: 'user@mail.com', password: '123456' });
      const res = mockResponse();
      const next = mockNextFunction();

      const { name, lastname, email, password } = req.body;
      const newUser = new NewUser(name, lastname, email, password);
      const registeredUser = { ...newUser, id: 1 };

      mockAuthService.register.mockResolvedValue(registeredUser);

      await authMiddleware.register(req, res, next);

      expect(mockAuthService.register).toHaveBeenCalledWith(newUser);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(registeredUser);
    });

    it('should call next with an error when registration fails', async () => {
      const req = mockRequest({ name: 'username', lastname: 'userlastname', email: 'user@mail.com', password: '123456' });
      const res = mockResponse();
      const next = jest.fn();

      const { name, lastname, email, password } = req.body;
      const newUser = new NewUser(name, lastname, email, password);

      mockAuthService.register.mockRejectedValue(new Error('User already exists'));

      await authMiddleware.register(req, res, next);

      expect(mockAuthService.register).toHaveBeenCalledWith(newUser);
      expect(next).toHaveBeenCalledWith(new Error('User already exists'));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});