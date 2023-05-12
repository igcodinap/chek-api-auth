import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";

export class ErrorMiddleware {
  public static handle(
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        error: error.message,
        status: error.statusCode,
      });
    } else {
      res.status(500).json({
        error: "Internal server error",
      });
    }
    next();
  }
}
