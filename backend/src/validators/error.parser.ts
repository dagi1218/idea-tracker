import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { APIError } from '../errors/APIError.js';

export const validateRequest = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const parsedErrors = errors.array().map((err) => ({
            field: err.type === 'field' ? err.path : 'unknown',
            message: err.msg,
        }));

        return next(
            new APIError({
                message: 'Validation Failed',
                status: 400,
                isPublic: true,
                errors: parsedErrors,
            })
        );
    }
    next();


};