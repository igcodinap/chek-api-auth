import { NextFunction, Request, Response } from "express";
import { IAuthService } from "./auth.service";
import { NewUser } from "./user.model";
import AppError from "../errors/AppError";

export class AuthMiddleware {
  service: IAuthService;
  constructor(service: IAuthService) {
    this.service = service;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      if (typeof email !== "string" || typeof password !== "string")
        throw new AppError(400, "Invalid email or password");
      const user = await this.service.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const { name, lastname, email, password } = req.body;
    try {
      if (
        typeof name !== "string" ||
        typeof lastname !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
      )
        throw new AppError(400, "Invalid user data");
      const newUser = new NewUser(name, lastname, email, password);
      const user = await this.service.register(newUser);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
