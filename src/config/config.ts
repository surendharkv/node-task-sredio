import { config } from 'dotenv';
import { join } from 'path';
import Joi from 'joi';

config({ path: join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    CLIENT_ID: Joi.string().required().description('GitHub client ID'),
    CLIENT_SECRET: Joi.string().required().description('GitHub client secret'),
    REDIRECT_URI: Joi.string().required().description('App redirect url'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const APP_ENV = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  MONGODB_URL: envVars.MONGODB_URL,
  CLIENT_ID: envVars.CLIENT_ID,
  CLIENT_SECRET: envVars.CLIENT_SECRET,
  REDIRECT_URI: envVars.REDIRECT_URI,
};
