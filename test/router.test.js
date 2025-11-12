// router.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { getRouter } from '../src/router.js'; // adjust path as needed

const mockLog = { info: vi.fn() };

// Mock route definitions
vi.mock('../src/api/root.routes.js', () => ({
  getRootRoutes: () => ({
    group: {
      prefix: '/root',
      middleware: [
        (req, res, next) => {
          req.rootChecked = true;
          next();
        },
      ],
    },
    routes: [
      {
        method: 'get',
        path: '/ping',
        middleware: [
          (req, res, next) => {
            req.pingChecked = true;
            next();
          },
        ],
        handler: (req, res) => {
          res.json({
            message: 'pong',
            rootChecked: req.rootChecked,
            pingChecked: req.pingChecked,
          });
        },
      },
    ],
  }),
}));

vi.mock('../src/api/activities/activity.routes.js', () => ({
  getActivityRoutes: () => ({
    group: { prefix: '/activities', middleware: [] },
    routes: [
      {
        method: 'post',
        path: '/echo',
        handler: (req, res) => res.json({ echo: req.body }),
      },
    ],
  }),
}));

describe('getRouter', () => {
  let app;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    app.use(express.json());
    app.use(getRouter(mockLog));
  });

  it('GET /root/ping should run middleware and handler', async () => {
    const res = await request(app).get('/root/ping');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'pong',
      rootChecked: true,
      pingChecked: true,
    });
  });

  it('should register and respond to POST /activities/echo', async () => {
    const payload = { hello: 'world' };
    const res = await request(app).post('/activities/echo').send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ echo: payload });
    expect(mockLog.info).toHaveBeenCalledWith('Route: post /activities/echo');
  });
});
