import { NextFunction, Request, Response } from 'express';
import { AuthMiddleware } from './auth.middleware';
import { IAuthService } from './auth.service';

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
});