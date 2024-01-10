import { Error } from 'mongoose';
import httpStatus, { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';
import { APP_ENV } from '../config/config';
import logger from '../config/logger';
import ApiError, { AppError } from '../helpers/ApiError';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error instanceof Error ? BAD_REQUEST : INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  let { statusCode, message } = err;
  if (APP_ENV.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = INTERNAL_SERVER_ERROR;
    message = httpStatus[INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
  };

  if (APP_ENV.NODE_ENV === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
