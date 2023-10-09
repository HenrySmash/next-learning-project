import { SeqTransport } from '@datalust/winston-seq';
import winston from 'winston';

import { envs } from 'config';

/**
 * Adds transports to the logger based on the environment
 */
export function getTransports(): (SeqTransport | typeof winston.transports.Console)[] {
  const transports: (SeqTransport | typeof winston.transports.Console)[] = [];

  if (envs.SEQ_ENABLED) {
    transports.push(
      new SeqTransport({
        serverUrl: envs.SEQ_SERVER_URL,
        apiKey: envs.SEQ_API_KEY,
        onError: (e) => {
          // eslint-disable-next-line no-console
          console.error(e);
        },
        handleExceptions: true,
        handleRejections: true
      })
    );
  }

  if (envs.NODE_ENV === 'development') {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.errors({ stack: true }),
          winston.format.json(),
          winston.format.colorize(),
          winston.format.align(),
          winston.format.timestamp({
            format: 'DD-MMM-YYYY HH:mm:ss.SSS'
          }),
          winston.format.printf(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            (info) => `${info.level}: [${info.timestamp}] ${info.message} ${info.stack ? info.stack : ''}`
          )
        )
      })
    );
  }

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
