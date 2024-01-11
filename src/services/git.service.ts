import { Git } from '../models';

export interface GitIntegration {
  username: string;
  accessToken: string;
}

export const getIntegration = async (username: string) => {
  return Git.findOne({ username });
};

export const addIntegration = async (integration: GitIntegration) => {
  return Git.findOneAndUpdate({ username: integration.username }, integration, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });
};

export const modifyIntegration = async (username: string, update: Partial<GitIntegration>) => {
  return Git.updateOne({ username }, update);
};

export const deleteIntegration = async (username: string) => {
  return Git.deleteOne({ username });
};
