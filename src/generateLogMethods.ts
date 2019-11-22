import { LOG_LEVEL } from './constants';
import { generateLogMethod, LogMethod } from './generateLogMethod';

/*
  define how to generate all of the log methods
*/
export const generateLogMethods = ({ minimalLogLevel }: { minimalLogLevel: LOG_LEVEL }): { [index in LOG_LEVEL]: LogMethod } => {
  // check that the min  is valid
  if (!Object.values(LOG_LEVEL).includes(minimalLogLevel)) {
    throw new Error(`${minimalLogLevel} is not a valid log level`);
  }

  // generate the methods
  return {
    error: generateLogMethod({ level: LOG_LEVEL.ERROR, minimalLogLevel }),
    warn: generateLogMethod({ level: LOG_LEVEL.WARN, minimalLogLevel }),
    info: generateLogMethod({ level: LOG_LEVEL.INFO, minimalLogLevel }),
    debug: generateLogMethod({ level: LOG_LEVEL.DEBUG, minimalLogLevel }),
  };
};
