import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

interface EnvironmentVariables {
    PORT: number;
    NODE_ENV: 'development' | 'production' | 'test';
    MONGO_URI: string;
    JWT_SECRET: string;
    REFRESH_SECRET: string;
    REFRESH_EXPIRES_IN: string;
    JWT_EXPIRES_IN: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    FACEBOOK_APP_ID?: string;
    FACEBOOK_APP_SECRET?: string;
    GMAIL_USER?: string;
    GMAIL_CLIENT_ID?: string;
    GMAIL_CLIENT_SECRET?: string;
    GMAIL_REFRESH_TOKEN?: string;
}

const envSchema = Joi.object<EnvironmentVariables>({
    PORT: Joi.number().default(5000),
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    MONGO_URI: Joi.string()
        .required()
        .description('MongoDB Connection URI string'),
    JWT_SECRET: Joi.string()
        .required()
        .description('Secret key for signing JSON Web Tokens'),
    JWT_EXPIRES_IN: Joi.string().default('1d'),
    REFRESH_SECRET: Joi.string()
        .required()
        .description('Secret key for signing JSON Web Tokens'),
    REFRESH_EXPIRES_IN: Joi.string().default('7d'),
    GOOGLE_CLIENT_ID: Joi.string().allow(''),
    GOOGLE_CLIENT_SECRET: Joi.string().allow(''),
    FACEBOOK_APP_ID: Joi.string().allow(''),
    FACEBOOK_APP_SECRET: Joi.string().allow(''),
    GMAIL_USER: Joi.string().allow(''),
    GMAIL_CLIENT_ID: Joi.string().allow(''),
    GMAIL_CLIENT_SECRET: Joi.string().allow(''),
    GMAIL_REFRESH_TOKEN: Joi.string().allow(''),
}).unknown(true);

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Environment Validation Error: ${error.message}`);
}

export const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoUri: envVars.MONGO_URI,
    jwt: {
        secret: envVars.JWT_SECRET,
        expiresIn: envVars.JWT_EXPIRES_IN,
    },
    refresh: {
        secret: envVars.REFRESH_SECRET,
        expiresIn: envVars.REFRESH_EXPIRES_IN,
    },
    oauth: {
        google: {
            clientId: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
        },
        facebook: {
            appId: envVars.FACEBOOK_APP_ID,
            appSecret: envVars.FACEBOOK_APP_SECRET,
        },
    },
    gmail: {
        user: envVars.GMAIL_USER,
        clientId: envVars.GMAIL_CLIENT_ID,
        clientSecret: envVars.GMAIL_CLIENT_SECRET,
        refreshToken: envVars.GMAIL_REFRESH_TOKEN,
    },
};