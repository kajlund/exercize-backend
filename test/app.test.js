/* eslint-disable no-unused-vars */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

import { getApp } from '../src/app.js';

const mockRouter = (req, res, next) => {
  if (req.path === '/test') return res.json({ ok: true });
  next();
};

const mockNotFound = (req, res) => res.status(404).json({ error: 'Not Found' });
const mockErrorHandler = (log) => (err, req, res, next) => {
  res.status(500).json({ error: 'Internal Error', message: err.message });
};

const mockHttpLogger = vi.fn(() => (req, res, next) => next());

vi.mock('pino-http', () => ({
  default: () => mockHttpLogger(),
}));

vi.mock('../src/router.js', () => ({
  getRouter: () => mockRouter,
}));

vi.mock('../src/middleware/notfoundhandler.js', () => ({
  getNotFoundHandler: () => mockNotFound,
}));

vi.mock('../src/middleware/errorhandler.js', () => ({
  getErrorHandler: () => mockErrorHandler,
}));

describe('getApp', () => {
  const log = { info: vi.fn(), error: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should respond to a known route', async () => {
    const app = getApp({ cookieSecret: 'secret', logHttp: true }, log);
    const res = await request(app).get('/test');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('should return 404 for unknown route', async () => {
    const app = getApp({ cookieSecret: 'secret', logHttp: false }, log);
    const res = await request(app).get('/unknown');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Not Found' });
  });

  it('should apply http logger if logHttp is true', async () => {
    getApp({ cookieSecret: 'secret', logHttp: true }, log);

    expect(mockHttpLogger).toHaveBeenCalled();
  });

  it('should skip http logger if logHttp is false', async () => {
    getApp({ cookieSecret: 'secret', logHttp: false }, log);

    expect(mockHttpLogger).not.toHaveBeenCalled();
  });

  it.skip('should handle thrown errors with error handler', async () => {
    vi.resetModules();

    vi.doMock('../src/router.js', () => {
      const express = require('express');
      return {
        getRouter: () => {
          const router = express.Router();
          router.get('/', (req, res, next) => next(new Error('boom')));
          return router;
        },
      };
    });

    const { getApp } = await import('../src/app.js');
    const app = getApp({ cookieSecret: 'secret', logHttp: false }, log);
    const res = await request(app).get('/');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal Error', message: 'boom' });
  });
});
