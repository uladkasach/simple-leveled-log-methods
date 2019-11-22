import { LOG_LEVEL } from './constants';
import { generateLogMethod } from './generateLogMethod';

describe('generateLogMethod', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should generate a method that outputs to console.log if below warn leevl', () => {
    const spy = jest.spyOn(console, 'log');
    const logError = generateLogMethod({ level: LOG_LEVEL.INFO, minimalLogLevel: LOG_LEVEL.DEBUG });
    logError('testMessage');
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should generate a method that outputs to console.warn if at or above warn level', () => {
    const spy = jest.spyOn(console, 'warn');
    const logError = generateLogMethod({ level: LOG_LEVEL.ERROR, minimalLogLevel: LOG_LEVEL.DEBUG });
    logError('testMessage');
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should generate a method that outputs timestamp, level, message, and metadata', () => {
    const spy = jest.spyOn(console, 'warn');
    const logError = generateLogMethod({ level: LOG_LEVEL.ERROR, minimalLogLevel: LOG_LEVEL.DEBUG });
    logError('testMessage', { nested: { object: true } });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        level: LOG_LEVEL.ERROR,
        message: 'testMessage',
        metadata: JSON.stringify({ nested: { object: true } }),
      }),
    );
    expect(spy.mock.calls[0][0]).toHaveProperty('timestamp');
  });
  it('should not output anything if level is below minimum', () => {
    const spy = jest.spyOn(console, 'log');
    const logDebug = generateLogMethod({ level: LOG_LEVEL.DEBUG, minimalLogLevel: LOG_LEVEL.WARN });
    logDebug('testMessage');
    expect(spy).not.toHaveBeenCalled();
  });
});
