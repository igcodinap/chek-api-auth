class AppError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly metadata: unknown;

  constructor(statusCode: number, message: string, metadata?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.metadata = metadata;
  }
}

export default AppError;
