import { SeqTransport } from '@datalust/winston-seq';
import winston from 'winston';

/**
 * Adds transports to the logger based on the environment
 */
export function getTransports(): (SeqTransport | typeof winston.transports.Console)[] {
  const transports: (SeqTransport | typeof winston.transports.Console)[] = [];

  return transports;
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    winston.format.align()
  ),
  transports: getTransports()
});
