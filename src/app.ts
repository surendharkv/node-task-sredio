import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { NOT_FOUND } from 'http-status';
import { APP_ENV } from './config/config';
import morgan from './config/morgan';
import v1Routes from './routes/v1';
import { errorHandler } from './middlewares/global';
import ApiError from './helpers/ApiError';
import { appController } from './controllers';

const app = express();

if (APP_ENV.NODE_ENV !== 'test') {
  app.use(morgan.successLogger);
  app.use(morgan.errorLogger);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(json());

// parse urlencoded request body
app.use(urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.get('/', appController.getInfo);

// v1 api routes
app.use('/v1', v1Routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(NOT_FOUND, 'Not found'));
});

// handle error
app.use(errorHandler);

export default app;
