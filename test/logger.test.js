import { describe, it, expect, vi } from "vitest";

import getConfig from '../src/config.js';
import getLogger from '../src/logger.js';

describe('Logger', () => {
  const cnf = getConfig();

  it('should throw if no config is provided', () => {
    expect(() => getLogger()).toThrow('App config is required to setup logger');
  });

  it('should be able to log with default config', () => {
    const log = getLogger(cnf);
    const spy = vi.spyOn(log, 'info').mockImplementation((str) => str);
    log.info('Info message');

    expect(log).toBeDefined();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Info message');
    spy.mockRestore();
  });

  it('should override default config', async () => {
    const log = getLogger(cnf, { level: 'error' });
    const spy = vi.spyOn(log, 'error').mockImplementation((str) => str);
    log.error('Error message');

    expect(log).toBeDefined();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Error message');
    expect(log.level).toEqual('error');
    spy.mockRestore();
  });
});
