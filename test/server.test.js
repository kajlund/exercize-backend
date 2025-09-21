import { beforeAll, afterAll, describe, expect, it } from 'vitest';
import createAndStartServer from '../src/server.js';

let server;
let port;

describe('Server', () => {
  // --- Setup/Teardown ---
  beforeAll(async () => {
    // 1. Start the server and get the instance
    server = await createAndStartServer();

    // 2. Extract the port that the OS assigned
    port = server.address().port;
  });

  afterAll(async () => {
    // 3. Ensure the server is closed after all tests
    await new Promise(resolve => server.close(resolve));
  });

  // --- Tests ---
  it('should start the server on configured port', async () => {
    expect(server).toBeDefined();
    expect(port).toBeGreaterThan(0);
  });

});
