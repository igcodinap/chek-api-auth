import { NextFunction, Request, Response } from "express";
import { IAuthService } from "./auth.service";
import { NewUser } from "./user.model";

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
            const user = await this.service.login(email, password);
            res.status(200).json(user);
        } catch (error) {
            next(error)
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        const { name, lastname, email, password } = req.body;
        try {
            const newUser = new NewUser(name, lastname, email, password);
            const user = await this.service.register(newUser);
            res.status(200).json(user);
        } catch (error) {
            next(error)
        }
    }
}