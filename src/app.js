import path from 'node:path';

import express from 'express';
import { Liquid } from 'liquidjs';

import getRouter from './routes.js';

export default function getApp(cnf, log) {

  const app = express();

  // View engine config
  const engine = new Liquid({
    cache: cnf.isProd === true,
    root: path.join(process.cwd(), 'views'),
    layouts: path.join(process.cwd(), 'views/layouts'),
    partials: path.join(process.cwd(), 'views/partials'),
    extname: '.liquid'
  });

  // Setup middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.engine('liquid', engine.express());
  app.set('view engine', 'liquid');
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Add routes
  app.use(getRouter());

  return app;
}
