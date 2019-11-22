import { LOG_LEVEL } from './constants';
import { generateLogMethods } from './generateLogMethods';

describe('generateLogMethods', () => {
  it('should throw an error if minimalLogLevel is not valid', () => {
    try {
      generateLogMethods({ minimalLogLevel: '__INVALID__' as any });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toEqual('__INVALID__ is not a valid log level');
    }
  });
  it('should create the log methods if minimalLogLevel is valid', () => {
    const log = generateLogMethods({ minimalLogLevel: LOG_LEVEL.DEBUG });
    expect(log).toHaveProperty('error');
    expect(log).toHaveProperty('warn');
    expect(log).toHaveProperty('info');
    expect(log).toHaveProperty('debug');
  });
});
