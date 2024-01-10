import express from 'express';
import userRoute from './user.route';
import docsRoute from './docs.route';
import { APP_ENV } from '../../config/config';

const v1Route = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach(({ path, route }) => {
  v1Route.use(path, route);
});

if (APP_ENV.NODE_ENV === 'development') {
  devRoutes.forEach(({ path, route }) => {
    v1Route.use(path, route);
  });
}

export default v1Route;
