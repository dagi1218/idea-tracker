import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import routes from './routes.js';
import { configurePassport } from './passport/index.js';
import { APIError } from '../errors/APIError.js';
import { logger } from './winston.js';
import cookieParser from 'cookie-parser';

export const createExpressApp = (): Express => {
    const app = express();


    app.use(cors({ credentials: true, origin: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());


    configurePassport();
    app.use(passport.initialize());


    app.use('/api', routes);


    app.use((_req: Request, _res: Response, next: NextFunction) => {
        next(
            new APIError({
                message: 'Resource not found',
                status: 404,
                isPublic: true,
            })
        );
    });

    // Global Error Handler
    app.use(
        (err: Error | APIError, _req: Request, res: Response, _next: NextFunction) => {
            const isApiError = err instanceof APIError;
            const status = isApiError ? err.status : 500;
            const message = isApiError && err.isPublic ? err.message : 'Internal Server Error';
            const errors = isApiError ? err.errors : undefined;

            if (status >= 500) {
                logger.error(`[HTTP ${status}] ${err.message}`, { stack: err.stack });
            } else {
                logger.warn(`[HTTP ${status}] ${err.message}`);
            }

            res.status(status).json({
                status: 'error',
                statusCode: status,
                message,
                ...(errors ? { errors } : {}),
            });
        }
    );

    return app;
};