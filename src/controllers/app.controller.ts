import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const getInfo = async (req: Request, res: Response) => {
  res.send({ statusCode: 200, server: 'running', db: mongoose.ConnectionStates[mongoose.connection.readyState] });
};
