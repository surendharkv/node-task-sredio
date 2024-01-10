import { version } from '../../package.json';
import { APP_ENV } from '../config/config';

export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Node Task',
    version,
  },
  servers: [
    {
      url: `http://localhost:${APP_ENV.PORT}/v1`,
    },
  ],
};
