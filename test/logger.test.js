import { describe, it, expect, vi } from "vitest";

import getLogger from '../src/logger.js';
describe('Logger', () => {

  it('should be able to log with default config', () => {
    const log = getLogger();
    const spy = vi.spyOn(log, 'info').mockImplementation((str) => str);
    log.info('Info message');

    expect(log).toBeDefined();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Info message');
    spy.mockRestore();
  });

  it('should override default config', async () => {
    const log = getLogger({ level: 'error' });
    const spy = vi.spyOn(log, 'error').mockImplementation((str) => str);
    log.error('Error message');

    expect(log).toBeDefined();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Error message');
    expect(log.level).toEqual('error');
    spy.mockRestore();
  });
});
