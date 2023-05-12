import AppError from './AppError';

describe('AppError', () => {
  it('should correctly assign properties', () => {
    const error = new AppError(400, 'Bad Request', { detail: 'Invalid input' });

    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Bad Request');
    expect(error.metadata).toEqual({ detail: 'Invalid input' });
  });

  it('should assign properties correctly when metadata is not provided', () => {
    const error = new AppError(400, 'Bad Request');

    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Bad Request');
    expect(error.metadata).toBeUndefined();
  });

  it('should be instance of Error', () => {
    const error = new AppError(400, 'Bad Request');

    expect(error).toBeInstanceOf(Error);
  });
});
