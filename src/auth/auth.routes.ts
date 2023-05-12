import { Router } from "express";
import { AuthMiddleware } from "./auth.middleware";
import { AuthService } from "./auth.service";
import { AuthRepositoryDB } from "./auth.repository";

const router = Router();
const repository = new AuthRepositoryDB();
const service = new AuthService(repository);
const auth = new AuthMiddleware(service);

router.post("/login", auth.login);
router.post("/register", auth.register);

export default router;
