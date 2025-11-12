import { describe, expect, it } from 'vitest';

import { codes, phrases } from '../src/status.js';

describe('Status constants', () => {
  it('codes should should match key', () => {
    expect(codes.OK).toBe(200);
    expect(codes.CREATED).toBe(201);
    expect(codes.NO_CONTENT).toBe(204);
    expect(codes.BAD_REQUEST).toBe(400);
    expect(codes.UNAUTHORIZED).toBe(401);
    expect(codes.FORBIDDEN).toBe(403);
    expect(codes.NOT_FOUND).toBe(404);
    expect(codes.INTERNAL_SERVER_ERROR).toBe(500);
    expect(codes.NOT_IMPLEMENTED).toBe(501);
  });

  it('phrases should should match key', () => {
    expect(phrases.OK).toBe('OK');
    expect(phrases.CREATED).toBe('Created');
    expect(phrases.NO_CONTENT).toBe('No Content');
    expect(phrases.BAD_REQUEST).toBe('Bad Request');
    expect(phrases.UNAUTHORIZED).toBe('Unauthorized');
    expect(phrases.FORBIDDEN).toBe('Forbidden');
    expect(phrases.NOT_FOUND).toBe('Not Found');
    expect(phrases.INTERNAL_SERVER_ERROR).toBe('Internal Server Error');
    expect(phrases.NOT_IMPLEMENTED).toBe('Not Implemented');
  });
});
