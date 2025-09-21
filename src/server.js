import * as url from 'node:url';
import * as path from 'node:path';
import http from 'node:http';

import getConfig from './config.js';
import getLogger from './logger.js';
import getApp from './app.js';

// Get the local path of the current module
const __filename = url.fileURLToPath(import.meta.url);

const cnf = getConfig();
const log = getLogger(cnf);
const app = getApp(cnf, log);

// Handle process events
process.on('unhandledRejection', (reason, p) => {
  log.error(p, `UNHANDLED PROMISE REJECTION: Reason: ${reason}`);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  log.error(err, 'UNCAUGHT EXCEPTION:');
  process.exit(1);
});

process.on('SIGINT', () => {
  log.info('SIGINT received, shutting down...');
  process.exit(0);
});

export default function createAndStartServer() {
  // Create http server passing the express app
  log.info(cnf, 'Creating server with configuration:');
  const server = http.createServer(app);
  return new Promise((resolve, reject) => {
    server.listen(cnf.port, (err) => {
      if (err) return reject(err);
      log.info(`Server listening on port ${cnf.port}`);
      resolve(server);
    });
  });
};

// Create and start the server if this file is run directly
if (process.argv[1] === __filename) {
  try {
    await createAndStartServer();
  } catch (err) {
    log.error(err, 'Error starting server:');
    process.exit(1);
  }
}

