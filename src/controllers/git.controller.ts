import { NextFunction, Request, Response } from 'express';
import { APP_ENV } from '../config/config';
import axios from 'axios';
import { gitService } from '../services';
import ApiError from '../helpers/ApiError';
import { NOT_FOUND } from 'http-status';

export const getUrl = async (req: Request, res: Response, next: NextFunction) => {
  res.send({
    url: `https://github.com/login/oauth/authorize?client_id=${APP_ENV.CLIENT_ID}&redirect_uri=${APP_ENV.REDIRECT_URI}&scope=user`,
  });
};

export const acquireAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios({
      url: `https://github.com/login/oauth/access_token?client_id=${APP_ENV.CLIENT_ID}&client_secret=${APP_ENV.CLIENT_SECRET}&code=${req.body.code}&redirect_uri=${APP_ENV.REDIRECT_URI}`,
      method: 'POST',
      headers: { Accept: 'application/json' },
    });
    await gitService.addIntegration({ username: req.username, accessToken: response.data?.access_token });
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

export const acquireUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenRes = await gitService.getIntegration(req?.username);
    if (!tokenRes?.accessToken) {
      return res.status(NOT_FOUND).send({ code: 404, message: 'Integration not found' });
    }
    const response = await axios({
      url: `https://api.github.com/user`,
      method: 'GET',
      headers: { Authorization: `Bearer ${tokenRes?.accessToken}` },
    });
    res.send({ ...response.data, firstSync: tokenRes?.createdAt, lastSync: tokenRes?.updatedAt });
  } catch (error) {
    next(error);
  }
};

export const removeIntegration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenRes = await gitService.getIntegration(req.username);
    if (!tokenRes?.accessToken) {
      throw new ApiError(NOT_FOUND, 'Integration not found');
    }
    await axios({
      url: `https://api.github.com/applications/${APP_ENV.CLIENT_ID}/grant`,
      method: 'DELETE',
      data: { access_token: tokenRes?.accessToken },
      headers: {
        Authorization: `Basic ${Buffer.from(`${APP_ENV.CLIENT_ID}:${APP_ENV.CLIENT_SECRET}`).toString('base64')}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    await gitService.deleteIntegration(req.username);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
