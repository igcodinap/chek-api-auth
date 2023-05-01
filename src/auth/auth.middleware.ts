import { Request, Response } from "express";
import { IAuthService } from "./auth.service";

export class AuthMiddleware {
    service: IAuthService;
    constructor(service: IAuthService) {
        this.service = service;
        this.login = this.login.bind(this);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const user = await this.service.login(email, password);
            res.status(200).json(user);
        } catch (error) {
            console.log(error)
            // wip
            res.status(500).json({ error: error });
        }
    }
}