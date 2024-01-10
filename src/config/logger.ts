import { format as _format, createLogger, transports as _transports } from 'winston';
import { APP_ENV } from './config';

const enumerateErrorFormat = _format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = createLogger({
  level: APP_ENV.NODE_ENV === 'development' ? 'debug' : 'info',
  format: _format.combine(
    enumerateErrorFormat(),
    APP_ENV.NODE_ENV === 'development' ? _format.colorize() : _format.uncolorize(),
    _format.splat(),
    _format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports: [
    new _transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;
