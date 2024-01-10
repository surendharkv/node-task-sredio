import { NOT_FOUND } from 'http-status';
import ApiError from '../helpers/ApiError';
import { NextFunction, Request, Response } from 'express';
import { userService } from '../services';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.getUserByUsername(req?.params?.userId ?? '');
  if (!user) {
    return next(new ApiError(NOT_FOUND, 'User not found'));
  }
  res.send(user);
};
