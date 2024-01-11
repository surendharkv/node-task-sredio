import { Schema, model } from 'mongoose';

const gitSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Git = model('Git', gitSchema, ' github-integration');
