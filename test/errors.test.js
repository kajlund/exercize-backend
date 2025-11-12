import { describe, expect, it } from 'vitest';

import { AppError, BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from '../src/errors.js';

describe('Testing App Errors class', () => {
  it('should use added properties', () => {
    const err = new AppError('Bad Request', 400, 'Detail message');

    expect(err.name).toBe('AppError');
    expect(err.isAppError).toBe(true);
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('Bad Request');
    expect(err.detail).toBe('Detail message');
  });

  it('should use default properties', () => {
    const err = new AppError();

    expect(err.name).toBe('AppError');
    expect(err.isAppError).toBe(true);
    expect(err.statusCode).toBe(500);
    expect(err.message).toBe('Internal Server Error');
    expect(err.detail).toBe('');
  });
});

describe('UnauthorizedError class', () => {
  it('should set default properties', () => {
    const err = new UnauthorizedError('Details');
    expect(err.name).toBe('UnauthorizedError');
    expect(err.isAppError).toBe(true);
    expect(err.statusCode).toBe(401);
    expect(err.message).toBe('Unauthorized');
    expect(err.detail).toBe('Details');
  });
});

describe('BadRequestError class', () => {
  it('should set default properties', () => {
    const errors = [1, 2, 3];
    const err = new BadRequestError('Details', errors);
    expect(err.name).toBe('BadRequestError');
    expect(err.isAppError).toBe(true);
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('Bad Request');
    expect(err.detail).toBe('Details');
    expect(err.errors).toBe(errors);
  });
});

describe('NotFoundError class', () => {
  it('should set default properties', () => {
    const err = new NotFoundError('Customer not found');
    expect(err.name).toBe('NotFoundError');
    expect(err.isAppError).toBe(true);
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe('Not Found');
    expect(err.detail).toBe('Customer not found');
  });
});

describe('InternalServerError class', () => {
  it('should set default properties', () => {
    const err = new InternalServerError('Boom');
    expect(err.name).toBe('InternalServerError');
    expect(err.isAppError).toBe(true);
    expect(err.statusCode).toBe(500);
    expect(err.message).toBe('Internal Server Error');
    expect(err.detail).toBe('Boom');
  });
});
