import { User } from '../models';

export const getUserByUsername = async (username: string) => {
  return User.findOne({ username });
};
