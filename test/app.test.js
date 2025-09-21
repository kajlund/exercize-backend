import { beforeAll, afterEach, describe, it, expect } from "vitest";
import request from 'supertest';

import getApp from '../src/app.js';

describe('Express app', () => {
  it('should return an express app', async () => {
    const app = getApp();
    expect(app).toBeDefined();
    expect(app).toHaveProperty('use');
    expect(app).toHaveProperty('get');
    expect(app).toHaveProperty('post');

  });

  it('should return JSON from root endpoint', async () => {
    const app = getApp();
    const response = await request(app).get('/').expect(200);
    expect(response.body).toEqual({ message: 'Hello, World!' });
  });
});
