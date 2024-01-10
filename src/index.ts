import { connect } from 'mongoose';
import app from './app';
import { APP_ENV } from './config/config';
import logger from './config/logger';
import { Server } from 'http';

let server: Server;
connect(APP_ENV.MONGODB_URL).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(APP_ENV.PORT, () => {
    logger.info(`Listening on port ${APP_ENV.PORT}`);
    logger.info(`Access Swagger docs on http://localhost:${APP_ENV.PORT}/v1/docs`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
