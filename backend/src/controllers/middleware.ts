import { Request, Response, NextFunction } from 'express';
import passport from '../config/passport/index.js';
import { APIError } from '../errors/APIError.js';
import { IUserDocument } from '../models/users/schema.js';
import { Role } from '../utils/constants.js';

export const authenticateJwt = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    passport.authenticate(
        'jwt',
        { session: false },
        (err: Error | null, user: IUserDocument | false | undefined) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(
                    new APIError({
                        message: 'Unauthorized',
                        status: 401,
                        isPublic: true
                    })
                );
            }

            req.user = user;
            next();
        }
    )(req, res, next);
};

export const authenticateLocal = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    passport.authenticate(
        'local',
        { session: false },
        (err: Error | null, user: IUserDocument | false | undefined, info?: { message?: string }) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(
                    new APIError({
                        message: info?.message || 'Invalid email or password',
                        status: 401,
                        isPublic: true,
                    })
                );
            }

            req.user = user;
            next();
        }
    )(req, res, next);
};


export const authorizeRoles = (...allowedRoles: Role[]) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        const user = req.user as IUserDocument;

        if (!user) {
            return next(
                new APIError({
                    message: 'Authentication required',
                    status: 401,
                    isPublic: true,
                })
            );
        }

        if (!allowedRoles.includes(user.role)) {
            return next(
                new APIError({
                    message: 'Forbidden: You do not have permission to perform this action',
                    status: 403,
                    isPublic: true,
                })
            );
        }

        next();
    };
};