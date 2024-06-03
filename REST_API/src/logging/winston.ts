import { createLogger, transports, format as winstonFormat } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const { combine, timestamp, printf, colorize, align } = winstonFormat;
export const instance = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.Console({
      format: winstonFormat.combine(
        winstonFormat.timestamp(),
        winstonFormat.ms(),
        nestWinstonModuleUtilities.format.nestLike('Baufest Starter – NodeJs', {
          // options
        }),
      ),
    }),
  ],
});
