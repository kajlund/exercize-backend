import express from 'express';

export default function getApp(cnf, log) {

  const app = express();

  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, World!' });
  });

  return app;
}
