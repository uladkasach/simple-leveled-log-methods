import { LOG_LEVEL } from './constants';

/*
  define priority order of log levels and make it easy to ask questions about
*/
const logLevelPriorityOrder = [LOG_LEVEL.ERROR, LOG_LEVEL.WARN, LOG_LEVEL.INFO, LOG_LEVEL.DEBUG];
const aIsEqualOrMoreImportantThanB = ({ a, b }: { a: LOG_LEVEL; b: LOG_LEVEL }) => logLevelPriorityOrder.indexOf(a) - logLevelPriorityOrder.indexOf(b) <= 0;

/*
  define how to generate a log method
  - i.e.,:
    - define when allowed to emit a log (i.e., when level > minimalLogLevel)
    - define the format of the log message (json w/ level, timestamp, message, metadata)
    - define the transport of the message (console.log / console.warn)
*/
export type LogMethod = (message: string, metadata: any) => void;
export const generateLogMethod = ({ level, minimalLogLevel }: { level: LOG_LEVEL; minimalLogLevel: LOG_LEVEL }) => {
  return (message: string, metadata?: object) => {
    if (aIsEqualOrMoreImportantThanB({ a: level, b: minimalLogLevel })) {
      // 1. determine the console level (i.e., use warn if we can to make the logs stand out more)
      const consoleMethod = aIsEqualOrMoreImportantThanB({ a: level, b: LOG_LEVEL.WARN }) ? console.warn : console.log; // tslint:disable-line no-console

      // 2. output the message to console, which will get picked up by cloudwatch when deployed lambda is invoked
      consoleMethod({
        level,
        timestamp: new Date().toISOString(),
        message,
        metadata: JSON.stringify(metadata),
      });
    }
  };
};
