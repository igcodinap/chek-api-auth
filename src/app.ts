import express from "express";
import authRouter from "./auth/auth.routes";
import { ErrorMiddleware } from "./errors/ErrorMiddleware";

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3002;

app.use(express.json());
app.use("/auth", authRouter);

app.use(ErrorMiddleware.handle);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
